const formsConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    errorSpanSuffix: '-input-error'
};

const enableValidation = (config) => {
    const formElements = Array.from(document.querySelectorAll(config.formSelector));

    formElements.forEach((form) => {
        const inputElements = Array.from(form.querySelectorAll(config.inputSelector));
        inputElements.forEach((input, index, inputs) => {
            input.addEventListener('input', (evt) => {
                showIsValid(config, form, input);
                toggleButtonState(form, config, inputs);
            });
        });
    });
}

enableValidation(formsConfig);

const showInputError = (config, form, input) => {
    const errorElement = form.querySelector(`.${input.name}` + config.errorSpanSuffix)
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(config.errorClass);
}


const hideInputError = (config, form, input) => {
    const errorElement = form.querySelector(`.${input.name}` + config.errorSpanSuffix)
    input.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(config.errorClass);
}

const showIsValid = (config, form, input) => {
    if (!input.validity.valid) {
        showInputError(config, form, input);
    }
    else {
        hideInputError(config, form, input);
    }
}

const hasInvalidInput = (inputs) => {
    return inputs.some((input) => {
        return !input.validity.valid;
    });
};

const toggleButtonState = (form, config, inputs) => {
    const submitButtonElement = form.querySelector(config.submitButtonSelector);
    if (hasInvalidInput(inputs)) {
        submitButtonElement.classList.add(config.inactiveButtonClass);
        submitButtonElement.setAttribute('disabled', 'disabled');
    } else {
        submitButtonElement.classList.remove(config.inactiveButtonClass);
        submitButtonElement.removeAttribute('disabled');
    }
}