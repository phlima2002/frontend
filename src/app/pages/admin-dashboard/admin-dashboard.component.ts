import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DenunciaService } from '../../services/denuncia.service'; 

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule], // Adicionamos CommonModule para usar *ngIf, *ngFor, etc.
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  private denunciaService = inject(DenunciaService);

  public denuncias: any[] = [];
  public isLoading = true; // Estado de carregamento
  public erro: string | null = null; // Estado de erro

  constructor() {}

  ngOnInit() {
    this.carregarDenunciasDoServico();
  }

  carregarDenunciasDoServico() {
    this.isLoading = true;
    this.erro = null;

    // --- MUDANÇA AQUI ---
    // getDenuncias() agora retorna um Observable, precisamos nos inscrever.
    this.denunciaService.getDenuncias().subscribe({
      next: (dados) => {
        this.denuncias = dados;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar denúncias:', err);
        this.erro = 'Não foi possível carregar a lista de denúncias.';
        this.isLoading = false;
      }
    });
  }

  /**
   * --- MUDANÇA AQUI ---
   * A função de deletar agora precisa saber o ID e o TIPO da denúncia,
   * pois temos duas tabelas separadas no backend (denuncias_rapidas e boletins_ocorrencia)
   * e os IDs podem se repetir (ex: B.O. id=1 e Denúncia Rápida id=1).
   */
  deletarDenuncia(id: number, tipo: string): void {
    
    // Usamos 'confirm' para evitar exclusões acidentais
    if (!confirm('Tem certeza que deseja excluir esta denúncia?')) {
      return;
    }

    // --- MUDANÇA AQUI ---
    // Chamamos o serviço (que é assíncrono) e nos inscrevemos
    this.denunciaService.deletarDenuncia(id, tipo).subscribe({
      next: () => {
        // Sucesso
        alert('Denúncia deletada com sucesso!');
        
        // Em vez de recarregar tudo da API, apenas removemos o item
        // da lista local para uma melhor experiência do usuário (UX)
        this.denuncias = this.denuncias.filter(d => !(d.id === id && d.tipo === tipo));
      },
      error: (err) => {
        // Erro
        console.error('Erro ao excluir denúncia:', err);
        alert('Não foi possível excluir a denúncia.');
      }
    });
  }
}
