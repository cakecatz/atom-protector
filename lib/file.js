'use babel';

import fs from 'fs';
import { Emitter } from 'atom'; // eslint-disable-line

class File {
  constructor (url) {
    this.url = url;
    this.stats = fs.statSync(url);
    this.emitter = new Emitter();
  }

  getTitle () {
    return this.url;
  }

  getFileSize () {
    return this.stats.size;
  }

  terminatePendingState () {
    this.emitter.emit('did-terminate-pending-state');
    this.hasTerminatedPendingState = true;
  }
}

export default File;
