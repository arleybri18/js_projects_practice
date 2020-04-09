// Variables
const listaTweets = document.getElementById('lista-tweets');



// Event Listeners

eventListeners();

function eventListeners() {
    // cuando se envie el formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    // borrar tweets, con event delegation
    listaTweets.addEventListener('click', borrarTweet);

    // Contenido Cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
}

// Functions

/* Add tweet to form*/ 

function agregarTweet(e){
    // Prevenir comportamiento default
    e.preventDefault();
    // leer valor del textarea
    const textarea = document.getElementById('tweet');
    const tweet = textarea.value;

    //crear elemeto li
    crearLista(tweet);

    // Añadir a local storage
    agregarTweetLocalStorage(tweet);
    // Limipar el text area
    textarea.value = '';

}

function borrarTweet(e){
    e.preventDefault();
    //identificar que el clic sea donde queremos, la X
    if(e.target.parentElement.className === 'borrar-tweet'){
        // Obtener el padre que es el li y eliminarlo
        e.target.parentElement.parentElement.remove();

        // Obtener el texto del tweet a borrar
        borrarTweetLocalStorage(e.target.parentElement.parentElement.innerText);
    }
}

// adiciona al local storage
function agregarTweetLocalStorage(tweet){
    let tweets;

    // agregar a local storage, solo se pueden guardar strings, por tanto toca guardarlo como un string array
    // Obtener los tweets
    tweets = obtenerTweetsLocalStorage();

    // añadir el nuevo tweet
    tweets.push(tweet);
    // Guardar en localstorage pero en string
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Valida si hay elementos en local storage y retorna arreglo
function obtenerTweetsLocalStorage(){
    let tweets;
    // Revisar los valores de local storage
    if(localStorage.getItem('tweets') === null){
        // crear array vacio
        tweets = [];
    } else {
        // obtener el array que esta como string en la variable de Local Storage
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

// mostrar  los datos de localstorage al cargar el DOM
function localStorageListo(){
    let tweets;
    // obtener los tweets de local storage
    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet) {
        // Crear lista
        const li = crearLista(tweet);

    });
}

function crearLista(tweet){
        // crear boton eliminar
        const botonBorrar = document.createElement('a');
        const spanBorrar = document.createElement('span');
        spanBorrar.classList = 'badge badge-pill badge-secondary';
        spanBorrar.innerText = 'X';
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.appendChild(spanBorrar);
        
        //crear elemento HTML
        const li = document.createElement('li');
        li.innerText = tweet;
        // Anadir el boton borrar a la lista
        li.classList = 'list-group-item';
        li.appendChild(botonBorrar);
    
        // Agregar al DOM
        listaTweets.appendChild(li);
}

// buscar el tweet y borrarlo
function borrarTweetLocalStorage(tweet){
    let tweets, tweetBorrar;
    console.log(tweet);
    // Elimina la X del texto del tweet
    tweetBorrar = tweet.substring(0, tweet.length - 1);

    // traer el array de tweets
    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index){
        // comparar texto y borrar
        if(tweetBorrar === tweet){
            tweets.splice(index, 1);
        }
    });

    // actualizar el array de localStorage
    localStorage.setItem('tweets', JSON.stringify(tweets));
}
