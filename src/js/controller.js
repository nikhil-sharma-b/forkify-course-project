import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

// Polyfilling libraries
import "core-js/stable";
import "regenerator-runtime";
import { async } from "regenerator-runtime";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";
import { MODAL_CLOSE_TIMEOUT_SEC } from "./config.js";

const controlRecipes = async function () {
  try {
    // Get recipe id
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Render spinner
    recipeView.renderSpinner();

    // Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // Update the bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // Load recipe (pass the id)
    await model.loadRecipe(id);

    // Rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearch = async function () {
  try {
    // Render Spinner
    resultsView.renderSpinner();

    // Get search query
    const query = searchView.getSearchQuery();
    if (!query) return;

    // Load search results
    await model.loadSearchResults(query);

    // Render the search results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // Render inital pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPaginationButtons = function (goToPage) {
  // Render NEW page results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update recipe servings
  model.updateServings(newServings);

  // Update the view (Re-render the view)
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  // Update the recipe view
  recipeView.update(model.state.recipe);

  // Render the bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlUploadRecipe = async function (newRecipe) {
  try {
    // Render spinner during the upload
    addRecipeView.renderSpinner();

    // Upload the new Recipe to the API
    await model.uploadRecipe(newRecipe);

    // Render the new Recipe
    recipeView.render(model.state.recipe);

    // Render the bookmark
    bookmarksView.render(model.state.bookmarks);

    // Render a success message after the upload
    addRecipeView.renderMessage();

    // Change ID in the URL (without reloading the)
    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    // Close the modal window after some time
    setTimeout(function () {
      addRecipeView.closeModal();
    }, MODAL_CLOSE_TIMEOUT_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearch);
  paginationView.addHandlerClick(controlPaginationButtons);
  addRecipeView.addHandlerUpload(controlUploadRecipe);
};
init();
