import { Angular2D3Page } from './app.po';

describe('angular2-d3 App', function() {
  let page: Angular2D3Page;

  beforeEach(() => {
    page = new Angular2D3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
