import "./index.html";

import initChart from './jarvis-chart';
import values from './values';

const node = document.getElementById('chart');

const api = initChart(node, {
  render: 'svg',
  values: values,
  redrawContinuously: false,
  prices: new Array(1000).fill(0).map((v, i) => (i - 500) * 10)
});

console.log('Chart initialized, API:', api);
