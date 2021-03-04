import { get_open } from './opportunities';
import { render } from './opportunities/renderer';

import '../css/style.css';
import 'reset-css';

(async () => {
  const opportunities = await get_open(),
        container = document.querySelector('ul.vagas'),
        news_container = document.querySelector('.news__container');
  render(opportunities, container);
  news_container.innerHTML = `<iframe class="news__video" width="560" height="315" src="https://www.youtube.com/embed/UQ2-6gk9Szs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
})();
