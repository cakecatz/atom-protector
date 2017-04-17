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
        Size: {filesize(this.props.file.getFileSize())}
      </div>
    );
  }

  drawMessage () {
    return (
      <div className='message'>
        <div className='icon icon-stop' />
        <p className='file-url'>{this.props.file.url}</p>
        You're trying to open a large file. <br />
        Are you sure you want to continue?
      </div>
    );
  }

  drawButtons () {
    return (
      <div className='block buttons'>
        <button className='protector-open-btn inline-block btn-success btn icon icon-check' onclick={this.props.onClickOpenButton}>Open it</button>
        <button className='protector-close-btn inline-block btn icon icon-x' onclick={this.props.onClickCloseButton}>Close it</button>
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
