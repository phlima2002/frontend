import { Component, inject } from '@angular/core'; 
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { DenunciaService } from '../../services/denuncia.service';

@Component({
  selector: 'app-denuncia-rapida',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './denuncia-rapida.component.html',
  styleUrl: './denuncia-rapida.component.css'
})
export class DenunciaRapidaComponent {
  private denunciaService = inject(DenunciaService);

  // --- ADICIONADO ---
  public isSubmitting = false;

  formData = {
    dataHora: new Date().toISOString(),
    tipoViolencia: '',
    eAVitima: 'sim',
    agressorArmado: 'nao',
    localizacao: '',
    vinculoAgressor: '',
    generoAgressor: '',
    descricaoAgressor: ''
  };

  onSubmit(): void {
    const denunciaParaSalvar = {
      tipo: 'Denúncia Rápida',
      ...this.formData 
    };
    
    // --- MUDANÇA AQUI ---
    this.isSubmitting = true; // Desabilita o botão

    this.denunciaService.addDenuncia(denunciaParaSalvar).subscribe({
      next: (resposta) => {
        // Sucesso
        console.log('Resposta do servidor:', resposta);
        alert('Denúncia rápida enviada com sucesso! As autoridades competentes serão notificadas.');
        this.resetForm();
        this.isSubmitting = false; // Reabilita o botão
      },
      error: (erro) => {
        // Erro
        console.error('Erro ao enviar denúncia:', erro);
        const msgErro = erro.error?.message || 'Houve um erro ao enviar sua denúncia.';
        alert(msgErro);
        this.isSubmitting = false; // Reabilita o botão
      }
    });
  }

  private resetForm(): void {
    this.formData = {
      dataHora: new Date().toISOString(),
      tipoViolencia: '',
      eAVitima: 'sim',
      agressorArmado: 'nao',
      localizacao: '',
      vinculoAgressor: '',
      generoAgressor: '',
      descricaoAgressor: ''
    };
  }
}

