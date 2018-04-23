import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewEquipmentPage } from './new-equipment';

@NgModule({
  declarations: [
    NewEquipmentPage,
  ],
  imports: [
    IonicPageModule.forChild(NewEquipmentPage),
  ],
  exports: [
    NewEquipmentPage
  ]
})
export class NewEquipmentPageModule {}
