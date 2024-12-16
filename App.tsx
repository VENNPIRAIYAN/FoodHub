import React, { useState } from 'react';
import Header from './src/components/Header'
import Hero from './src/components/Hero';
import Categories from './src/components/Categories';
import RestaurantCard from './src/components/RestaurantCard';
import { restaurants } from './src/data/restaurants';
import { useSearch } from './src/hooks/useSearch';
import { useCart } from './src/hooks/useCart';

function App(){
  const { 
    searchTerm, 
    filters, 
    filteredRestaurants, 
    updateSearchTerm, 
    updateFilters 
  } = useSearch(restaurants);
  
  const { 
    cartItems, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    total 
  } = useCart();

  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCategorySelect = (category: string) => {
    updateFilters({ 
      category: filters.category === category ? undefined : category 
    });
  };

  const handleLogin = () => {
    // Implement login functionality
    alert('Login functionality coming soon!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        searchTerm={searchTerm}
        onSearchChange={updateSearchTerm}
        cartItemsCount={cartItems.length}
        onCartClick={() => setIsCartOpen(true)}
        onLoginClick={handleLogin}
      />
      <Hero />
      <Categories
        onCategorySelect={handleCategorySelect}
        selectedCategory={filters.category}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {filteredRestaurants.length === 0 
            ? 'No restaurants found' 
            : 'Popular Restaurants'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard 
              key={restaurant.name} 
              {...restaurant}
              onOrderClick={() => {
                addToCart({
                  restaurantName: restaurant.name,
                  itemName: 'Popular Item',
                  price: 15.99,
                  quantity: 1
                });
              }}
            />
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-96 bg-white p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Your Cart</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div key={`${item.restaurantName}-${item.itemName}`} className="mb-4">
                    <div className="flex justify-between">
                      <span>{item.itemName}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center mt-2">
                      <button 
                        onClick={() => updateQuantity(item.restaurantName, item.itemName, item.quantity - 1)}
                        className="px-2 py-1 border rounded"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="mx-4">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.restaurantName, item.itemName, item.quantity + 1)}
                        className="px-2 py-1 border rounded"
                      >
                        +
                      </button>
                      <button 
                        onClick={() => removeFromCart(item.restaurantName, item.itemName)}
                        className="ml-4 text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <div className="mt-6 border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => alert('Checkout functionality coming soon!')}
                    className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;