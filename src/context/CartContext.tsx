import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { CartContextType, CartItem } from "../features/roblox/interface/ICartContext";

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
    toast.success("Item added to the cart", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item removed from the cart", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, cartOpen, setCartOpen }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
