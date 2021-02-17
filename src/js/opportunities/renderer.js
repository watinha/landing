module.exports = {
  render: (opportunities, container) => {
    const html = opportunities.map((opportunity) => {
      let { cargo, link, localizacao } = opportunity;
      return (
      `<li>
        <a href="${link}">${cargo}</a>
        <span class="address">${localizacao}</span>
      </li>`
      );
    }).join(' ');
    container.innerHTML = html;
  }
};
