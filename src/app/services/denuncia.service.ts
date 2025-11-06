import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class DenunciaService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api';

  constructor() {}

  /**
   * Adiciona uma nova denúncia (Rápida ou B.O.)
   */
  addDenuncia(denunciaData: any): Observable<any> {
    
    if (denunciaData.tipo === 'Denúncia Rápida') {
      
      // --- MUDANÇA AQUI: Mapeia de camelCase para snake_case ---
      const dadosRapidaSnake = {
        tipo: denunciaData.tipo,
        data_hora: denunciaData.dataHora,
        tipo_violencia: denunciaData.tipoViolencia,
        e_a_vitima: denunciaData.eAVitima,
        agressor_armado: denunciaData.agressorArmado,
        localizacao: denunciaData.localizacao,
        vinculo_agressor: denunciaData.vinculoAgressor,
        genero_agressor: denunciaData.generoAgressor,
        descricao_agressor: denunciaData.descricaoAgressor,
      };
      
      return this.http.post(`${this.apiUrl}/denuncias-rapidas`, dadosRapidaSnake);

    } else if (denunciaData.tipo === 'Boletim de Ocorrência') {
      
      // --- MUDANÇA AQUI: Mapeia de camelCase para snake_case ---
      const dadosBOSnake = {
        tipo: denunciaData.tipo,
        // Comunicante
        comunicante_nome: denunciaData.comunicanteNome,
        comunicante_data_nasc: denunciaData.comunicanteDataNasc,
        comunicante_cpf: denunciaData.comunicanteCPF,
        comunicante_endereco: denunciaData.comunicanteEndereco,
        comunicante_telefone: denunciaData.comunicanteTelefone,
        // Fato
        fato_data: denunciaData.fatoData,
        fato_hora: denunciaData.fatoHora,
        fato_local: denunciaData.fatoLocal,
        fato_descricao: denunciaData.fatoDescricao,
        // Testemunhas
        houve_testemunhas: denunciaData.houveTestemunhas,
        testemunhas_info: denunciaData.testemunhasInfo,
        // Agressor
        agressor_nome: denunciaData.agressorNome,
        agressor_vinculo: denunciaData.agressorVinculo,
        agressor_descricao: denunciaData.agressorDescricao,
        // Medidas (Não precisamos mais do JSON.stringify)
        medidas_protetivas: denunciaData.medidasProtetivas,
      };

      return this.http.post(`${this.apiUrl}/boletins-ocorrencia`, dadosBOSnake);
    }

    return new Observable(observer => {
      observer.error('Tipo de denúncia desconhecido');
    });
  }

  /**
   * Busca todas as denúncias (Rápidas e B.O.s) e as junta em um único array.
   */
  getDenuncias(): Observable<any[]> {
    
    const rapidas$ = this.http.get<any[]>(`${this.apiUrl}/denuncias-rapidas`);
    const boletins$ = this.http.get<any[]>(`${this.apiUrl}/boletins-ocorrencia`);

    return forkJoin([rapidas$, boletins$]).pipe(
      map(([rapidas, boletins]) => {
        
        // O backend envia snake_case, mas o frontend (admin) espera camelCase.
        // Vamos traduzir de volta!
        const rapidasComTipo = rapidas.map(d => ({
          ...d,
          tipo: 'Denúncia Rápida',
          dataHora: d.data_hora,
          tipoViolencia: d.tipo_violencia,
          eAVitima: d.e_a_vitima,
          agressorArmado: d.agressor_armado,
          vinculoAgressor: d.vinculo_agressor,
          generoAgressor: d.genero_agressor,
          descricaoAgressor: d.descricao_agressor
        }));
        
        const boletinsComTipo = boletins.map(b => ({
          ...b,
          tipo: 'Boletim de Ocorrência',
          comunicanteNome: b.comunicante_nome,
          comunicanteDataNasc: b.comunicante_data_nasc,
          comunicanteCPF: b.comunicante_cpf,
          comunicanteEndereco: b.comunicante_endereco,
          comunicanteTelefone: b.comunicante_telefone,
          fatoData: b.fato_data,
          fatoHora: b.fato_hora,
          fatoLocal: b.fato_local,
          fatoDescricao: b.fato_descricao,
          houveTestemunhas: b.houve_testemunhas,
          testemunhasInfo: b.testemunhas_info,
          agressorNome: b.agressor_nome,
          agressorVinculo: b.agressor_vinculo,
          agressorDescricao: b.agressor_descricao,
          medidasProtetivas: b.medidas_protetivas
        }));

        const todas = [...rapidasComTipo, ...boletinsComTipo];

        todas.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

        return todas;
      })
    );
  }

  /**
   * Deleta uma denúncia.
   */
  deletarDenuncia(id: number, tipo: string): Observable<any> {
    
    if (tipo === 'Denúncia Rápida') {
      return this.http.delete(`${this.apiUrl}/denuncias-rapidas/${id}`);
    } 
    
    else if (tipo === 'Boletim de Ocorrência') {
      return this.http.delete(`${this.apiUrl}/boletins-ocorrencia/${id}`);
    } 
    
    else {
      return new Observable(observer => {
        observer.error('Tipo de denúncia inválido para exclusão');
      });
    }
  }
}
