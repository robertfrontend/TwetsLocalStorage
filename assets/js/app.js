// -- Variables --
const listaTweets = document.getElementById('lista-tweets')

// ---Even Listeners---

eventListeners();

function eventListeners() {

    // cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit',
     agregarTweet);

    // borrar Tweets
    listaTweets.addEventListener('click', borrarTweet);

    // contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo)

}

// --- Funciones ---

//funcion agregar tweet
function agregarTweet(e) {

    e.preventDefault();
    // leer el valor del textarea
    const tweet = document.getElementById('tweet').value;

    // crear boton de eleminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    // crear elemento y añadirle el contenido a la lista
    const li = document.createElement('li');
    li.innerHTML = tweet;

    //añade el boton de borrar al tweet
    li.appendChild(botonBorrar)

    // mandar el li con el contenido a la lista
    listaTweets.appendChild(li)

    // añadir a local storage
    agregarTweetLocalStorage(tweet)

}

// Eliminar Tweet del DOM
function borrarTweet(e) {

    e.preventDefault();

    if(e.target.className === 'borrar-tweet'){
        // removiendo tweet
        e.target.parentElement.remove(); 

        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }
}

// mostrar datos del localstorage
function localStorageListo() {
    let tweets;

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet) {
        // crear boton de eleminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';

        // crear elemento y añadirle el contenido a la lista
        const li = document.createElement('li');
        li.innerHTML = tweet;

        //añade el boton de borrar al tweet
        li.appendChild(botonBorrar)

        // mandar el li con el contenido a la lista
        listaTweets.appendChild(li)
    })
}

// Agrega Tweet a local storage
function agregarTweetLocalStorage(tweet) {

    let tweets;
    tweets = obtenerTweetsLocalStorage();

    // añadir el nuevo tweet
    tweets.push(tweet);

    // convertir de string a arreglo para el local storage
    localStorage.setItem('tweets', JSON.stringify(tweets) );

    // agregar a local storage
    //localStorage.setItem('tweets', tweet)
}

// comprobar que haya elementos en el localstorage
function obtenerTweetsLocalStorage() {

    let tweets;

    // revisamos los valores del local storage
    if(localStorage.getItem('tweets') === null){
        tweets = [];
    }else{
        tweets = JSON.parse(localStorage.getItem('tweets') );
    }

    return tweets;
}

// Eliminar Twett del local storage
function borrarTweetLocalStorage(tweet) {

    let tweets, tweetBorrar;
    // para borrar a la x del tweet
    tweetBorrar = tweet.substring(0, tweet.length - 1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index) {
        if(tweetBorrar === tweet) {
            tweets.splice(index, 1);
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets));

}