// src/app/pages/login/login.component.ts

import { Component } from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';

// É uma boa prática também ter o CommonModule para diretivas como *ngIf, *ngFor etc.
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
  

  /**
   * Função chamada quando o formulário de login é enviado.
   * No futuro, aqui você chamaria seu serviço de autenticação.
   */
  onSubmit(): void {
    console.log('Formulário de login enviado! Redirecionando...');
    // 3. Use o router para navegar para a página /sobre
    this.router.navigate(['/sobre']);
  }

  /**
   * Função chamada quando o botão "Criar conta" é clicado.
   * No futuro, isso navegaria para a página de registro.
   */
  onCreateAccount(): void {
    console.log('Redirecionando para a página de criação de conta...');
  }
}