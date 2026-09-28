package com.recipebox.meal.planner.repository;

import com.recipebox.meal.planner.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {

    List<Ingredient> findByRecipeId(Long recipeId);
}