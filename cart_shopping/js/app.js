// Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

// Listeners
cargarEventListeners();

function cargarEventListeners(){
    // diapara cuando se da clic en "Agregar Carrito"
    cursos.addEventListener('click', cargarCurso);

    // Dispara cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar todo el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    // Cargar elementos del carrito
    document.addEventListener('DOMContentLoaded', cargarCursosCarrito);

}




// Funciones

// Funcion que añade el curso carrito
function cargarCurso(e){
    e.preventDefault();
    // delegation para agregar carrito
    if(e.target.classList.contains("agregar-carrito")){
        const curso = e.target.parentElement.parentElement;
        leerDatosCurso(curso);
    }
}

// Funcion que lee los datos del curso
function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titutlo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoCurso);
}

// muestra la informacion del curso seleccionado en el carrito
function insertarCarrito(infoCurso){
    let cursosStorage;
    let idCursos;
    // obtener los cursos del local storage
    cursosStorage = obtenerCursosLocalStorage();
    // Traer los id de los cursos que ya estan en local storage
    idCursos = cursosStorage.map((c) => c.id);
   
    // si no esta guardado, mandarlo pintar e insertarlo en local storage
    if(!idCursos.includes(infoCurso.id))
    {
        crearRowCursos(infoCurso);
        guardarCursoLocalStorage(infoCurso);
    }

}



// crear fila agregando el curso
function crearRowCursos(infoCurso){
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><img src="${infoCurso.imagen}"></td>
        <td>${infoCurso.titulo}</td>
        <td>${infoCurso.precio}</td>
        <td><a href="#" class="borrar-curso" data-id="${infoCurso.id}">X</href></td>
    `
    ;
    listaCursos.appendChild(row);
}

// elimina un curso seleccionado
function eliminarCurso(e){
    e.preventDefault();
    let cursoId;
    if(e.target.classList.contains("borrar-curso")){
        cursoId = e.target.getAttribute("data-id");
        e.target.parentElement.parentElement.remove();
    }
    eliminarCursoStorage(cursoId);
}

// vaciar todo el carrito

function vaciarCarrito(e){
    e.preventDefault();
    // fomra rapida y recomendada iterar sobre los hijos de tbody
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }
    localStorage.setItem('cart', JSON.stringify([]));
    // prevenir saltos en la pagina, hacer un return false
    return false;
}

// guarda en local storage
function guardarCursoLocalStorage(infoCurso){
    let cart;

    cart = obtenerCursosLocalStorage();
    cart.push(infoCurso);
    // Guardar en localstorage pero en string
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Valida si hay elementos en local storage y retorna arreglo
function obtenerCursosLocalStorage(){
    let cart;
    // Revisar los valores de local storage
    if(localStorage.getItem('cart') === null){
        // crear array vacio
        cart = [];
    } else {
        // obtener el array que esta como string en la variable de Local Storage
        cart = JSON.parse(localStorage.getItem('cart'));
    }
    return cart;
}

// cargar cursos del local storage y llenar el carrito

function cargarCursosCarrito(){
    let cursosStorage;
    cursosStorage = obtenerCursosLocalStorage();
    cursosStorage.forEach(function(curso) {
        // Crear row
        crearRowCursos(curso);

    })
}

// eliminar cursos de local storage
function eliminarCursoStorage(cursoId){
        let cursosStorage;
        cursosStorage = obtenerCursosLocalStorage();
        cursosStorage.forEach(function(curso, index){
            if(cursoId === curso.id){
                cursosStorage.splice(index, 1);
            }
        });
        // Guardar en localstorage pero en string
    localStorage.setItem('cart', JSON.stringify(cursosStorage));
}