import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { NativeStorage } from '@ionic-native/native-storage';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { FileTransfer } from '@ionic-native/file-transfer';

import { MyApp } from './app.component';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpModule } from '@angular/http';
import { SocialServiceProvider } from '../providers/social-service/social-service';

import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { SocialSharing } from '@ionic-native/social-sharing';
import { StreamingMedia } from '@ionic-native/streaming-media';

import { UtilsProvider } from '../providers/utils/utils';
import { UserProvider } from '../providers/user/user';
import { QuestServiceProvider } from '../providers/quest-service/quest-service';

@NgModule({
  declarations: [
    MyApp

  ],
  imports: [
    BrowserModule, HttpModule,
    IonicModule.forRoot(MyApp),
      IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthServiceProvider,
    SocialServiceProvider,
    File,
    Transfer,
    FileTransfer,
    Camera,
    FilePath,
    SocialSharing,
    NativeStorage,
    LocalNotifications,
    StreamingMedia,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UtilsProvider,
    UserProvider,
    QuestServiceProvider
  ]
})
export class AppModule {}
