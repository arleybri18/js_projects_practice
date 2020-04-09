// Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');


// Listeners
cargarEventListeners();

function cargarEventListeners(){
    // diapara cuando se da clic en "Agregar Carrito"
    cursos.addEventListener('click', cargarCurso);

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