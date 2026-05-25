import { createContext, useContext, useMemo, useReducer } from 'react';

const CartContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const existing = state.items.find((item) => item.id === action.product.id);
      const items = existing
        ? state.items.map((item) => (item.id === action.product.id ? { ...item, qty: item.qty + action.qty } : item))
        : [...state.items, { ...action.product, qty: action.qty }];
      return { ...state, items };
    }
    case 'qty':
      return { ...state, items: state.items.map((item) => (item.id === action.id ? { ...item, qty: Math.max(1, action.qty) } : item)) };
    case 'remove':
      return { ...state, items: state.items.filter((item) => item.id !== action.id) };
    case 'coupon':
      return { ...state, coupon: action.code.trim().toUpperCase() };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [], coupon: '' });
  const totals = useMemo(() => {
    const subtotal = state.items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const discount = state.coupon === 'VENNY10' ? Math.round(subtotal * 0.1) : 0;
    const shipping = subtotal > 2500 || subtotal === 0 ? 0 : 149;
    return { subtotal, discount, shipping, total: subtotal - discount + shipping, count: state.items.reduce((sum, item) => sum + item.qty, 0) };
  }, [state]);

  const value = {
    ...state,
    ...totals,
    addToCart: (product, qty = 1) => dispatch({ type: 'add', product, qty }),
    updateQty: (id, qty) => dispatch({ type: 'qty', id, qty }),
    removeFromCart: (id) => dispatch({ type: 'remove', id }),
    applyCoupon: (code) => dispatch({ type: 'coupon', code }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
