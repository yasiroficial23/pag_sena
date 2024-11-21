// Arreglos para almacenar motos, carrito y ventas
let motos = [];
let carrito = [];
let ventas = [];

// Referencias a elementos del DOM
const formRegistro = document.getElementById("formRegistro");
const tablaLista = document.getElementById("tablaLista");
const catalogoMotos = document.getElementById("catalogoMotos");
const tablaCarrito = document.getElementById("tablaCarrito");
const contadorCarrito = document.getElementById("contadorCarrito");
const tablaVentas = document.getElementById("tablaVentas");
const botonComprar = document.getElementById("botonComprar");

// Registro de motos
if (formRegistro) {
    formRegistro.addEventListener("submit", (event) => {
        event.preventDefault();

        const nombre = document.getElementById("nombreMoto").value;
        const descripcion = document.getElementById("descripcionMoto").value;
        const precio = parseFloat(document.getElementById("precioMoto").value);
        const imagen = document.getElementById("imagenMoto").value;

        motos.push({ nombre, descripcion, precio, imagen });
        alert("Moto registrada correctamente.");
        formRegistro.reset();
        mostrarListaMotos();
        mostrarCatalogo();
    });
}

// Mostrar lista de motos registradas
function mostrarListaMotos() {
    if (tablaLista) {
        tablaLista.innerHTML = motos
            .map(
                (moto, index) => `
            <tr>
                <td>${moto.nombre}</td>
                <td>${moto.descripcion}</td>
                <td>$${moto.precio.toFixed(2)}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editarMoto(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarMoto(${index})">Eliminar</button>
                </td>
            </tr>`
            )
            .join("");
    }
}

// Editar moto
function editarMoto(index) {
    const nuevaDescripcion = prompt(
        "Ingrese la nueva descripción:",
        motos[index].descripcion
    );
    const nuevoPrecio = prompt("Ingrese el nuevo precio:", motos[index].precio);

    if (nuevaDescripcion !== null && nuevoPrecio !== null) {
        motos[index].descripcion = nuevaDescripcion;
        motos[index].precio = parseFloat(nuevoPrecio);
        alert("Moto actualizada correctamente.");
        mostrarListaMotos();
        mostrarCatalogo();
    }
}

// Eliminar moto
function eliminarMoto(index) {
    motos.splice(index, 1);
    alert("Moto eliminada correctamente.");
    mostrarListaMotos();
    mostrarCatalogo();
}

// Mostrar catálogo en el índice principal
function mostrarCatalogo() {
    if (catalogoMotos) {
        catalogoMotos.innerHTML = motos
            .map(
                (moto, index) => `
            <div class="col-md-4">
                <div class="card mb-3">
                    <img src="${moto.imagen}" class="card-img-top" alt="${moto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${moto.nombre}</h5>
                        <p class="card-text">${moto.descripcion}</p>
                        <p class="card-text text-primary">$${moto.precio.toFixed(2)}</p>
                        <button class="btn btn-success" onclick="agregarCarrito(${index})">Agregar al 🛒</button>
                    </div>
                </div>
            </div>`
            )
            .join("");
    }
}

// Agregar moto al carrito
function agregarCarrito(index) {
    const moto = motos[index];
    const existe = carrito.find((item) => item.nombre === moto.nombre);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ ...moto, cantidad: 1 });
    }

    actualizarCarrito();
}

// Actualizar visualización del carrito
function actualizarCarrito() {
    contadorCarrito.textContent = carrito.reduce(
        (total, item) => total + item.cantidad,
        0
    );

    if (tablaCarrito) {
        tablaCarrito.innerHTML = carrito
            .map(
                (item, index) => `
            <tr>
                <td>${item.nombre}</td>
                <td>
                    <button class="btn btn-sm btn-secondary" onclick="disminuirCantidad(${index})">-</button>
                    ${item.cantidad}
                    <button class="btn btn-sm btn-secondary" onclick="aumentarCantidad(${index})">+</button>
                </td>
                <td>$${(item.cantidad * item.precio).toFixed(2)}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${index})">Eliminar</button>
                </td>
            </tr>`
            )
            .join("");
    }
}

// Aumentar cantidad en el carrito
function aumentarCantidad(index) {
    carrito[index].cantidad++;
    actualizarCarrito();
}

// Disminuir cantidad en el carrito
function disminuirCantidad(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
    } else {
        carrito.splice(index, 1);
    }
    actualizarCarrito();
}

// Eliminar moto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Comprar motos del carrito
if (botonComprar) {
    botonComprar.addEventListener("click", () => {
        ventas.push(...carrito);
        carrito = [];
        actualizarCarrito();
        mostrarVentas();
        alert("Compra realizada correctamente.");
    });
}

// Mostrar registro de ventas
function mostrarVentas() {
    if (tablaVentas) {
        tablaVentas.innerHTML = ventas
            .map(
                (venta) => `
            <tr>
                <td>${venta.nombre}</td>
                <td>${venta.cantidad}</td>
                <td>$${(venta.cantidad * venta.precio).toFixed(2)}</td>
            </tr>`
            )
            .join("");
    }
}

// Inicializar catálogo al cargar la página
mostrarCatalogo();
