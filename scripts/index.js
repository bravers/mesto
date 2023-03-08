const template = document.querySelector('#list-template').content.querySelector('.list__description');
const list = document.querySelector('.list')

let profilePopup = document.querySelector('.popup');
let profileContainer = document.querySelector('.profile');
let profileButton = profileContainer.querySelector('.profile__button');
let closeProfileButton = profilePopup.querySelector('.popup__button-exit');
let formProfile = document.querySelector('.popup__form');
let nameInputForm = document.querySelector('.popup__form-name');
let jobInputForm = document.querySelector('.popup__form-desc');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__text');

let placePopupContainer = document.querySelector('.popup_place');
let btnOpenPlace = document.querySelector('.profile__add');
let btnClosePlace = document.querySelector('.popup__button-exit_place');
let placeInput = document.querySelector('.popup__form-input-placename');
let urlInput = document.querySelector('.popup__form-input-url');
let formPlace = document.querySelector('.popup__form_place');
let subBtnPlace = document.querySelector('.popup__button-save_place');

let picturePopupContainer = document.querySelector('.popup_picture');
const cardPicture = document.querySelector('.popup__image');
const titlePicture = document.querySelector('.popup__picture-text');
const btnClosePicture = document.querySelector('.popup__button-exit_picture');
console.log(picturePopupContainer);
initialCards.map(createCard).forEach((card) => {
        list.append(card);
    });

    formPlace.addEventListener('submit', (evt) => {
        evt.preventDefault();
    
        const item = {
            name: placeInput.value,
            link: urlInput.value
        }
    
        const card = createCard(item);
        list.prepend(card);
        placeInput.value = '';
        urlInput.value = '';
        closePlacePopup();
    });


function createCard(item) {
    const cardData = template.cloneNode(true);
    const cardImage = cardData.querySelector('.list__image');
    cardData.querySelector('.list__text').textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = item.name;

    cardData.querySelector('.list__trash-button').addEventListener('click', () => {
        cardData.remove();
    });

    cardData.querySelector('.list__button').addEventListener('click', () => {
        cardData.querySelector('.list__button').classList.toggle('list__button_active');
    });

    cardImage.addEventListener('click', () => {
        openPicturePopup(item.name, item.link);
    })

    return cardData;
}

function popHide() {

}

function openPopup() {
    profilePopup.classList.add('popup_opened');
    nameInputForm.value = profileName.textContent;
    jobInputForm.value = profileJob.textContent;
}

function closePopup() {
    profilePopup.classList.remove('popup_opened');
}

function openPlacePopup() {
    placePopupContainer.classList.add('popup_opened');
}

function closePlacePopup() {
    placePopupContainer.classList.remove('popup_opened');
}

function openPicturePopup(itemname, itemlink) { 
    cardPicture.src = itemlink;
    titlePicture.textContent = itemname;
    cardPicture.alt = itemname;
    picturePopupContainer.classList.add('popup_opened');
}

function closePicturePopup() {
    picturePopupContainer.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInputForm.value;
    profileJob.textContent = jobInputForm.value;
    closePopup();
}
profileButton.addEventListener('click', openPopup);
closeProfileButton.addEventListener('click', closePopup);
formProfile.addEventListener('submit', handleFormSubmit);

btnOpenPlace.addEventListener('click', openPlacePopup);
btnClosePlace.addEventListener('click', closePlacePopup);

btnClosePicture.addEventListener('click', closePicturePopup);