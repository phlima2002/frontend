import { Component, OnInit, inject } from '@angular/core'; // Importar OnInit
import { CommonModule } from '@angular/common';
import { DenunciaService } from '../../services/denuncia.service'; // <-- Importar o Serviço

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  // Injetar o serviço
  private denunciaService = inject(DenunciaService);

  // Este array agora será preenchido pelo serviço
  denuncias: any[] = [];

  constructor() {}

  // Usamos ngOnInit para carregar os dados quando o componente inicia
  ngOnInit() {
    this.carregarDenunciasDoServico();
  }

  carregarDenunciasDoServico() {
    this.denuncias = this.denunciaService.getDenuncias();
  }

  deletarDenuncia(idParaDeletar: string) {
    console.log('Deletando denúncia com ID:', idParaDeletar);
    
    // 1. Chama o serviço para deletar
    this.denunciaService.deletarDenuncia(idParaDeletar);
    
    // 2. Atualiza a lista local para refletir a mudança
    this.carregarDenunciasDoServico();
    
    // (Opcional) Adicione um alerta
    alert('Denúncia deletada com sucesso!');
  }
}