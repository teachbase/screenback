'use strict'

import {VERSION} from './version';
import h2cloader from './html2canvas_loader';

export default class screenback {
  static get version(){
    return VERSION;
  }

  constructor(options = {}){
    let {html2canvas, proxy} = options;
    this.options = {};
    this.options.html2canvas = html2canvas || '//s3-eu-west-1.amazonaws.com/meetingassets/html2canvas.js';
    this.options.proxy = proxy || false;
  }

  render(element = document.body){
    return h2cloader.instance.load(this.options.html2canvas).then(
      () => { 
        return html2canvas(element, this.options);
      }
    );
  }
}
