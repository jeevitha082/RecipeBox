package com.recipebox.meal.planner.repository;

import com.recipebox.meal.planner.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
}