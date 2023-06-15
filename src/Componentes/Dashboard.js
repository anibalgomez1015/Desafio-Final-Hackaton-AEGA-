import React, { useEffect, useState } from 'react';                     // Llamada de Hooks de React

const Dashboard = () => {        // Función para el Panel de Control (Dashboard)
  // Estado para almacenar los datos de las métricas y los productos más vendidos en el Panel de Control
  const [totalProducts, setTotalProducts] = useState(0);                // Número total de productos en la tienda
  const [totalOrders, setTotalOrders] = useState(0);                    // Número total de pedidos realizados
  const [totalRevenue, setTotalRevenue] = useState(0);                  // Ingresos totales generados
  const [averagePrice, setAveragePrice] = useState(0);                  // Precio promedio de los productos
  const [topSellingProducts, setTopSellingProducts] = useState([]);     // Productos más vendidos
  const [productList, setProductList] = useState([]);                   // Lista de Productos
  const [orders, setOrders] = useState([]);                             // Pedidos
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulación de una carga de datos
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    // La Lógica para obtener los datos de la API
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(response => response.json())
      .then(products => {
        setProductList(products); // Establecer la lista de productos
        const fakeOrders = generateFakeOrders(products, 10); // Generar 10 pedidos ficticios
        setOrders(fakeOrders); // Establecer los pedidos generados
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
      });
  }, []);

  // Función para generar datos ficticios de pedidos
  const generateFakeOrders = (products, numOrders) => {
    const orders = [];

    for (let i = 0; i < numOrders; i++) {
      const order = {
        id: i + 1,
        products: [],
      };

      // Generar un número aleatorio de productos para cada pedido
      const numProducts = Math.floor(Math.random() * (5 - 1 + 1)) + 1;

      // Generar productos aleatorios para el pedido
      for (let j = 0; j < numProducts; j++) {
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        const quantity = Math.floor(Math.random() * (10 - 1 + 1)) + 1;  // Generar una cantidad aleatoria entre 1 y 10

        order.products.push({
          id: randomProduct.id,
          quantity: quantity,
        });
      }

      orders.push(order);
    }

    return orders;
  };

  useEffect(() => {
    setTotalProducts(productList.length);       // Establecer el número total de productos

    if (orders.length > 0) {
      setTotalOrders(orders.length);            // Establecer el número total de pedidos realizados

      const revenue = orders.reduce((total, order) => {
        const orderTotal = order.products.reduce((subtotal, product) => {
          const foundProduct = productList.find(p => p.id === product.id);
          return subtotal + foundProduct.price * product.quantity;
        }, 0);
        return total + orderTotal;
      }, 0);
      setTotalRevenue(revenue);                 // Establecer los ingresos totales generados

      const average = revenue / productList.length;
      setAveragePrice(average);                 // Establecer el precio promedio de los productos

      const productSales = {};
      orders.forEach(order => {
        order.products.forEach(product => {
          const productId = product.id;

          if (productSales[productId]) {
            productSales[productId] += product.quantity;
          } else {
            productSales[productId] = product.quantity;
          }
        });
      });

      const sortedProducts = Object.entries(productSales)
        .sort(([, a], [, b]) => b - a)
        .map(([productId, quantity]) => {
          return productList.find(product => product.id === parseInt(productId, 10));
        })
        .slice(0, 5);
      setTopSellingProducts(sortedProducts);     // Establecer los productos más vendidos
    }
  }, [productList, orders]);

  return (
    <div className="dashboard">
      {/* Llamada a las distintas métricas */}
      <div className="metrics-container">
        {/* Mostrar el número total de productos */}
        <div className="metric">
          <h3 className="metric-title">Número total de productos</h3>
          {isLoading ? (
            <p className="loading-indicator">...</p>
          ) : (
            <p className="metric-value">{totalProducts}</p>
          )}
        </div>
  
        {/* Mostrar el número total de pedidos */}
        <div className="metric">
          <h3 className="metric-title">Número total de pedidos</h3>
          {isLoading ? (
            <p className="loading-indicator">...</p>
          ) : (
            <p className="metric-value">{totalOrders}</p>
          )}
        </div>
  
        {/* Mostrar los ingresos totales generados */}
        <div className="metric">
          <h3 className="metric-title">Ingresos totales generados</h3>
          {isLoading ? (
            <p className="loading-indicator">...</p>
          ) : (
            <p className="metric-value">${totalRevenue.toFixed(2)}</p>
          )}
        </div>
  
        {/* Mostrar el precio promedio de los productos */}
        <div className="metric">
          <h3 className="metric-title">Precio promedio de los productos</h3>
          {isLoading ? (
            <p className="loading-indicator">...</p>
          ) : (
            <p className="metric-value">${averagePrice.toFixed(2)}</p>
          )}
        </div>
  
        {/* Mostrar los Productos más vendidos */}
        <h3 className="metric-title">Productos más vendidos</h3>
        <br />
        {isLoading ? (
          <p className="loading-indicator">...</p>
        ) : (
          <ul className="top-products-list">
            {topSellingProducts.map(product => (
              <li key={product.id}>
                {product.title} - ${product.price}
              </li>
            ))}
          </ul>
        )}
      </div>
      <br />
      <br />
    </div>
  );    
};

export default Dashboard;