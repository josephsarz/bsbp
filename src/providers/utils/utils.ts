import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController, Platform  } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import * as moment from 'moment';

declare var cordova: any;

@Injectable()
export class UtilsProvider {

  lastImage: string = null;
  loading: any;
  key: string;
  value : string;


  constructor( public camera: Camera, public transfer: Transfer, public file: File, public filePath: FilePath, public plt: Platform, public localNotifications: LocalNotifications, alertCtrl: AlertController, public storage: Storage, private nativeStorage: NativeStorage, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    this.plt.ready().then((readySource) => {
      this.localNotifications.on('click', (notification, state) => {
        let json = JSON.parse(notification.data);

        let alert = alertCtrl.create({
          title: notification.title,
          subTitle: json.mydata
        });
        alert.present();
      })
    });
    this.scheduleNotification();

  }


  scheduleNotification() {
  this.localNotifications.schedule({
    id: 1,
    title: 'Blockparty Lagos',
    text: "Welcome to bsbp",
    data: { mydata: 'My hidden message this is' },
    at: new Date(new Date().getTime() + 2 * 1000)
  });
}

  getApiKey(){
    this.key = this.getItem();
    return this.key;
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.plt.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    //  this.utils.presentToast(namePath);
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }


  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }



  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top',
      dismissOnPageChange: false
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  showLoader(content){
    this.loading = this.loadingCtrl.create({
        content: content+"...",
        dismissOnPageChange:true
    });

    this.loading.present();
  }

public setItem(value:any){

  this.storage.set("api_key", value)
  .then(
    () => {console.log("set "+value);
    },
    error => this.presentToast(error)
  );

  }

public getItem(){
  this.storage.get("api_key")
    .then(
    data => {
      this.value = data;
      console.log("get "+this.value);
    },
    error => this.presentToast(error)
  );
  return this.value
}

clearStorage(){
    	this.storage.clear().then(()=>{
		      console.log('all keys are cleared');
    	});
  }

}
