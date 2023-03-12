const template = document.querySelector('#list-template').content.querySelector('.list__description');
const list = document.querySelector('.list')

const profilePopup = document.querySelector('.popup');
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
const subBtnPlace = document.querySelector('.popup__button-save_place');

const picturePopupContainer = document.querySelector('.popup_picture');
const cardPicture = document.querySelector('.popup__image');
const titlePicture = document.querySelector('.popup__picture-text');
const closeButtons = document.querySelectorAll('.popup__button-exit');

initialCards.map(createCard).forEach((card) => {
    list.append(card);
});

cardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const item = {
        name: placeInput.value,
        link: urlInput.value
    }

    const card = createCard(item);
    list.prepend(card);
    evt.target.reset();
    closePlacePopup();
});


function createCard(item) {
    const cardData = template.cloneNode(true);
    const cardImage = cardData.querySelector('.list__image');
    const likeButton = cardData.querySelector('.list__button');
    cardData.querySelector('.list__text').textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = item.name;

    cardData.querySelector('.list__trash-button').addEventListener('click', () => {
        cardData.remove();
    });

    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('list__button_active');
    });

    cardImage.addEventListener('click', () => {
        openPicturePopup(item.name, item.link);
    })

    return cardData;
}

function openProfilePopup() {
    nameInputForm.value = profileName.textContent;
    jobInputForm.value = profileJob.textContent;
    openPopup(profilePopup);
}

function closeProfilePopup() {
    closePopup(profilePopup);
}

function openPlacePopup() {
    subBtnPlace.classList.add('popup__button_disabled');
    subBtnPlace.setAttribute('disabled', 'disabled');
    openPopup(placePopupContainer);
}

function closePlacePopup() {
    closePopup(placePopupContainer);

}

function openPicturePopup(itemname, itemlink) {
    cardPicture.src = itemlink;
    titlePicture.textContent = itemname;
    cardPicture.alt = itemname;
    openPopup(picturePopupContainer);
}

function closePicturePopup() {
    closePopup(picturePopupContainer);
}

function handleFormProfileSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInputForm.value;
    profileJob.textContent = jobInputForm.value;
    closePopup(profilePopup);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeEscPopup);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeEscPopup);
}

profileButton.addEventListener('click', openProfilePopup);
profileForm.addEventListener('submit', handleFormProfileSubmit);
btnOpenPlace.addEventListener('click', openPlacePopup);

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

function closeEscPopup(evt) {
    if (evt.key === 'Escape') {
        const modalOpen = document.querySelector('.popup_opened');
        closePopup(modalOpen);
    }
}

const popupsAll = Array.from(document.querySelectorAll('.popup'));
popupsAll.forEach((form) => {
    form.addEventListener('click', closeOverlay)
});


function closeOverlay(evt) {
    const popup = evt.currentTarget;
    if (evt.target === evt.currentTarget) {
        closePopup(popup);
    }
}