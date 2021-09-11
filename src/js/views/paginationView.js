import View from "./View.js";
import icons from "url:../../img/icons.svg"; // in parcel 2

const PaginationView = class extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (eve) {
      const goToPage = +eve.target.closest(".btn--inline")?.dataset.goto;
      if (!goToPage) return;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._getMarkupNextPage();
    }

    // on the last page
    if (curPage === numPages && numPages > 1) {
      return this._getMarkupPrevPage();
    }
    // on other pages
    if (curPage > 1) {
      return `${this._getMarkupNextPage()}${this._getMarkupPrevPage()}`;
    }

    // page 1 and NO other pages
    return ``;
  }

  _getMarkupPrevPage() {
    const curPage = this._data.page;
    return `
    <button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
    </button>
      `;
  }

  _getMarkupNextPage() {
    const curPage = this._data.page;
    return `
    <button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>
      `;
  }
};

export default new PaginationView();
