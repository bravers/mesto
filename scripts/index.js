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

initialCards
    .map(createCard)
    .forEach((card) => {
        list.append(card);
    });

function createCard(item) {
    const cardData = template.cloneNode(true);
    const cardImage = cardData.querySelector('.list__image');
    cardData.querySelector('.list__text').textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = item.name;
    return cardData;
}

function openPopup() {
    profilePopup.classList.add('popup_opened');
    nameInputForm.value = profileName.textContent;
    jobInputForm.value = profileJob.textContent;
}

function closePopup() {
    profilePopup.classList.remove('popup_opened');
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
