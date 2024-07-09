import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Khôi phục giỏ hàng từ localStorage
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [showCart2, setShowCart] = useState(false);

  useEffect(() => {
    // Lưu giỏ hàng vào localStorage khi có thay đổi
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const areItemsEqual = (item1, item2) => {
    return (
      item1.id === item2.id &&
      item1.size === item2.size &&
      item1.price === item2.price &&
      item1.name === item2.name &&
      item1.image === item2.image
    );
  };

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((cartItem) =>
        areItemsEqual(cartItem, item)
      );
      if (itemExists) {
        return prevItems.map((cartItem) =>
          areItemsEqual(cartItem, item)
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId, itemSize) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (cartItem) => !(cartItem.id === itemId && cartItem.size === itemSize)
      )
    );
  };

  const isProductInCart = (productID) => {
    return cartItems.some((item) => item.productID === productID);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const placeOrder = () => {
    const orderId = Date.now();
    const order = {
      id: orderId,
      items: cartItems,
      date: new Date().toISOString(),
    };
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    clearCart();
    return orderId;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        showCart2,
        setShowCart,
        clearCart,
        placeOrder,
        isProductInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
