// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';


// import { HeroComponent } from './hero/hero.component';
// import { FooterComponent } from './footer/footer.component';
// import { HomepageComponent } from './homepage/homepage.component';
// import { ArticleComponent } from './article/article.component';
// import { MenuComponent } from './menu/menu.component';



// @Component({
//   selector: 'pbg-root',
//   standalone: true,
//   imports: [RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.scss'
// })
// export class AppComponent {
//   title = 'personal-budget-gaurav';
// }


import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';

import { HeroComponent } from './hero/hero.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ArticleComponent } from './article/article.component';
import { MenuComponent } from './menu/menu.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { P404Component } from './p404/p404.component';


@Component({
  selector: 'pbg-root',
  standalone: true,
  // Import all the necessary components here
  imports: [
    RouterOutlet,
    HeroComponent,      // Imported here
    FooterComponent,    // Imported here
    HomepageComponent,  // Imported here
    ArticleComponent,   // Imported here
    MenuComponent,      // Imported here
    AboutComponent,
    LoginComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Fixed typo here
})
export class AppComponent {
  title = 'personal-budget-gaurav';
}
