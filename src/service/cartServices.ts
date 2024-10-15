import type { Cart } from "../models/cart";
import { productServices } from "./productServices";

export class CartServices {
  private cart: Array<Cart> = [];

  addProductToCart(code: string, qty: number) {
    const product = productServices.getProductByUniqueProperty("code", code);
    if (!product) {
      window.alert("Invalid Product Code");
      return;
    }
    const cartItem: Cart = { product, qty };
    this.cart.push(cartItem);
    window.alert(`${product.name} added to cart (${qty} pcs)`);
  }

  showCart(): void {
    let carList = "Cart : \n";
    let total = 0;

    for (const cart of this.cart) {
      const subtotal = cart.product.price * cart.qty;
      total += subtotal;
      carList += ` ${cart.product.name} - ${cart.qty}pcs - Rp${subtotal}\n`;
    }

    carList += `\nTotal : Rp${total}`;
  }

  pay(): void {
    const amount = Number(window.prompt("Enter the amount: "));
    if (!amount) {
      window.alert("Payment Canceled");
      return;
    }
    const total = this.cart.reduce((acc, cart) => {
      return acc + cart.product.price * cart.qty;
    }, 0);

    const change = amount - total;

    if (change < 0) {
      window.alert("Not Enough Payment");
      return;
    }

    window.alert(`Payment Success! Change : Rp${change}`);
    this.cart = [];
  }
}
