package com.recipebox.meal.planner.repository;

import com.recipebox.meal.planner.entity.MealPlan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealPlanRepository extends JpaRepository<MealPlan, Long> {
}