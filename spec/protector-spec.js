'use babel';
/* eslint-env jasmine */

describe('Protector', () => {
  beforeEach(() => {
    waitsForPromise(() => atom.packages.activatePackage('protector'));

    runs(() => {
      atom.config.set('protector.limitFilesize', '1KB');
    });
  });

  describe('when open file that file size over limit size', () => {
    beforeEach(() => {
      waitsForPromise(() => atom.workspace.open(`${__dirname}/fixtures/dummy`));
    });

    it('open File instead of TextEditor', () => {
      const item = atom.workspace.getActivePaneItem();
      expect(item.constructor.name).toBe('File');
    });

    describe('when click close buton', () => {
      it('close item', () => {
        const workspaceElement = atom.views.getView(atom.workspace);
        workspaceElement.querySelector('.protector .close').click();
        expect(atom.workspace.getActivePaneItem()).toBe(undefined);
      });
    });

    describe('when click open buton', () => {
      it('open TextEditor', () => {
        jasmine.unspy(window, 'setTimeout');
        const workspaceElement = atom.views.getView(atom.workspace);
        workspaceElement.querySelector('.protector .open').click();

        waitsForPromise(() => {
          return new Promise((resolve) => {
            setInterval(() => {
              resolve();
            }, 100);
          });
        });

        runs(() => {
          const item = atom.workspace.getActivePaneItem();
          expect(item.constructor.name).toBe('TextEditor');
        });
      });
    });
  });
});
