// src/app/components/navbar/navbar.component.ts

import { Component } from '@angular/core';
// 1. Importe as diretivas RouterLink e RouterLinkActive
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  // 2. Adicione as diretivas ao array de 'imports'
  imports: [
    CommonModule, 
    RouterLink, 
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}