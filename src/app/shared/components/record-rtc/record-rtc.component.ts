import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

import * as RecordRTC from 'recordrtc';

@Component({
  selector: 'app-record-rtc',
  templateUrl: './record-rtc.component.html',
  styleUrls: ['./record-rtc.component.css']
})
export class RecordRtcComponent implements OnInit, AfterViewInit {

  @ViewChild('video') video: any;

  @Output()
  saveBlobEvent = new EventEmitter<Blob>();

  private mediaConstraints = {
    audio: true,
    video: true
  };

  private stream: MediaStream;
  private recordRTC: any;

  recordedBlob: Blob;

  isRecording = false;
  isRecorded = false;


  constructor() {
  }

  ngOnInit(): void {
  }

  startRecording(): void {
    this.isRecording = true;
    navigator.mediaDevices
      .getUserMedia(this.mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  stopRecording(): void {
    this.isRecording = false;
    this.isRecorded = true;
    const recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    const stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
  }

  ngAfterViewInit(): void {
    this.initVideo();
  }


  private successCallback(stream: MediaStream): void {
    const options = {
      mimeType: 'video/webm;codecs=vp8,opus',
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 128000,
      bitsPerSecond: 128000
    };
    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    this.recordRTC.startRecording();
    const video: HTMLVideoElement = this.video.nativeElement;
    video.srcObject = stream;
  }


  private processVideo(audioVideoWebMURL): void {
    const video: HTMLVideoElement = this.video.nativeElement;
    const recordRTC = this.recordRTC;
    video.src = audioVideoWebMURL;
    this.recordedBlob = recordRTC.getBlob();
  }

  private errorCallback(error: any): void {
    console.log(error);
  }

  private initVideo(): void {
    const video: HTMLVideoElement = this.video.nativeElement;
    video.muted = false;
    video.controls = true;
    video.autoplay = false;
  }

  saveBlob(): void {
    this.isRecorded = false;
    this.saveBlobEvent.emit(this.recordedBlob);
  }
}
