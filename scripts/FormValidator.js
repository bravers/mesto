export default class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._form = form;
        this._submitButtonElement = form.querySelector(config.submitButtonSelector);
        this._inputElements = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    }


    enableValidation() {
        this._inputElements.forEach((input, index, inputs) => {
            this._formItems = inputs;
            this._setEventListener(input);
        });
    }

    _setEventListener(input){
        input.addEventListener('input', (evt) => {
            this._showIsValid(input);
            this._toggleButtonState();
        });
    }
    // метод показывает ошибку
    _showInputError(input) {
        const errorElement = this._form.querySelector(`.${input.name}` + this._config.errorSpanSuffix)
        input.classList.add(this._config.inputErrorClass);
        errorElement.textContent = input.validationMessage;
        errorElement.classList.add(this._config.errorClass);
    }

    // метод скрывает ошибку
    _hideInputError(input) {
        const errorElement = this._form.querySelector(`.${input.name}` + this._config.errorSpanSuffix)
        input.classList.remove(this._config.inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._config.errorClass);
    }

    //метод проверяет валидность поля и показывает/скрывает ошибку
    _showIsValid(input) {
        if (!input.validity.valid) {
            this._showInputError(input);
        }
        else {
            this._hideInputError(input);
        }
    }

    //метод проверяет наличие невалидного поля
    _hasInvalidInput() {
        return this._formItems.some((input) => {
            return !input.validity.valid;
        });
    };

    //метод отключает/включает кнопку отправки формы
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.blockSubBtn();
        } else {
            this._submitButtonElement.classList.remove(this._config.inactiveButtonClass);
            this._submitButtonElement.removeAttribute('disabled');
        }
    }

    //метод блокировки кнопки
    blockSubBtn() {
        this._submitButtonElement.classList.add(this._config.inactiveButtonClass);
        this._submitButtonElement.setAttribute('disabled', 'disabled');
    }

    cleanErrors() {
        this._inputElements.forEach((input) =>{
                this._hideInputError(input);
            }
        )};
}