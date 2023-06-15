// Por: Aníbal Esteban Gómez Alcázar
// Curso: Desarrollo Web - AMCHAN (Hackatón del 15 de junio de 2023 - Cartagena)

import React from 'react';                                          // Llamada al React
import Header from './Componentes/Header';                          // Llamada del Componente del Encabezado (Header)
import Dashboard from './Componentes/Dashboard';                    // Llamada del componente de Panel de Control
import Footer from './Componentes/Footer';                          // Llamada del componente de Pie de Página (Footer)
import './index.css';                                               // Llamada de los estilos CSS

const App = () => {
  return (
    <div>
      {/* Encabezado */}
      <Header />

      {/* Mensaje General de la página */}
      <div className="message">
        <p className="metric-value">Se presenta el panel de control de la tienda virtual con los resultados e información total relacionada a los productos, pedidos y las demás métricas de la tienda virtual.</p>
      </div>

      {/* Panel de Control*/}
      <Dashboard />

      {/* Pie de Página */}
      <Footer />
    </div>
  );
};

export default App;
