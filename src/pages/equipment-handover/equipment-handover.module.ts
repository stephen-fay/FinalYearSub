import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EquipmentHandoverPage } from './equipment-handover';

@NgModule({
  declarations: [
    EquipmentHandoverPage,
  ],
  imports: [
    IonicPageModule.forChild(EquipmentHandoverPage),
  ],
  exports: [
    EquipmentHandoverPage
  ]
})
export class EquipmentHandoverPageModule {}
