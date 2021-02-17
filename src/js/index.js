import { get_open } from './opportunities';
import { render } from './opportunities/renderer';

import '../css/style.css';
import 'reset-css';

(async () => {
  const opportunities = await get_open(),
        container = document.querySelector('ul.vagas');
  render(opportunities, container);
})();
