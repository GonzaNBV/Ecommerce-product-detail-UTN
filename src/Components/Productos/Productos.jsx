import React, { useState } from "react";
import "./Productos.css";

const Productos = () => {
  // Datos de los productos
  const productos = [
    {
      id: 1,
      imagenes: [
        "/0-images/Sudadera/sudadera-cremallera-mulyu-1.jpg",
        "/0-images/Sudadera/sudadera-cremallera-mulyu-2.jpg",
        "/0-images/Sudadera/sudadera-cremallera-mulyu-3.jpg",
      ],
      titulo: "RM WILLIAMS",
      descripcion: "Sudadera Mulungarie con cremallera de un cuarto",
      precioOriginal: 84300,
      descuento: 30,
      color: "#979B85",
      tallas: ["S", "M", "L", "XL", "XXL"],
    },
    {
      id: 2,
      imagenes: [
        "/0-images/Camiseta/vara-polo-1.jpg",
        "/0-images/Camiseta/vara-polo-2.jpg",
        "/0-images/Camiseta/vara-polo-3.jpg",
      ],
      titulo: "RM WILLIAMS",
      descripcion: "Camiseta polo de algodón con ajuste clásico",
      precioOriginal: 42000,
      descuento: 20,
      color: "#375C88",
      tallas: ["S", "M", "L", "XL", "XXL"],
    },
    {
      id: 3,
      imagenes: [
        "/0-images/Chaqueta/chaqueta-bomber-palmer-1.jpg",
        "/0-images/Chaqueta/chaqueta-bomber-palmer-2.jpg",
        "/0-images/Chaqueta/chaqueta-bomber-palmer-3.jpg",
      ],
      titulo: "RM WILLIAMS",
      descripcion: "Chaqueta bomber de abrigo ligero",
      precioOriginal: 91000,
      descuento: 30,
      color: "#8D8D69",
      tallas: ["S", "M", "L", "XL", "XXL"],
    },
  ];

  // Estado de cantidades
  const [cantidades, setCantidades] = useState(
    productos.reduce((acc, producto) => {
      acc[producto.id] = 1;
      return acc;
    }, {})
  );

  // Estado para la compra y selección
  const [productoComprado, setProductoComprado] = useState(null);
  const [imagenActual, setImagenActual] = useState({});
  const [tallaSeleccionada, setTallaSeleccionada] = useState({});

  // Incrementar cantidad
  const incrementar = (id) => {
    setCantidades((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  // Decrementar cantidad
  const decrementar = (id) => {
    setCantidades((prev) => ({ ...prev, [id]: Math.max(prev[id] - 1, 1) }));
  };

  // Calcular precio con descuento
  const calcularPrecioActual = (precioOriginal, descuento) => {
    return precioOriginal - (precioOriginal * descuento) / 100;
  };

  // Manejar compra
  const manejarCompra = (id) => {
    setProductoComprado(id);
  };

  // Cambiar imagen
  const siguienteImagen = (id, imagenes) => {
    setImagenActual((prev) => {
      const currentIndex = prev[id] || 0;
      const nextIndex = (currentIndex + 1) % imagenes.length;
      return {
        ...prev,
        [id]: nextIndex,
      };
    });
  };

  // Obtener índice de imagen
  const imagenIndex = (id) => imagenActual[id] || 0;

  return (
    <div className="productos-container">
      {productos.map((producto) => (
        <div
          className={`product-card ${producto.id === productoComprado ? "comprado" : ""}`}
          key={producto.id}
        >
          <div className="image-slider">
            <img
              src={producto.imagenes[imagenIndex(producto.id)]}
              alt={producto.titulo}
              className="product-image"
              onClick={() => siguienteImagen(producto.id, producto.imagenes)}
            />
            <div className="arrow-left">
              <i className="bi bi-caret-left-fill"></i>
            </div>
            <div className="arrow-right">
              <i className="bi bi-caret-right-fill"></i>
            </div>
          </div>

          <h3 className="titulo-principal">{producto.titulo}</h3>
          <p className="descripcion-producto">{producto.descripcion}</p>

          <div className="price">
            <span className="precio-original">
              ${producto.precioOriginal.toLocaleString()}
            </span>
            <span className="price-updated">
              ${calcularPrecioActual(producto.precioOriginal, producto.descuento).toLocaleString()}
            </span>
          </div>

          {producto.descuento > 0 && (
            <div className="discount-text">{producto.descuento}% DE DESCUENTO</div>
          )}

          <div
            className="color-indicator"
            style={{ backgroundColor: producto.color }}
          ></div>

          <div className="size-selector">
            {producto.tallas.map((talla) => (
              <button
                key={talla}
                className={talla === tallaSeleccionada[producto.id] ? "selected" : ""}
                onClick={() => {
                  setTallaSeleccionada((prev) => ({ ...prev, [producto.id]: talla }));
                }}
              >
                {talla}
              </button>
            ))}
          </div>

          <div className="contador">
            <button onClick={() => decrementar(producto.id)}>-</button>
            <input type="text" value={cantidades[producto.id]} readOnly />
            <button onClick={() => incrementar(producto.id)}>+</button>
          </div>

          <button
            className="boton-comprar"
            onClick={() => manejarCompra(producto.id)}
          >
            COMPRAR
          </button>

          {producto.id === productoComprado && (
            <div className="mensaje-compra">GRACIAS POR SU COMPRA</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Productos;
