import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; // <-- Importar RouterLink
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; // <-- Importar FormsModule e NgForm

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,  // <-- Usar FormsModule (para ngModel e NgForm)
    RouterLink    // <-- Adicionar RouterLink (para o botão 'Criar conta')
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  router = inject(Router);

  // Não precisamos de construtor com FormBuilder

  // A função agora recebe o NgForm diretamente do template
  onSubmit(form: NgForm) { 
    if (form.invalid) {
      // Opcional: Marcar campos como tocados para mostrar erros
      Object.keys(form.controls).forEach(field => {
        const control = form.control.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      console.log('Formulário inválido');
      return;
    }

    // Acessamos os valores diretamente do 'form.value'
    const email = form.value.email;
    const password = form.value.password;

    // ----- A LÓGICA DO ADMIN (continua a mesma) -----
    if (email === 'phlima2002@hotmail.com' && password === 'Pedro112') {
      
      sessionStorage.setItem('userRole', 'admin');
      this.router.navigate(['/admin/dashboard']);

    } else {
      // Lógica para um usuário normal (simulado)
      console.log('Login de usuário normal (simulado)');
      sessionStorage.setItem('userRole', 'user');
      this.router.navigate(['/sobre']);
    }
  }
}