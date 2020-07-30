import React, { Component } from 'react';
// import Device from './device';

const scala = {
  width: 1280,
  height: 720,
}
export default class Video extends Component {
  constructor(props) {
    super(props);

    // this.gotMediaStream = this.gotMediaStream.bind(this); // must bind
    this.player = null;// ref 无法通过 props 透传
    this.picture = null;

    this.state = {
    }
  }

  componentDidMount() {
      this.start();
  }

  gotMediaStream = (stream) =>  { // 用箭头函数就不用 bind 了
    this.player.srcObject = stream;
  }

  start() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.info('getUserMedia is not supported');
      return;
    }

    var constraints = {
      video: {
        width: scala.width,
        height: scala.height,
        frameRate: 15,
        facingMode: 'environment',
      },
      audio: false,
    }

    navigator.mediaDevices.getUserMedia(constraints)
      .then(this.gotMediaStream)
      .catch(e => console.error(`getUserMedia error: ${e}`))
  }

  initPicture(ref) {
    this.picture = ref;
    this.picture.width = scala.width;
    this.picture.height = scala.height;
  }

  take() {
    this.picture.getContext('2d').drawImage(this.player, 0, 0, this.picture.width, this.picture.height);
  }

  render() {
    return (
      <div>
        {/* <Device/> */}
        <div>
          <video ref={e => this.player = e} autoPlay playsInline></video>
        </div>
        <div>
          <div>
            <button onClick={this.take.bind(this)}>拍照</button>
          </div>
          <div>
            <canvas ref={this.initPicture.bind(this)}></canvas>
          </div>
        </div>
      </div>
    );
  }

}
