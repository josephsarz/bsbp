import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SocialWallPage } from './social-wall';

@NgModule({
  declarations: [
    SocialWallPage,
  ],
  imports: [
    IonicPageModule.forChild(SocialWallPage),
  ],
})
export class SocialWallPageModule {}
