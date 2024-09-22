import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pbg-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {

}
