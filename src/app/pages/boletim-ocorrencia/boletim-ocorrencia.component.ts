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

  formData = {
    comunicanteNome: '',
    comunicanteDataNasc: '',
    comunicanteCPF: '',
    comunicanteEndereco: '',
    comunicanteTelefone: '',
    fatoData: '',
    fatoHora: '',
    fatoLocal: '',
    fatoDescricao: '',
    houveTestemunhas: 'nao',
    testemunhasInfo: '',
    agressorNome: '',
    agressorVinculo: '',
    agressorDescricao: '',
    medidasProtetivas: {
      afastamentoLar: false,
      proibicaoContato: false,
      proibicaoLocais: false
    }
  };

  onSubmit(): void {
    alert('Boletim de Ocorrência registrado com sucesso. Você receberá uma cópia por e-mail e as informações foram encaminhadas para a delegacia competente.');
    console.log('Dados do B.O.:', this.formData);
  }
}