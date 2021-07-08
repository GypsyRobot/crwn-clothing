import { CartActionTypes } from './cart.types';

//não passo payload pq é opcional
export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
});