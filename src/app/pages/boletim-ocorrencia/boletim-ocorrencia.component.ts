import { Component, inject } from '@angular/core'; // <-- Adicionado inject
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DenunciaService } from '../../services/denuncia.service'; // <-- Importar o serviço

@Component({
  selector: 'app-boletim-ocorrencia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './boletim-ocorrencia.component.html',
  styleUrl: './boletim-ocorrencia.component.css'
})
export class BoletimOcorrenciaComponent {
  // Injetar o serviço de denúncias
  private denunciaService = inject(DenunciaService);

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
    // 1. Criar o objeto para salvar, incluindo o tipo
    const boParaSalvar = {
      tipo: 'Boletim de Ocorrência',
      ...this.formData // Copia todos os dados do formulário
    };

    // 2. Chamar o serviço para adicionar o B.O.
    this.denunciaService.addDenuncia(boParaSalvar);

    // 3. Dar feedback ao usuário
    alert('Boletim de Ocorrência registrado com sucesso. Você receberá uma cópia por e-mail e as informações foram encaminhadas para a delegacia competente.');
    console.log('Dados do B.O.:', this.formData);

    // 4. Limpar o formulário
    this.resetForm();
  }

  // Método para redefinir o formulário para seu estado inicial
  private resetForm(): void {
    this.formData = {
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
  }
}
