const { get_open } = require('../src/js/opportunities'),
      axios = require('axios');

jest.mock('axios');

describe('#opportunities', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should retrieve no opportunities', async () => {
    let open = null;
    axios.get.mockResolvedValue({ data: {
      "vagas": []
    } });

    open = await get_open();

    expect(axios.get.mock.calls.length).toBe(1);
    expect(axios.get.mock.calls[0][0]).toBe('http://www.mocky.io/v2/5d6fb6b1310000f89166087b')
    expect(open).toEqual([]);
  });

  it('should retrieve a single opportunity', async () => {
    let open = null;
    axios.get.mockResolvedValue({ data: {
      "vagas": [{
          "cargo": "Dev1",
          "ativa": true,
          "link": "url",
          "localizacao": {
            "bairro": "b1",
            "cidade": "sp",
            "pais": "Brasil"
          }
      }]
    } });

    open = await get_open();

    expect(axios.get.mock.calls.length).toBe(1);
    expect(axios.get.mock.calls[0][0]).toBe('http://www.mocky.io/v2/5d6fb6b1310000f89166087b')
    expect(open).toEqual([{
        "cargo": "Dev1",
        "link": "url",
        "localizacao": "b1 - sp, Brasil"
    }]);
  });

  it('should retrieve a multiple opportunities', async () => {
    let open = null;
    axios.get.mockResolvedValue({ data: {
      "vagas": [
        {
          "cargo": "Dev2", "ativa": true, "link": "url2",
          "localizacao": {
            "bairro": "b2", "cidade": "pr", "pais": "en"
          }
        },
        {
          "cargo": "Dev3", "ativa": true, "link": "url3",
          "localizacao": {
            "bairro": "b3", "cidade": "mt", "pais": "us"
          }
        },
      ]
    } });

    open = await get_open();

    expect(axios.get.mock.calls.length).toBe(1);
    expect(axios.get.mock.calls[0][0]).toBe('http://www.mocky.io/v2/5d6fb6b1310000f89166087b')
    expect(open).toEqual([
      {
        "cargo": "Dev2", "link": "url2",
        "localizacao": "b2 - pr, en"
      },
      {
        "cargo": "Dev3", "link": "url3",
        "localizacao": "b3 - mt, us"
      },
    ]);
  });

  it('should filter inactive opportunities', async () => {
    let open = null;
    axios.get.mockResolvedValue({ data: {
      "vagas": [
        {
          "cargo": "Dev2", "ativa": false, "link": "url2",
          "localizacao": {
            "bairro": "b2", "cidade": "pr", "pais": "en"
          }
        },
        {
          "cargo": "Dev3", "ativa": true, "link": "url3",
          "localizacao": {
            "bairro": "b3", "cidade": "mt", "pais": "us"
          }
        },
      ]
    } });

    open = await get_open();

    expect(axios.get.mock.calls.length).toBe(1);
    expect(axios.get.mock.calls[0][0]).toBe('http://www.mocky.io/v2/5d6fb6b1310000f89166087b')
    expect(open).toEqual([
      {
        "cargo": "Dev3", "link": "url3",
        "localizacao": "b3 - mt, us"
      },
    ]);
  });

  it('should change to remote empty localizacao', async () => {
    let open = null;
    axios.get.mockResolvedValue({ data: {
      "vagas": [
        { "cargo": "Dev2", "ativa": true, "link": "url2", },
        { "cargo": "Dev3", "ativa": true, "link": "url3",
        },
      ]
    } });

    open = await get_open();

    expect(axios.get.mock.calls.length).toBe(1);
    expect(axios.get.mock.calls[0][0]).toBe('http://www.mocky.io/v2/5d6fb6b1310000f89166087b')
    expect(open).toEqual([
      {
        "cargo": "Dev2", "link": "url2",
        "localizacao": "Remoto"
      },
      {
        "cargo": "Dev3", "link": "url3",
        "localizacao": "Remoto"
      },
    ]);
  });
});
