import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewUserPage } from './new-user';

@NgModule({
  declarations: [
    NewUserPage,
  ],
  imports: [
    IonicPageModule.forChild(NewUserPage),
  ],
  exports: [
    NewUserPage
  ]
})
export class NewUserPageModule {}
