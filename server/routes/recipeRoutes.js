const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");
const { ensureAuthenticated } = require("../middlewares/auth");

/**
 * App Routes
 */
router.get("/", recipeController.homepage);
router.get("/recipe/:id", recipeController.exploreRecipe);
router.get("/categories", recipeController.exploreCategories);
router.get("/categories/:id", recipeController.exploreCategoriesById);
router.post("/search", recipeController.searchRecipe);
router.get("/explore-latest", recipeController.exploreLatest);
router.get("/explore-random", recipeController.exploreRandom);

// GET: Submit Recipe
router.get("/submit-recipe", ensureAuthenticated, (req, res) => {
  res.render("submit-recipe", {
    title: "Submit Recipe",
    infoSubmitObj: req.flash("infoSubmitObj"),
    infoErrorsObj: req.flash("infoErrorsObj"),
  });
});

// POST: Submit Recipe
router.post("/submit-recipe", ensureAuthenticated, (req, res) => {
  // Tarif gönderme işlemleri burada yapılacak
  try {
    // Tarif kaydetme işlemi (recipeController.submitRecipeOnPost işlevini burada kullanabilirsiniz)
    recipeController.submitRecipeOnPost(req, res);

    // Başarılı olursa
    req.flash("infoSubmitObj", "Recipe submitted successfully!");
    res.redirect("/submit-recipe");
  } catch (error) {
    // Hata olursa
    req.flash("infoErrorsObj", [{ message: "Error submitting recipe." }]);
    res.redirect("/submit-recipe");
  }
});

module.exports = router;
