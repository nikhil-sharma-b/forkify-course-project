import View from "./View.js";
import icons from "url:../../img/icons.svg"; // in parcel 2

const AddRecipeView = class extends View {
  _parentElement = document.querySelector(".upload");
  _message = "The recipe was successfully uploaded! :)";

  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  closeModal() {
    this._window.classList.add("hidden");
    this._overlay.classList.add("hidden");
  }

  _toggleWindow() {
    this._window.classList.toggle("hidden");
    this._overlay.classList.toggle("hidden");
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this._toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener("click", this._toggleWindow.bind(this));
    this._overlay.addEventListener("click", this._toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (eve) {
      eve.preventDefault();

      // Get the form data (the data in the input fields of the form - the 'Upload' form)
      const dataArr = new FormData(this);

      // Convert the array values to Object entries
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup() {}
};

export default new AddRecipeView();
