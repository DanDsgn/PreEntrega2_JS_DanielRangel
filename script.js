
const listar = (lista, propiedad1, propiedad2) => lista.map(producto => producto[propiedad1] + " - " + producto[propiedad2]).join("\n")

principal()

function principal() {
    let productos = [
        {
            name: "Ruffles Queso",
            id: 663712,
            contNet: 175,
            medida: "gramos",
            presentacion: "Bolsa",
            categoria: "fritura",
            boxCont: 24,
            caducidad: '2024-12-06',
            inventario: 458,
            precioRet: 34,
            precioVent: 58,
            precioVentMay: 42
        },
        {
            name: "Nachos salados",
            id: 343712,
            contNet: 198,
            medida: "gramos",
            presentacion: "Bolsa",
            categoria: "fritura",
            boxCont: 12,
            caducidad: '2024-09-06',
            inventario: 35,
            precioRet: 63,
            precioVent: 70,
            precioVentMay: 66
        },
        {
            name: "CocaCola",
            id: 343723,
            contNet: 600,
            medida: "mililitros",
            presentacion: "botella",
            categoria: "refresco",
            boxCont: 12,
            caducidad: '2024-03-06',
            inventario: 35,
            precioRet: 63,
            precioVent: 70,
            precioVentMay: 66
        },
        {
            name: "Maruchan",
            id: 331812,
            contNet: 60,
            medida: "gramos",
            presentacion: "vaso",
            categoria: "fritura",
            boxCont: 24,
            caducidad: '2025-02-18',
            inventario: 79,
            precioRet: 9,
            precioVent: 15,
            precioVentMay: 12
        },
        {
            name: "Old Space",
            id: 750630,
            contNet: 150,
            medida: "mililitros",
            presentacion: "aerosol",
            categoria: "Cuidado Personal",
            boxCont: 8,
            caducidad: '2026-05-14',
            inventario: 349,
            precioRet: 30,
            precioVent: 49,
            precioVentMay: 40
        },
        {
            name: "Old Space",
            id: 750043,
            contNet: 50,
            medida: "gramos",
            presentacion: "barra",
            categoria: "Cuidado Personal",
            boxCont: 18,
            caducidad: '2025-09-23',
            inventario: 233,
            precioRet: 21,
            precioVent: 34,
            precioVentMay: 26
        }
    ]

    let carrito = []
    let opcionMenu
    do {

        opcionMenu = Number(prompt("1 - agregar producto al carrito\n2 - filtrar por categoria\n3 - ver información extra de un prod\n4 - para finalizar compra\n0 - salir"))

        if (opcionMenu === 1) {
            agregarProductoAlCarrito(productos, carrito)
        } else if (opcionMenu === 2) {
            filtrarPorCategoria(productos)
        } else if (opcionMenu === 3) {
            let idProducto = Number(prompt("Seleccione producto por id para ver más info\n" + listar(productos, "id", "name")))
            let productoBuscado = productos.find(producto => producto.id === idProducto)
            alert("Nombre: " + productoBuscado.name + " - Stock: " + productoBuscado.inventario)
        } else if (opcionMenu === 4) {
            let total = carrito.reduce((acum, producto) => acum + producto.subtotal, 0)
            alert("Valor total de la compra: " + total + "\nGracias por elegirnos")
        }
    } while (opcionMenu !== 0);
}

function filtrarPorCategoria(productos) {
    let categorias = []
    productos.forEach(producto => {
        if (!categorias.includes(producto.categoria)) {
            categorias.push(producto.categoria)
        }
    })
    let categoria
    let salida
    do {
        categoria = prompt("Ingrese alguna de las siguientes categorias: " + categorias.join(", ")).toLowerCase()
        if (categorias.includes(categoria)) {
            let productosFiltrados = productos.filter(producto => producto.categoria === categoria)
            salida = productosFiltrados.map(producto => producto.name).join("\n")
        } else {
            alert("Categoria incorrecta")
        }
    } while (!categorias.includes(categoria));
    alert(salida)
}

function agregarProductoAlCarrito(productos, carrito) {
    let opcion

    do {
        opcion = Number(prompt("Escanee un producto o agreguelo de forma manual:\n" + listar(productos, "id", "name")))

        let productoBuscado = productos.find(producto => producto.id === opcion)
        let posicionProductoEnCarrito = carrito.findIndex(producto => producto.id === opcion)

        if (productoBuscado) {
            if (posicionProductoEnCarrito !== -1) {
                carrito[posicionProductoEnCarrito].unidades++
                carrito[posicionProductoEnCarrito].subtotal = carrito[posicionProductoEnCarrito].precioUnitario * carrito[posicionProductoEnCarrito].unidades
            } else {
                carrito.push({
                    id: productoBuscado.id,
                    nombre: productoBuscado.name,
                    precioUnitario: productoBuscado.precioVent,
                    unidades: 1,
                    subtotal: productoBuscado.precioVent
                })
            }
        } else if (opcion !== 0) {
            alert("ID incorrecto")
        }
    } while (opcion !== 0)
    console.log(carrito)
}