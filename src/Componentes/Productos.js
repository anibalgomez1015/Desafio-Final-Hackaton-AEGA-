import React, { useEffect, useState } from 'react';

const Productos = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener los productos
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(response => response.json())
      .then(products => {
        setProductList(products); // Establecer la lista de productos
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
      });
  }, []);

  return (
    <div>
      <h2 className="metric-title">Listado de productos</h2>
      <ul>
        {productList.map(product => (
          <li key={product.id}>
            {product.title} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Productos;
