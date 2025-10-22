import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DenunciaService {

  
  private readonly STORAGE_KEY = 'denuncias';

  
  private denuncias: any[] = [];

  constructor() {
    
    this.carregarDenuncias();
  }


  private carregarDenuncias() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      this.denuncias = JSON.parse(data);
    }
  }


  private salvarDenuncias() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.denuncias));
  }

  getDenuncias(): any[] {
    return this.denuncias;
  }

  addDenuncia(novaDenuncia: any) {
    
    novaDenuncia.id = new Date().getTime().toString(); 
    
    this.denuncias.push(novaDenuncia);
    this.salvarDenuncias();
  }

  deletarDenuncia(id: string) {
    this.denuncias = this.denuncias.filter(d => d.id !== id);
    this.salvarDenuncias();
  }
}