// variables
const listaTweets = document.getElementById('lista-tweets');



// event listener

eventListeners();

function eventListeners() {
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);


    listaTweets.addEventListener('click', borrarTweet);

    //contenido cargado

    document.addEventListener('DOMContentLoaded', localStorageListo);
}

// funciones


function agregarTweet(e) {
    e.preventDefault();
    const tweet = document.getElementById('tweet').value;

    //crear boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    //crear elemento y añadirle el contenido a las lista
    const li = document.createElement('li');
    li.innerText = tweet;

    //añade el boton borrar

    li.appendChild(botonBorrar);

    //añade el tweetla lista
    listaTweets.appendChild(li);

    //añadir a locale storage
    agregarTweetLocalStorage(tweet);

}


function borrarTweet(e) {
    e.preventDefault();

    if (e.target.className === 'borrar-tweet') {
        e.target.parentElement.remove();
        borraTweetLocalStorage(e.target.parentElement.innerText);
        //console.log(e.target.parentElement.innerText);
    }
}

//mostrar datos del local Storage en la lista
function localStorageListo(){
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(function(tweet){
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';

        //crear elemento y añadirle el contenido a las lista
        const li = document.createElement('li');
        li.innerText = tweet;

        //añade el boton borrar

        li.appendChild(botonBorrar);

        //añade el tweetla lista
        listaTweets.appendChild(li);
        });
}

function agregarTweetLocalStorage(tweet) {
    let tweets;

    tweets = obtenerTweetsLocalStorage();

    //añadir el nuevo tweet
    tweets.push(tweet);
    //convertir de strig a arreglo 
    localStorage.setItem('tweets', JSON.stringify(tweets));
  
}
// Comprobar que hayan elementos en local storage, retorna un arreglo
function obtenerTweetsLocalStorage() {
    let tweets;
    //Revisamos los valores de local Storage
    if(localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }

    return tweets;
}

//Eliminar tweet de local storage

function borraTweetLocalStorage(tweet){
    let tweets, tweetBorar;
    //Elimina la X del tweet
    tweetBorrar = tweet.substring(0, tweet.length - 1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index){
        if(tweetBorrar === tweet){
            tweets.splice(index, 1)
        }

    });

    localStorage.setItem('tweets', JSON.stringify(tweets));
}
