// Import React y ReactDOM
import React from 'react';
import { createRoot } from 'react-dom/client';

// Importar estilos globales
import "../styles/index.css";

// Importar componentes propios
import Layout from './layout.js';

// Importar el contexto
import AppContext from './store/appContext';

// Crear la raíz de React
const root = createRoot(document.querySelector("#app"));

// Renderizar la aplicación
root.render(
        <Layout />
   
);
