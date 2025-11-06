import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DenunciaService } from '../../services/denuncia.service';

@Component({
  selector: 'app-boletim-ocorrencia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './boletim-ocorrencia.component.html',
  styleUrl: './boletim-ocorrencia.component.css'
})
export class BoletimOcorrenciaComponent {
  private denunciaService = inject(DenunciaService);

  public isSubmitting = false;

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
    const boParaSalvar = {
      tipo: 'Boletim de Ocorrência',
      ...this.formData 
    };

    this.isSubmitting = true;

    // --- MUDANÇA AQUI ---
    // A chamada ao serviço agora é assíncrona, usamos .subscribe()
    this.denunciaService.addDenuncia(boParaSalvar).subscribe({
      next: (resposta) => {
        // Sucesso
        console.log('Resposta do servidor:', resposta);
        alert('Boletim de Ocorrência registrado com sucesso.');
        this.resetForm();
        this.isSubmitting = false;
      },
      error: (erro) => {
        // Erro
        console.error('Erro ao registrar B.O.:', erro);
        // Tenta mostrar uma mensagem de erro mais específica, se o backend enviar
        const msgErro = erro.error?.message || 'Houve um erro ao registrar seu B.O.';
        alert(msgErro);
        this.isSubmitting = false;
      }
    });
    // --- FIM DA MUDANÇA ---
  }

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
