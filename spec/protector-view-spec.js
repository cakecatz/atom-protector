'use babel';
/* eslint-env jasmine */

import ProtectorView from '../lib/protector-view';
import File from '../lib/file';

describe('ProtectorView', () => {
  const protectorView = new ProtectorView({
    file: new File(`${__dirname}/fixtures/dummy`)
  });

  it('display file size', () => {
    expect(protectorView.element.querySelector('.filesize').innerText).toBe('FileSize: 1 KB');
  });
});
