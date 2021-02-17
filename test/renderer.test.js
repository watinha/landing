const { render } = require('../src/js/opportunities/renderer');

let container = null;

describe('renderer.render', () => {

  beforeEach(() => {
    container = document.createElement('ul');
  });

  it('should render empty', () => {
    const opportunities = [];

    render(opportunities, container);

    expect(container.innerHTML).toEqual('');
  });

  it('should render one li for opportunity', () => {
    const opportunities = [{
        "cargo": "Dev1", "link": "url",
        "localizacao": "b1 - sp, Brasil" }];
    let lis, as;

    render(opportunities, container);

    lis = container.querySelectorAll('li');
    as = container.querySelectorAll('a');
    spans = container.querySelectorAll('.address');

    expect(lis.length).toBe(1);
    expect(as.length).toBe(1);
    expect(spans.length).toBe(1);

    expect(as[0].href).toMatch(/url/);
    expect(as[0].innerHTML).toMatch(/Dev1/);
    expect(spans[0].innerHTML).toMatch(/b1 - sp, Brasil/);
  });

  it('should render two lis for opportunity', () => {
    const opportunities = [{
        "cargo": "Dev2", "link": "url2",
        "localizacao": "Remoto"
      },
      {
        "cargo": "Dev3", "link": "url3",
        "localizacao": "Remoto"
      },
    ];
    let lis, as;

    render(opportunities, container);

    lis = container.querySelectorAll('li');
    as = container.querySelectorAll('a');
    spans = container.querySelectorAll('.address');

    expect(lis.length).toBe(2);
    expect(as.length).toBe(2);
    expect(spans.length).toBe(2);
  });
});
