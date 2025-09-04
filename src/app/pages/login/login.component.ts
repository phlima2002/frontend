import { Component } from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router) { }
  
  onSubmit(): void {
    console.log('Formulário de login enviado! Redirecionando...');
    this.router.navigate(['/sobre']);
  }

  onCreateAccount(): void {
    console.log('Redirecionando para a página de criação de conta...');
  }
}