import React, {Component} from 'react';

const AudioInput = 'audioinput';
const AudioOutput = 'audiooutput';
const VideoInput = 'videoinput';
export default class Device extends Component {
  constructor(props) {
    super(props);

    this.audioInput = null;
    this.audioOutput = null;
    this.videoInput = null;
  }

  componentDidMount() {
      this.start();
  }

  gotDevices = (deviceInfos) => {
    deviceInfos.forEach(info => {
      console.log(`kind = ${info.kind}, 
                  label = ${info.label}, 
                  id = ${info.deviceId}, 
                  groupId = ${info.groupId}`);

        let option = document.createElement('option');
        option.text = info.label || 'default';
        option.value = info.deviceId;
        switch (info.kind) {
          case AudioInput:
            this.audioInput.appendChild(option);
            break;
          case AudioOutput:
            this.audioOutput.appendChild(option);
            break;
          case VideoInput:
            this.videoInput.appendChild(option);
        }
    })
  }
  
  start() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.info('getUserMedia is not supported');
      return;
    }

    navigator.mediaDevices.enumerateDevices()
      .then(this.gotDevices)
      .catch(e => console.error(`${e.name}: ${e.message}`));
  }

  render() {
    return (
      <div>
        <div>
          <label>audio input device: </label>
          <select ref={e => this.audioInput = e}></select>
        </div>

        <div>
          <label> audio output device: </label>
          <select ref={e => this.audioOutput = e}></select>
        </div>

        <div>
          <label> video input device: </label>
          <select ref={e => this.videoInput = e}></select>
        </div>
      </div>
    );
  }
}