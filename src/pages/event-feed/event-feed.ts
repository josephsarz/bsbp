import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import { StreamingMedia, StreamingVideoOptions} from '@ionic-native/streaming-media';



@IonicPage()
@Component({
  selector: 'page-event-feed',
  templateUrl: 'event-feed.html',
})
export class EventFeedPage {

  constructor(private streamingMedia: StreamingMedia) { }

  startVideo() {
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Finished Video') },
      errorCallback: (e) => { console.log('Error: ', e) },
      orientation: 'portrait'
    };

    // http://www.sample-videos.com/
    this.streamingMedia.playVideo('http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_30mb.mp4', options);
  }

}
