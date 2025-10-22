import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { DenunciaRapidaComponent } from './pages/denuncia-rapida/denuncia-rapida.component';
import { BoletimOcorrenciaComponent } from './pages/boletim-ocorrencia/boletim-ocorrencia.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { adminGuard } from './auth/admin.guard';

// Importar o novo componente
import { MinhaContaComponent } from './pages/minha-conta/minha-conta.component';

export const routes: Routes = [
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
        path: 'admin',
        component: AdminLayoutComponent,
        canActivate: [adminGuard],
        children: [
            { path: 'dashboard', component: AdminDashboardComponent },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },

    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: 'sobre', component: SobreComponent },
            { path: 'denuncia-rapida', component: DenunciaRapidaComponent },
            { path: 'boletim-ocorrencia', component: BoletimOcorrenciaComponent },
            // Rota para a nova página "Minha Conta"
            { path: 'minha-conta', component: MinhaContaComponent }
        ]
    },
    
    { 
        path: '**', 
        redirectTo: 'sobre' 
    }
];
