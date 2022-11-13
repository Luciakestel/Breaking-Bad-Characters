'use strict';

const charactersList = document.querySelector('.js_character_list');
const favouriteList = document.querySelector('.js_favourite_list');
const btn = document.querySelector('.js_btn');
const input = document.querySelector('.js_input');
const btncloseFav = document.querySelector('.js_close');
const btnFav = document.querySelector('.js_fav_btn');


let characters = [];
let favCharacters = [];

fetch('https://breakingbadapi.com/api/characters')
.then(response => response.json())
.then(dataResults =>{
    characters = dataResults;
    renderCharacters();
});


function renderCharacters(){
    let html = '';
    for (const character of characters) {
        html += `<li >
        <article class="js_list_element article" id='${character.char_id}'>
          <h3 class="article_title">${character.name}</h3>
          <img src="${character.img}" alt="Foto del personaje" class="article_img">
          <p class="article_status">${character.status}</p>
        </article>
      </li>`;
    }
    charactersList.innerHTML = html;
    
    const listElement = document.querySelectorAll('.js_list_element');

    for (const character of listElement) {
      character.addEventListener(('click'), handleClickCharacter);
    }
}

function handleClickCharacter(event){
    event.currentTarget.classList.toggle('selected');

    const selectedCharacter = characters.find((eachCharacterObj) => eachCharacterObj.char_id === parseInt(event.currentTarget.id));
    
    const characterFav = favCharacters.findIndex((eachCharacterObj) => eachCharacterObj.char_id === parseInt(event.currentTarget.id));
    if(characterFav === -1){
      favCharacters.push(selectedCharacter);
    } else {
      favCharacters.splice(characterFav, 1);
    }
    
    renderFavCharacters();
}
function searchCharacters(event){
event.preventDefault();
const searchValue = input.value;
fetch(`https://breakingbadapi.com/api/characters?name=${searchValue}`)
.then(response => response.json())
.then(dataResults =>{
    characters = dataResults;
    renderCharacters();
});
const searchFavCharacters = favCharacters.find((eachCharacterObj) => eachCharacterObj.name === parseInt(searchValue));
if (searchFavCharacters === true){
  characters.classList.add('selected');
}
}
function renderFavCharacters(){
    let html = '';
    for (const favCharacter of favCharacters) {
        html += `<li>
        <article class="js_list_element article selected" id='${favCharacter.char_id}'>
          <div class="article_box">  
            <h3 clas="article_title">${favCharacter.name}</h3>
            <div class="article_close js_close"></div>
          </div>
          <img src="${favCharacter.img}" alt="Foto del personaje" class="article_img"> 
          <p class="article_status">${favCharacter.status}</p>
        </article>
      </li>`;
    }
    favouriteList.innerHTML = html;
    localStorage.setItem('Favourite list', JSON.stringify(favCharacters));
    

    // btncloseFav.addEventListener(('click'), closeFav);
    // closeFav();
}

// function closeFav(event){
//   event.preventDefault();

// }
function resetFavs(event){
  event.preventDefault();
  console.log('holis');
  let html = '';
  favouriteList.innerHTML = html;
  localStorage.removeItem('Favourite list');
  // for (let i = 0; i < characters.length; i++) {
  //   if (characters[i].classList.contains('selected')){
  //     characters[i].classList.remove('selected')
  //   }
  // }
  
  
}

btn.addEventListener(('click'), searchCharacters);
btnFav.addEventListener(('click'), resetFavs);



//# sourceMappingURL=main.js.map
