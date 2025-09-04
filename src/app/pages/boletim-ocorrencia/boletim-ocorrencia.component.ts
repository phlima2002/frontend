// src/app/pages/boletim-ocorrencia/boletim-ocorrencia.component.ts

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boletim-ocorrencia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './boletim-ocorrencia.component.html',
  styleUrl: './boletim-ocorrencia.component.css'
})
export class BoletimOcorrenciaComponent {

  // Objeto para armazenar todos os dados do formulário
  formData = {
    // Dados da Comunicante
    comunicanteNome: '',
    comunicanteDataNasc: '',
    comunicanteCPF: '',
    comunicanteEndereco: '',
    comunicanteTelefone: '',

    // Detalhes da Ocorrência
    fatoData: '',
    fatoHora: '',
    fatoLocal: '',
    fatoDescricao: '',
    houveTestemunhas: 'nao',
    testemunhasInfo: '',

    // Dados do Agressor
    agressorNome: '',
    agressorVinculo: '',
    agressorDescricao: '',

    // Medidas Protetivas
    medidasProtetivas: {
      afastamentoLar: false,
      proibicaoContato: false,
      proibicaoLocais: false
    }
  };

  onSubmit(): void {
    // Lógica futura para enviar os dados para o backend
    alert('Boletim de Ocorrência registrado com sucesso. Você receberá uma cópia por e-mail e as informações foram encaminhadas para a delegacia competente.');
    console.log('Dados do B.O.:', this.formData);
  }
}