import { JSDOM } from 'jsdom';

const dom = new JSDOM(`<div id="app"></div>`, { url: "http://localhost:3000" });

global.document = dom.window.document;
global.window = {
  history: {
    pushState: () => true,
  },
};