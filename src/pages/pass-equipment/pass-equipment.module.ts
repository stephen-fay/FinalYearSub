import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PassEquipmentPage } from './pass-equipment';

@NgModule({
  declarations: [
    PassEquipmentPage,
  ],
  imports: [
    IonicPageModule.forChild(PassEquipmentPage),
  ],
  exports: [
    PassEquipmentPage
  ]
})
export class PassEquipmentPageModule {}
