import { AgaFEPage } from './app.po';

describe('aga-fe App', () => {
  let page: AgaFEPage;

  beforeEach(() => {
    page = new AgaFEPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
