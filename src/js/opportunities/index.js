const axios = require('axios');

const CONSTANTS = {
  URL: 'http://www.mocky.io/v2/5d6fb6b1310000f89166087b'
}

const Opportunities = (() => {
  return {
    get_open: async () => {
      let response = await axios.get(CONSTANTS.URL);
      return response.data.vagas.flatMap((vaga) => {
        if (!vaga.ativa) return [];
        const { link, cargo, localizacao } = vaga;
        let loc = 'Remoto';
        if (localizacao) {
          const { bairro, cidade, pais } = localizacao;
          loc = `${bairro} - ${cidade}, ${pais}`;
        }
        return { cargo: cargo, link: link, localizacao: loc };
      });
    }
  }
})();

module.exports = Opportunities;
