import View from "./View.js";
import previewView from "./previewView.js";

const ResultsView = class extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No recipes found with that name! Please try another one ;)";
  _message = "";

  _generateMarkup() {
    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join("");
  }
};

export default new ResultsView();
