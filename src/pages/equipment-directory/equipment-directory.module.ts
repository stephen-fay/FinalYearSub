import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EquipmentDirectoryPage } from './equipment-directory';

@NgModule({
  declarations: [
    EquipmentDirectoryPage,
  ],
  imports: [
    IonicPageModule.forChild(EquipmentDirectoryPage),
  ],
  exports: [
    EquipmentDirectoryPage
  ]
})
export class EquipmentDirectoryPageModule {}
