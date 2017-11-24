import { PushAppPage } from './app.po';

describe('push-app App', () => {
  let page: PushAppPage;

  beforeEach(() => {
    page = new PushAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
