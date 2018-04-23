import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserDirectoryPage } from './user-directory';

@NgModule({
  declarations: [
    UserDirectoryPage,
  ],
  imports: [
    IonicPageModule.forChild(UserDirectoryPage),
  ],
  exports: [
    UserDirectoryPage
  ]
})
export class UserDirectoryPageModule {}
