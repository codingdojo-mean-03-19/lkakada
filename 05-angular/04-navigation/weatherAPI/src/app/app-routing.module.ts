import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeattleComponent } from './weather/seattle/seattle.component';
import { SanjoseComponent } from './weather/sanjose/sanjose.component';
import { BurbankComponent } from './weather/burbank/burbank.component';
import { DallasComponent } from './weather/dallas/dallas.component';
import { WashingtonComponent } from './weather/washington/washington.component';
import { ChicagoComponent } from './weather/chicago/chicago.component';
import { PagenotfoundComponent } from './weather/pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: 'seattle', component: SeattleComponent },
  { path: 'sanjose', component: SanjoseComponent },
  { path: 'burbank', component: BurbankComponent },
  { path: 'dallas', component: DallasComponent },
  { path: 'washington', component: WashingtonComponent },
  { path: 'chicago', component: ChicagoComponent },
  { path: '', pathMatch: 'full', redirectTo: '/seattle' },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
