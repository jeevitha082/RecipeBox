package com.recipebox.meal.planner.controller;

import com.recipebox.meal.planner.entity.Ingredient;
import com.recipebox.meal.planner.entity.MealPlan;
import com.recipebox.meal.planner.service.MealPlanService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/meal-plans")
public class MealPlanController {

    private final MealPlanService mealPlanService;

    public MealPlanController(MealPlanService mealPlanService) {
        this.mealPlanService = mealPlanService;
    }

    @PostMapping
    public MealPlan createMealPlan(@Valid @RequestBody MealPlan mealPlan) {
        return mealPlanService.saveMealPlan(mealPlan);
    }

    @GetMapping
    public List<MealPlan> getAllMealPlans() {
        return mealPlanService.getAllMealPlans();
    }

    @GetMapping("/{id}")
    public MealPlan getMealPlanById(@PathVariable Long id) {
        return mealPlanService.getMealPlanById(id).orElse(null);
    }

    @GetMapping("/shopping-list")
    public List<Ingredient> getShoppingList() {
        return mealPlanService.generateShoppingList();
    }

    @DeleteMapping("/{id}")
    public String deleteMealPlan(@PathVariable Long id) {
        mealPlanService.deleteMealPlan(id);
        return "Meal plan deleted successfully";
    }
}