import { TravellersCompanionClientPage } from './app.po';

describe('travellers-companion-client App', function() {
  let page: TravellersCompanionClientPage;

  beforeEach(() => {
    page = new TravellersCompanionClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
