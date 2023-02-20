let profilePopup = document.querySelector('.popup');
let profileContainer = document.querySelector('.profile');
let profileButton = profileContainer.querySelector('.profile__button');
let closeProfileButton = profilePopup.querySelector('.popup__button-exit');
let formProfile = document.querySelector('.popup__form');
let nameInputForm = document.querySelector('.popup__form-input_type_firstname');
let jobInputForm = document.querySelector('.popup__form-input_type_proffesion');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__text');

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
