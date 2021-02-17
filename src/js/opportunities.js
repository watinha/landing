const axios = require('axios');

const CONSTANTS = {
  URL: 'http://www.mocky.io/v2/5d6fb6b1310000f89166087b'
}

const Opportunities = (() => {
  return {
    get_open: async () => {
      let response = await axios.get(CONSTANTS.URL);
      return response.data.vagas.map((vaga) => {
        if (!vaga.ativa) return false;
        const { link, cargo, localizacao } = vaga;
        let loc = 'Remoto';
        if (localizacao) {
          const { bairro, cidade, pais } = localizacao;
          loc = `${bairro} - ${cidade}, ${pais}`;
        }
        return { cargo: cargo, link: link, localizacao: loc };
      }).filter((vaga) => vaga);
    }
  }
})();

module.exports = Opportunities;
