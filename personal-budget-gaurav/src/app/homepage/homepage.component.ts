import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart, ArcElement, CategoryScale, LinearScale, registerables, ChartType } from 'chart.js';
import * as d3 from 'd3';
import { ArticleComponent } from '../article/article.component';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { DataService } from '../data.service';

Chart.register(ArcElement, CategoryScale, LinearScale, ...registerables);

@Component({
  selector: 'pbg-homepage',
  standalone: true,
  imports: [ArticleComponent, BreadcrumbsComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterViewInit {
  public dataSource = {
    datasets: [
      {
        data: [] as number[],
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
          '#00FF00',
          '#800080',
          '#FFC0CB',
          '#87CEEB',
          '#90EE90'
        ]
      }
    ],
    labels: [] as string[]
  };

  private budgetData: any[] = [];
  private margin = 60;
  private width = 400;
  private height = 400;
  private myPieChart: Chart<'pie', number[], string> | null = null; // Explicitly define the chart type

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // Fetch budget data first
    this.dataService.fetchBudgetData();

    // Subscribe to budget data
    this.dataService.getBudgetData().subscribe((res: any[]) => {
      if (Array.isArray(res)) {
        this.dataSource.datasets[0].data = res.map(item => item.budget);
        this.dataSource.labels = res.map(item => item.title);
        this.budgetData = res;

        this.createChart();
        this.createD3Chart(res);
      } else {
        console.error("Invalid data structure:", res);
      }
    });
  }

  ngAfterViewInit(): void {}

  createChart(): void {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement | null;

    if (canvas) {
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Destroy the previous chart instance if it exists
        if (this.myPieChart) {
          this.myPieChart.destroy();
        }

        // Create a new chart instance with explicit type
        this.myPieChart = new Chart<'pie', number[], string>(ctx, {
          type: 'pie',
          data: this.dataSource,
        });
      } else {
        console.error("Failed to get 2D context from the canvas element.");
      }
    } else {
      console.error("Element with id 'myChart' not found or not a canvas element.");
    }
  }

  createD3Chart(budgetData: { title: string; budget: number }[]): void {
    const width = 600;
    const height = 200;
    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal<string>().domain(budgetData.map(d => d.title)).range(d3.schemeCategory10);

    const arc = d3.arc<d3.PieArcDatum<{ title: string, budget: number }>>()
      .innerRadius(radius * 0.5)
      .outerRadius(radius * 0.8);

    const outerArc = d3.arc<d3.PieArcDatum<{ title: string, budget: number }>>()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    const pie = d3.pie<{ title: string, budget: number }>()
      .sort(null)
      .value(d => d.budget);

    const svg = d3.select('#d3-chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const dataReady = pie(budgetData);

    // Draw pie slices
    svg.selectAll('allSlices')
      .data(dataReady)
      .enter()
      .append('path')
      .attr('d', arc as any)
      .attr('fill', d => color(d.data.title))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', 0.7);

    // Draw connecting polylines
    svg.selectAll('allPolylines')
      .data(dataReady)
      .enter()
      .append('polyline')
      .attr('points', (d) => {
        const posA = arc.centroid(d);
        const posB = outerArc.centroid(d);
        const posC = outerArc.centroid(d);
        posC[0] = radius * 0.95 * (this.midAngle(d) < Math.PI ? 1 : -1);
        return [posA, posB, posC].map(p => p.join(',')).join(' ');
      });

    // Draw text labels with budget amount
    svg.selectAll('allLabels')
      .data(dataReady)
      .enter()
      .append('text')
      .text(d => `${d.data.title} (${d.data.budget})`)
      .attr('transform', (d) => {
        const pos = outerArc.centroid(d);
        pos[0] = radius * 0.99 * (this.midAngle(d) < Math.PI ? 1 : -1);
        return `translate(${pos})`;
      })
      .style('text-anchor', (d) => {
        return this.midAngle(d) < Math.PI ? 'start' : 'end';
      });
  }

  private midAngle(d: { startAngle: number; endAngle: number }): number {
    return d.startAngle + (d.endAngle - d.startAngle) / 2;
  }
}



