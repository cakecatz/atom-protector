'use babel';

import { CompositeDisposable } from 'atom'; // eslint-disable-line
import url from 'url';
import filesizeParser from 'filesize-parser';
import ProtectorView from './protector-view';
import File from './file';

export default {

  config: {
    limitFilesize: {
      type: 'string',
      default: '100KB',
      minimum: 0
    }
  },
  limitFilesize: 0,
  subscriptions: null,
  acceptedUrls: [],

  activate () {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.workspace.addOpener((urlString) => {
      if (this.acceptedUrls.includes(urlString)) {
        return null;
      }

      const parsedUrl = url.parse(urlString);
      if (parsedUrl.protocol != null) {
        return null;
      }
      const file = new File(urlString);
      if (file.getFileSize() >= this.limitFilesize) {
        return file;
      }
      return null;
    }));

    this.setFilesizeLimit(atom.config.get('protector.limitFilesize'));

    this.subscriptions.add(atom.views.addViewProvider(File, (file) => {
      const v = new ProtectorView({
        file,
        onClickOpenButton: () => {
          this.acceptedUrls.push(file.url);
          atom.workspace.getActivePane().destroyItem(file);
          atom.workspace.open(file.url);
        },
        onClickCloseButton: () => {
          atom.workspace.getActivePane().destroyItem(file);
        }
      });
      return v.element;
    }));

    atom.config.observe('protector.limitFilesize', (value) => {
      this.setFilesizeLimit(value);
    });
  },

  setFilesizeLimit (value) {
    this.limitFilesize = filesizeParser(value);
  },

  deactivate () {
    this.subscriptions.dispose();
  }
};
