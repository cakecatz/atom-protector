'use babel';
/** @jsx etch.dom **/

import etch from 'etch';
import filesize from 'filesize';

class ProtectorView {
  constructor (props) {
    this.props = props;
    etch.initialize(this);
  }

  update () {
    return etch.update(this);
  }

  async destroy () {
    await etch.destroy(this);
  }

  getFileSize () {
    return (
      <div className='filesize'>
        FileSize: {filesize(this.props.file.getFileSize())}
      </div>
    );
  }

  drawMessage () {
    return (
      <div className='message'>
        <div className='icon icon-stop' />
        <p className='file-url'>{this.props.file.url}</p>
        This file is so large. <br />
        Are you sure you want to open?
      </div>
    );
  }

  drawButtons () {
    return (
      <div className='block buttons'>
        <button className='open inline-block btn-success btn' onclick={this.props.onClickOpenButton}>Open</button>
        <button className='close inline-block btn icon icon-x' onclick={this.props.onClickCloseButton}>Close</button>
      </div>
    );
  }

  render () {
    return (
      <div className='protector'>
        {this.drawMessage()}
        {this.getFileSize()}
        {this.drawButtons()}
      </div>
    );
  }
}

export default ProtectorView;
