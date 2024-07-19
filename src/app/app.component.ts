import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule] // Asegúrate de que RouterModule está importado aquí
})
export class AppComponent {
  title = 'frontend-angular-test';
}
