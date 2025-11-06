import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,  
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  router = inject(Router);

  onSubmit(form: NgForm) { 
    if (form.invalid) {
      Object.keys(form.controls).forEach(field => {
        const control = form.control.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      console.log('Formulário inválido');
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    if (email === 'phlima2002@hotmail.com' && password === 'Pedro112') {
      
      sessionStorage.setItem('userRole', 'admin');
      this.router.navigate(['/admin/dashboard']);

    } else {
      console.log('Login de usuário normal (simulado)');
      sessionStorage.setItem('userRole', 'user');
      this.router.navigate(['/sobre']);
    }
  }
}