import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEquipmentPage } from './add-equipment';

@NgModule({
  declarations: [
    AddEquipmentPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEquipmentPage),
  ],
  exports: [
    AddEquipmentPage
  ]
})
export class AddEquipmentPageModule {}
