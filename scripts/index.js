import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const cardTemplateSelector = document.querySelector('#list-template');
const list = document.querySelector('.list')
const profilePopupContainer = document.querySelector('.popup_edit-profile');
const profileContainer = document.querySelector('.profile');
const profileButton = profileContainer.querySelector('.profile__button');
const profileForm = document.forms["profile-form"];
const nameInputForm = document.querySelector('.popup__form-name');
const jobInputForm = document.querySelector('.popup__form-desc');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__text');

const placePopupContainer = document.querySelector('.popup_place');
const btnOpenPlace = document.querySelector('.profile__add');
const placeInput = document.querySelector('.popup__form-input-placename');
const urlInput = document.querySelector('.popup__form-input-url');
const cardForm = document.forms["card-form"];

const picturePopupContainer = document.querySelector('.popup_picture');
const cardPicture = document.querySelector('.popup__image');
const titlePicture = document.querySelector('.popup__picture-text');

profileButton.addEventListener('click', openProfilePopup);
profileForm.addEventListener('submit', submitEditProfileForm);
btnOpenPlace.addEventListener('click', openPlacePopup);

const profileFormValidator = new FormValidator(formsConfig, profilePopupContainer);
const placeFormValidator = new FormValidator(formsConfig, placePopupContainer);
profileFormValidator.enableValidation();
placeFormValidator.enableValidation();


initialCards.forEach((item) => {
        const cardElement = createCard(item);
        list.append(cardElement);
    });

function createCard(item) {
    const card = new Card(item.name, item.link, cardTemplateSelector, openPicturePopup);
    return card.createCard();
}

const popupsAll = Array.from(document.querySelectorAll('.popup'));
popupsAll.forEach((form) => {
    form.addEventListener('mousedown', closeOverlay)
});


//добавление пользователем карточки на страницу
cardForm.addEventListener('submit', addCard);

//функция добавления пользователем карточки на страницу
function addCard(evt) {
    evt.preventDefault();
    const item = {
        name: placeInput.value,
        link: urlInput.value
    };
    const cardElement = createCard(item);
    list.prepend(cardElement);
    cardForm.reset();
    closePopup(placePopupContainer);
}

//функция работы с поп-апом картинкой
function openPicturePopup(itemname, itemlink) {
    cardPicture.src = itemlink;
    titlePicture.textContent = itemname;
    cardPicture.alt = itemname;
    openPopup(picturePopupContainer);
}

//функция работы с профилем
function openProfilePopup() {
    profileFormValidator.cleanErrors();
    nameInputForm.value = profileName.textContent;
    jobInputForm.value = profileJob.textContent;
    openPopup(profilePopupContainer);

}

//функция работы с добавлением места
function openPlacePopup() {
    placeInput.value = "";
    urlInput.value = "";
    placeFormValidator.cleanErrors();
    placeFormValidator.blockSubBtn();
    openPopup(placePopupContainer);

}

//общая функция открытия поп-апа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeEscPopup);
}

//общая функция закрытия поп-апа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeEscPopup);
}

//функция отправки введенных пользователем значений для профиля
function submitEditProfileForm(evt) {
    evt.preventDefault();
    profileName.textContent = nameInputForm.value;
    profileJob.textContent = jobInputForm.value;
    closePopup(profilePopupContainer);
}

//функция закрытия поп-апа esc
function closeEscPopup(evt) {
    if (evt.key === 'Escape') {
        const modalOpen = document.querySelector('.popup_opened');
        closePopup(modalOpen);
    }
}

//функция закрытия поп-апа overlay
function closeOverlay(evt) {
    const popup = evt.currentTarget;
    if (evt.target === evt.currentTarget) {
        closePopup(popup);
    }
    if (evt.target === popup.querySelector('.popup__button-exit')) {
        closePopup(popup);
    }
}