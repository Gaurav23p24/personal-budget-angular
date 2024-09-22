import { AfterViewInit, Component , OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, ArcElement, CategoryScale, LinearScale, registerables } from 'chart.js';
import { ArticleComponent } from '../article/article.component';
Chart.register(ArcElement, CategoryScale, LinearScale, ...registerables);

@Component({
  selector: 'pbg-homepage',
  standalone: true,
  imports: [ArticleComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements AfterViewInit{

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
  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void{
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {

      for (var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;

    }
    this.createChart();
    });
  }

  // createChart() {
  //   // var ctx = document.getElementById('myChart').getContext('2d');
  //   var ctx = document.getElementById('myChart');
  //   var myPieChart = new Chart(ctx, {
  //       type: 'pie',
  //       data: this.dataSource
  //   });
  // }


  createChart() {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement | null;

    if (canvas) {
      const ctx = canvas.getContext('2d');

      if (ctx) {
        const myPieChart = new Chart(ctx, {
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

}
