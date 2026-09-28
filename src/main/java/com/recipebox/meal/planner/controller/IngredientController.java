package com.recipebox.meal.planner.controller;

import com.recipebox.meal.planner.entity.Ingredient;
import com.recipebox.meal.planner.service.IngredientService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ingredients")
public class IngredientController {

    private final IngredientService ingredientService;

    public IngredientController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    @PostMapping
    public Ingredient createIngredient(@Valid @RequestBody Ingredient ingredient) {
        return ingredientService.saveIngredient(ingredient);
    }

    @GetMapping
    public List<Ingredient> getAllIngredients() {
        return ingredientService.getAllIngredients();
    }

    @GetMapping("/{id}")
    public Ingredient getIngredientById(@PathVariable Long id) {
        return ingredientService.getIngredientById(id).orElse(null);
    }

    @GetMapping("/recipe/{recipeId}")
    public List<Ingredient> getIngredientsByRecipeId(@PathVariable Long recipeId) {
        return ingredientService.getIngredientsByRecipeId(recipeId);
    }

    @DeleteMapping("/{id}")
    public String deleteIngredient(@PathVariable Long id) {
        ingredientService.deleteIngredient(id);
        return "Ingredient deleted successfully";
    }
}