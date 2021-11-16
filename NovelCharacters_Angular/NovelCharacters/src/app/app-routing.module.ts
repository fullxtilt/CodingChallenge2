import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCharacterComponent } from './components/add-character/add-character.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { ModifyCharacterComponent } from './components/modify-character/modify-character.component';

const routes: Routes = [
  {path: 'character-list', component: CharacterListComponent},
  {path: 'add-character', component: AddCharacterComponent},
  {path: 'modify-character', component: ModifyCharacterComponent},

  {path: '', redirectTo: '/character-list', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
