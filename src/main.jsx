import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import '../styles/globals.css';
import '../styles/components.css';

const container = document.getElementById('root');
const tree = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Every built route ships prerendered markup (scripts/prerender.mjs), so hydrate
// it rather than throwing it away. In `vite dev` there is no prerender, and the
// shell still has a <noscript> child, so key off the explicit flag instead of
// hasChildNodes() -- hydrating a noscript-only root is a guaranteed mismatch.
if (container.dataset.prerendered === 'true') {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
