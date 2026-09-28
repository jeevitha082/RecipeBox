import { useEffect, useState } from "react";
import "./App.css";

import {
  getUsers,
  getRecipes,
  getIngredients,
  getMealPlans,
  getShoppingList,
} from "./api";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  // Backend data
  const [users, setUsers] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [mealPlans, setMealPlans] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const menuItems = [
    "Dashboard",
    "Users",
    "Recipes",
    "Ingredients",
    "Meal Plans",
    "Shopping List",
  ];

  // Load data from Spring Boot backend
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          usersResponse,
          recipesResponse,
          ingredientsResponse,
          mealPlansResponse,
          shoppingResponse,
        ] = await Promise.all([
          getUsers(),
          getRecipes(),
          getIngredients(),
          getMealPlans(),
          getShoppingList(),
        ]);

        setUsers(usersResponse.data);
        setRecipes(recipesResponse.data);
        setIngredients(ingredientsResponse.data);
        setMealPlans(mealPlansResponse.data);
        setShoppingList(shoppingResponse.data);
      } catch (err) {
        console.error("Backend connection error:", err);
        setError(
          "Unable to connect to Spring Boot backend. Make sure the backend is running on port 8080."
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="app">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="logo">
          🍴 <span>RecipeBox</span>
        </div>

        <nav>
          {menuItems.map((item) => (
            <button
              key={item}
              className={
                activePage === item ? "menu active" : "menu"
              }
              onClick={() => setActivePage(item)}
            >
              {item === "Dashboard" && "🏠"}
              {item === "Users" && "👤"}
              {item === "Recipes" && "🍲"}
              {item === "Ingredients" && "🥕"}
              {item === "Meal Plans" && "📅"}
              {item === "Shopping List" && "🛒"}

              <span>{item}</span>
            </button>
          ))}
        </nav>

        <div className="profile">
          <div className="avatar">J</div>

          <div>
            <strong>Jeevitha</strong>
            <small>RecipeBox User</small>
          </div>
        </div>

      </aside>

      {/* Main Content */}
      <main className="main">

        {/* Header */}
        <header className="header">

          <div>
            <h1>{activePage}</h1>
            <p>Manage your recipes and meal plans</p>
          </div>

          <div className="user-info">
            <div className="avatar">J</div>
            <span>Jeevitha</span>
          </div>

        </header>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="loading">
            Loading data from backend...
          </div>
        )}

        {/* ================= DASHBOARD ================= */}
        {!loading && activePage === "Dashboard" && (
          <>

            {/* Statistics Cards */}
            <section className="cards">

              <div className="card">
                <div className="card-icon">👤</div>

                <div>
                  <p>Total Users</p>
                  <h2>{users.length}</h2>
                </div>
              </div>

              <div className="card">
                <div className="card-icon">🍲</div>

                <div>
                  <p>Total Recipes</p>
                  <h2>{recipes.length}</h2>
                </div>
              </div>

              <div className="card">
                <div className="card-icon">🥕</div>

                <div>
                  <p>Ingredients</p>
                  <h2>{ingredients.length}</h2>
                </div>
              </div>

              <div className="card">
                <div className="card-icon">📅</div>

                <div>
                  <p>Meal Plans</p>
                  <h2>{mealPlans.length}</h2>
                </div>
              </div>

            </section>

            {/* Dashboard Panels */}
            <section className="dashboard-grid">

              {/* Today's Meal Plan */}
              <div className="panel">

                <div className="panel-header">
                  <h2>Today's Meal Plan</h2>

                  <span>
                    {mealPlans.length > 0
                      ? mealPlans[0].mealDate
                      : "No meal plan"}
                  </span>
                </div>

                {mealPlans.length > 0 ? (
                  <div className="meal">

                    <div className="meal-image">
                      🍛
                    </div>

                    <div className="meal-info">

                      <h3>
                        {recipes.find(
                          (recipe) =>
                            recipe.id === mealPlans[0].recipeId
                        )?.name || "Chicken Biryani"}
                      </h3>

                      <p>
                        {recipes.find(
                          (recipe) =>
                            recipe.id === mealPlans[0].recipeId
                        )?.cuisine || "Indian Cuisine"}
                      </p>

                      <div className="tags">

                        <span>
                          🍽 {mealPlans[0].mealType}
                        </span>

                        <span>
                          ⏱{" "}
                          {recipes.find(
                            (recipe) =>
                              recipe.id === mealPlans[0].recipeId
                          )?.preparationTime ?? 0}{" "}
                          min
                        </span>

                      </div>

                    </div>

                  </div>
                ) : (
                  <p>No meal plans available.</p>
                )}

              </div>

              {/* Shopping List */}
              <div className="panel">

                <div className="panel-header">

                  <h2>Shopping List</h2>

                  <span>
                    {shoppingList.length} Items
                  </span>

                </div>

                {shoppingList.length > 0 ? (
                  shoppingList.map((item) => (
                    <div
                      className="shopping-item"
                      key={item.id}
                    >

                      <span>
                        🥕 {item.name}
                      </span>

                      <strong>
                        {item.quantity} {item.unit}
                      </strong>

                    </div>
                  ))
                ) : (
                  <p>No shopping items available.</p>
                )}

              </div>

            </section>

          </>
        )}

        {/* ================= USERS ================= */}
        {!loading && activePage === "Users" && (
          <section className="page-content">

            <div className="section-title">
              <h2>Users</h2>
              <span>{users.length} Users</span>
            </div>

            {users.length > 0 ? (
              users.map((user) => (
                <div
                  className="data-item"
                  key={user.id}
                >

                  <div>
                    <h3>👤 {user.name}</h3>
                    <p>{user.email}</p>
                  </div>

                  <span>
                    ID: {user.id}
                  </span>

                </div>
              ))
            ) : (
              <p>No users found.</p>
            )}

          </section>
        )}

        {/* ================= RECIPES ================= */}
        {!loading && activePage === "Recipes" && (
          <section className="page-content">

            <div className="section-title">
              <h2>Recipes</h2>
              <span>{recipes.length} Recipes</span>
            </div>

            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <div
                  className="data-item"
                  key={recipe.id}
                >

                  <div>
                    <h3>
                      🍲 {recipe.name}
                    </h3>

                    <p>
                      {recipe.description}
                    </p>

                    <p>
                      🌍 {recipe.cuisine}
                    </p>
                  </div>

                  <div>
                    <strong>
                      ⏱ {recipe.preparationTime} min
                    </strong>

                    <p>
                      {recipe.favourite
                        ? "⭐ Favourite"
                        : "Not Favourite"}
                    </p>
                  </div>

                </div>
              ))
            ) : (
              <p>No recipes found.</p>
            )}

          </section>
        )}

        {/* ================= INGREDIENTS ================= */}
        {!loading && activePage === "Ingredients" && (
          <section className="page-content">

            <div className="section-title">
              <h2>Ingredients</h2>

              <span>
                {ingredients.length} Ingredients
              </span>
            </div>

            {ingredients.length > 0 ? (
              ingredients.map((ingredient) => (
                <div
                  className="data-item"
                  key={ingredient.id}
                >

                  <div>
                    <h3>
                      🥕 {ingredient.name}
                    </h3>

                    <p>
                      Recipe ID: {ingredient.recipeId}
                    </p>
                  </div>

                  <strong>
                    {ingredient.quantity} {ingredient.unit}
                  </strong>

                </div>
              ))
            ) : (
              <p>No ingredients found.</p>
            )}

          </section>
        )}

        {/* ================= MEAL PLANS ================= */}
        {!loading && activePage === "Meal Plans" && (
          <section className="page-content">

            <div className="section-title">
              <h2>Meal Plans</h2>

              <span>
                {mealPlans.length} Plans
              </span>
            </div>

            {mealPlans.length > 0 ? (
              mealPlans.map((plan) => {

                const recipe = recipes.find(
                  (r) => r.id === plan.recipeId
                );

                return (
                  <div
                    className="data-item"
                    key={plan.id}
                  >

                    <div>
                      <h3>
                        📅 {plan.mealDate}
                      </h3>

                      <p>
                        🍽 {plan.mealType}
                      </p>
                    </div>

                    <strong>
                      🍲{" "}
                      {recipe?.name ||
                        `Recipe ID ${plan.recipeId}`}
                    </strong>

                  </div>
                );
              })
            ) : (
              <p>No meal plans found.</p>
            )}

          </section>
        )}

        {/* ================= SHOPPING LIST ================= */}
        {!loading && activePage === "Shopping List" && (
          <section className="page-content">

            <div className="section-title">
              <h2>Shopping List</h2>

              <span>
                {shoppingList.length} Items
              </span>
            </div>

            {shoppingList.length > 0 ? (
              shoppingList.map((item) => (
                <div
                  className="data-item"
                  key={item.id}
                >

                  <div>
                    <h3>
                      🛒 {item.name}
                    </h3>

                    <p>
                      Recipe ID: {item.recipeId}
                    </p>
                  </div>

                  <strong>
                    {item.quantity} {item.unit}
                  </strong>

                </div>
              ))
            ) : (
              <p>No shopping items found.</p>
            )}

          </section>
        )}

      </main>
    </div>
  );
}

export default App;