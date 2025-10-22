import { Component, inject } from '@angular/core'; // <-- Adicionado inject
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { DenunciaService } from '../../services/denuncia.service'; // <-- Importar o serviço

@Component({
  selector: 'app-denuncia-rapida',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './denuncia-rapida.component.html',
  styleUrl: './denuncia-rapida.component.css'
})
export class DenunciaRapidaComponent {
  // Injetar o serviço de denúncias
  private denunciaService = inject(DenunciaService);

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
    // 1. Criar o objeto para salvar, incluindo o tipo
    const denunciaParaSalvar = {
      tipo: 'Denúncia Rápida',
      ...this.formData // Copia todos os dados do formulário
    };

    // 2. Chamar o serviço para adicionar a denúncia
    this.denunciaService.addDenuncia(denunciaParaSalvar);
    
    // 3. Dar feedback ao usuário
    alert('Denúncia rápida enviada com sucesso! As autoridades competentes serão notificadas.');
    console.log('Dados do formulário de denúncia rápida:', this.formData);

    // 4. Limpar o formulário
    this.resetForm();
  }

  // Método para redefinir o formulário para seu estado inicial
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
