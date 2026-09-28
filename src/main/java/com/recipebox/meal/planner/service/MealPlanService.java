package com.recipebox.meal.planner.service;

import com.recipebox.meal.planner.entity.Ingredient;
import com.recipebox.meal.planner.entity.MealPlan;
import com.recipebox.meal.planner.repository.MealPlanRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MealPlanService {

    private final MealPlanRepository mealPlanRepository;
    private final IngredientService ingredientService;

    public MealPlanService(MealPlanRepository mealPlanRepository,
                           IngredientService ingredientService) {
        this.mealPlanRepository = mealPlanRepository;
        this.ingredientService = ingredientService;
    }

    public MealPlan saveMealPlan(MealPlan mealPlan) {
        return mealPlanRepository.save(mealPlan);
    }

    public List<MealPlan> getAllMealPlans() {
        return mealPlanRepository.findAll();
    }

    public Optional<MealPlan> getMealPlanById(Long id) {
        return mealPlanRepository.findById(id);
    }

    public void deleteMealPlan(Long id) {
        mealPlanRepository.deleteById(id);
    }

    public List<Ingredient> generateShoppingList() {

        List<MealPlan> mealPlans = mealPlanRepository.findAll();

        List<Ingredient> shoppingList = new ArrayList<>();

        for (MealPlan mealPlan : mealPlans) {

            Long recipeId = mealPlan.getRecipeId();

            List<Ingredient> ingredients =
                    ingredientService.getIngredientsByRecipeId(recipeId);

            shoppingList.addAll(ingredients);
        }

        return shoppingList;
    }
}