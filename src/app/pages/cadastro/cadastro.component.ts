// src/app/pages/cadastro/cadastro.component.ts

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  formData = {
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    aceitouTermos: false
  };

  constructor(private router: Router) {}

  onSubmit(): void {
    if (this.formData.senha !== this.formData.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    // Lógica futura de cadastro com o backend
    console.log('Dados do cadastro:', this.formData);
    alert('Cadastro realizado com sucesso! Você será redirecionado para o login.');
    this.router.navigate(['/login']);
  }
}