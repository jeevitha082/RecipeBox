package com.recipebox.meal.planner.repository;

import com.recipebox.meal.planner.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}