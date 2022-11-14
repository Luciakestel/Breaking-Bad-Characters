'use strict';

const charactersList = document.querySelector('.js_character_list');
const favouriteList = document.querySelector('.js_favourite_list');
const btn = document.querySelector('.js_btn');
const input = document.querySelector('.js_input');
const btnFav = document.querySelector('.js_fav_btn');


let characters = [];
let favCharacters = [];

fetch('https://breakingbadapi.com/api/characters')
.then(response => response.json())
.then(dataResults =>{
    characters = dataResults;
    renderCharacters();
    renderFavSaved();
});

function renderFavSaved(){
  const favCharacterSave = JSON.parse(localStorage.getItem('Favourite list'));
  if (favCharacterSave !== null){
    favCharacters = favCharacterSave;
    renderFavCharacters();
  }
}

function renderCharacters(){
    let html = '';
    for (const character of characters) {
      const characterFavIndex = favCharacters.findIndex((eachCharacterObj) => eachCharacterObj.char_id === character.char_id);
      let classFav = '';  
      if (characterFavIndex === -1){
        classFav = '';
        } else {
          classFav = 'selected';
        }
        html += `<li >
        <article class="js_list_element article ${classFav}" id='${character.char_id}'>
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
    console.log('he entrado');
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
}

function renderFavCharacters(){
    let html = '';
    for (const favCharacter of favCharacters) {
        html += `<li>
        <article class="article selected" id='${favCharacter.char_id}'>
          <div class="article_box">  
            <h3 clas="article_title">${favCharacter.name}</h3>
            <div class="article_close js_close" id='${favCharacter.char_id}'></div>
          </div>
          <img src="${favCharacter.img}" alt="Foto del personaje" class="article_img"> 
          <p class="article_status">${favCharacter.status}</p>
        </article>
      </li>`;
    }
    favouriteList.innerHTML = html;
    localStorage.setItem('Favourite list', JSON.stringify(favCharacters));
    
    const btncloseFav = document.querySelectorAll('.js_close');
    for (const buttonFav of btncloseFav) {
      buttonFav.addEventListener(('click'), closeFav);
    }
  }

function closeFav(event){
  event.preventDefault();
  console.log('clickando en icono close');
  const closeFavCharacterIndex = favCharacters.findIndex((eachCloseObj) => eachCloseObj.char_id === parseInt(event.currentTarget.id));
  console.log(parseInt(event.currentTarget.id));
  if (closeFavCharacterIndex !== -1) {
    favCharacters.splice(closeFavCharacterIndex, 1);
  }
  renderCharacters();
  renderFavCharacters();
}

function resetFavs(event){
  event.preventDefault();
  let html = '';
  favouriteList.innerHTML = html;
  favCharacters = [];
  localStorage.removeItem('Favourite list');
  renderCharacters();
}

btn.addEventListener(('click'), searchCharacters);
btnFav.addEventListener(('click'), resetFavs);

