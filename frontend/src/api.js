import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Users
export const getUsers = () => {
  return API.get("/users");
};

// Recipes
export const getRecipes = () => {
  return API.get("/recipes");
};

// Ingredients
export const getIngredients = () => {
  return API.get("/ingredients");
};

// Meal Plans
export const getMealPlans = () => {
  return API.get("/meal-plans");
};

// Shopping List
export const getShoppingList = () => {
  return API.get("/meal-plans/shopping-list");
};

export default API;