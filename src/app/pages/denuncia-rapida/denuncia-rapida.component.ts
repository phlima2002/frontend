// src/app/pages/denuncia-rapida/denuncia-rapida.component.ts

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importe o FormsModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-denuncia-rapida',
  standalone: true,
  imports: [CommonModule, FormsModule], // Adicione o FormsModule aqui
  templateUrl: './denuncia-rapida.component.html',
  styleUrl: './denuncia-rapida.component.css'
})
export class DenunciaRapidaComponent {

  // Função para lidar com o envio do formulário
  onSubmit(): void {
    // No futuro, aqui você enviará os dados para o backend.
    // Por enquanto, vamos apenas mostrar um alerta.
    alert('Denúncia rápida enviada com sucesso! As autoridades competentes serão notificadas.');
    console.log('Dados do formulário de denúncia rápida:', this.formData);
  }

  // Objeto para armazenar os dados do formulário (opcional, mas recomendado)
  formData = {
    dataHora: new Date().toISOString(), // Preenchido automaticamente
    tipoViolencia: '',
    eAVitima: 'sim',
    agressorArmado: 'nao',
    localizacao: '',
    vinculoAgressor: '',
    generoAgressor: '',
    descricaoAgressor: ''
  };
}