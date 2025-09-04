// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { DenunciaRapidaComponent } from './pages/denuncia-rapida/denuncia-rapida.component';
import { BoletimOcorrenciaComponent } from './pages/boletim-ocorrencia/boletim-ocorrencia.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';

export const routes: Routes = [
    // REGRA MAIS IMPORTANTE: Se o caminho for vazio, VÁ PARA O LOGIN.
    // Como esta é a primeira regra, ela sempre será verificada antes de qualquer outra.
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'cadastro',
        component: CadastroComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: 'sobre', component: SobreComponent },
            { path: 'denuncia-rapida', component: DenunciaRapidaComponent },
            { path: 'boletim-ocorrencia', component: BoletimOcorrenciaComponent }
        ]
    },
    // Rota curinga para redirecionar URLs não encontradas para a página 'sobre' (após o login)
    { 
        path: '**', 
        redirectTo: 'sobre' 
    }
];