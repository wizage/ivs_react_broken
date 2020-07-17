/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-env browser */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import {
  create,
  isPlayerSupported,
  MediaPlayer,
  PlayerError,
  PlayerEventType,
  PlayerState,
  Quality,
  TextCue,
  TextMetadataCue,
} from 'amazon-ivs-player';
// import wasmWorkerPath from 'amazon-ivs-player/dist/assets/amazon-ivs-wasmworker.min.js';
// import wasmBinaryPath from 'amazon-ivs-player/dist/assets/amazon-ivs-wasmworker.min.wasm';

class Video extends Component {
  componentDidMount() {
    const { src, parentCallback } = this.props;
    /* Location 13 */
    if (isPlayerSupported) {
      const config = {
        wasmWorker: `https://amazonbooth.s3-us-west-2.amazonaws.com/Test/amazon-ivs-wasmworker.min.js`,
        wasmBinaryPath: `https://amazonbooth.s3-us-west-2.amazonaws.com/Test/amazon-ivs-wasmworker.min.wasm`
      };
      console.log(config);
      const player = create(config);
      this.player = player;
      this.attachListeners();
      
      player.load('https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.xhP3ExfcX8ON.m3u8');
      player.setAutoplay(true);
      player.attachHTMLVideoElement(this.videoNode);
      console.log(player, this.player, this.videoNode);
     
      //this.player = videojs(this.videoNode, this.props);
    }
    
  }
  attachListeners() {
    const { player } = this;
    for (let state of Object.values(PlayerState)) {
        player.addEventListener(state, () => {
            console.log(state);
        });
    }

    player.addEventListener(PlayerEventType.INITIALIZED, () => {
        console.log('INITIALIZED');
    });

    player.addEventListener(PlayerEventType.ERROR, (error) => {
        console.error('ERROR', error);
    });

    player.addEventListener(PlayerEventType.QUALITY_CHANGED, (quality) => {
        console.log('QUALITY_CHANGED', quality);
    });

    // This event fires when text cues are encountered, such as captions or subtitles
    player.addEventListener(PlayerEventType.TEXT_CUE, (cue) => {
        console.log('TEXT_CUE', cue.startTime, cue.text);
    });

    // This event fires when embedded Timed Metadata is encountered
    player.addEventListener(PlayerEventType.TEXT_METADATA_CUE, (cue) => {
        console.log('Timed metadata', cue.text);
    });
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    return (
      <div>
        <div>
          <video ref={(node) => { this.videoNode = node; }} ></video>
        </div>
      </div>
    );
  }
}

export default Video;