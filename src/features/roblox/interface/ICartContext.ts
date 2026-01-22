export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
}