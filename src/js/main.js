'use strict';

const charactersList = document.querySelector('.js_character_list');
const favouriteList = document.querySelector('.js_favourite_list');
const btn = document.querySelector('.js_btn');
const input = document.querySelector('.js_input');



let characters = [];
let favCharacters = [];

fetch('https://breakingbadapi.com/api/characters')
.then(response => response.json())
.then(dataResults =>{
    characters = dataResults;
    console.log(characters);
    renderCharacters();
});


function renderCharacters(){
    let html = '';
    for (const character of characters) {
        html += `<li class="main__section_character--list-element">
        <article class="js_list_element" id='${character.char_id}'>
          <h3>${character.name}</h3>
          <img src="${character.img}" alt="Foto del personaje" class="list-img">
          <p>${character.status}</p>
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
    
    favCharacters.push(selectedCharacter);
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
})
}
function renderFavCharacters(){
    let html = '';
    for (const favCharacter of favCharacters) {
        html += `<li class="main__section_character--list-element">
        <article class="js_list_element" id='${favCharacter.char_id}'>
          <h3>${favCharacter.name}</h3>
          <img src="${favCharacter.img}" alt="Foto del personaje" class="list-img">
          <p>${favCharacter.status}</p>
        </article>
      </li>`;
    }
    favouriteList.innerHTML = html;
}

btn.addEventListener(('click'), searchCharacters);
