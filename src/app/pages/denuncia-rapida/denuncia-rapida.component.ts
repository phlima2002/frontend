import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-denuncia-rapida',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './denuncia-rapida.component.html',
  styleUrl: './denuncia-rapida.component.css'
})
export class DenunciaRapidaComponent {

  onSubmit(): void {
    alert('Denúncia rápida enviada com sucesso! As autoridades competentes serão notificadas.');
    console.log('Dados do formulário de denúncia rápida:', this.formData);
  }

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
}