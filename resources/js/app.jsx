// Remendo para navegadores que não suportam Object.hasOwn
if (!Object.hasOwn) {
    Object.hasOwn = function (obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
    };
}

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
    let page = pages[`./Pages/${name}.jsx`];
    
    // Se não encontrar, tenta retornar o erro de forma clara
    if (!page) {
        console.error(`Componente não encontrado: ./Pages/${name}.jsx`);
        return;
    }

    // O Inertia precisa do que está dentro de .default
    return page.default;
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});