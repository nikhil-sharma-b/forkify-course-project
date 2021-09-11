const SearcView = class {
  _parentElem = document.querySelector(".search");

  getSearchQuery() {
    const query = this._parentElem.querySelector(".search__field").value;
    this._clear();
    return query;
  }

  addHandlerSearch(handler) {
    this._parentElem.addEventListener("submit", function (eve) {
      eve.preventDefault();
      handler();
    });
  }

  _clear() {
    this._parentElem.querySelector(".search__field").value = "";
  }
};

export default new SearcView();
