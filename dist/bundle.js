"use strict";
(() => {
  // src/service/productServices.ts
  var ProductServices = class {
    constructor() {
      this.getProduct = [
        {
          code: "A",
          name: "Air Mineral",
          price: 5e3
        },
        {
          code: "B",
          name: "Pillow",
          price: 4e3
        },
        {
          code: "C",
          name: "Laptop",
          price: 9e5
        },
        {
          code: "D",
          name: "Smartphone",
          price: 1e5
        }
      ];
    }
    getProductByUniqueProperty(property, value) {
      return this.getProduct.find((product) => product[property] === value);
    }
    getProducts() {
      return this.getProduct.map((product) => {
        return `${product.code} - ${product.name} - ${product.price}`;
      }).join(`
`);
    }
  };
  var productServices = new ProductServices();

  // src/service/cartServices.ts
  var CartServices = class {
    constructor() {
      this.cart = [];
    }
    addProductToCart(code, qty) {
      const product = productServices.getProductByUniqueProperty("code", code);
      if (!product) {
        window.alert("Invalid Product Code");
        return;
      }
      const cartItem = { product, qty };
      this.cart.push(cartItem);
      window.alert(`${product.name} added to cart (${qty} pcs)`);
    }
    showCart() {
      let carList = "Cart : \n";
      let total = 0;
      for (const cart of this.cart) {
        const subtotal = cart.product.price * cart.qty;
        total += subtotal;
        carList += ` ${cart.product.name} - ${cart.qty}pcs - Rp${subtotal}
`;
      }
      carList += `
Total : Rp${total}`;
    }
    pay() {
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
  };

  // src/index.ts
  function runApp() {
    const cartServices = new CartServices();
    window.alert(productServices.getProducts());
    while (true) {
      const input = window.prompt(
        `enter product key and quantity (separated by space) or type "pay" to checkout`
      );
      if (!input || input.trim() === "") {
        window.alert("Input is required");
        continue;
      }
      if (input.toLocaleLowerCase() === "pay") {
        cartServices.pay();
        break;
      }
      const part = input.split(" ");
      if (part.length !== 2) {
        window.alert(
          "Please enter a valid product key and quantity separated by space"
        );
        continue;
      }
      const [code, quantity] = part;
      const quantityNumber = Number(quantity);
      if (isNaN(quantityNumber) || quantityNumber <= 0) {
        window.alert("Invalid Quantity");
        continue;
      }
      cartServices.addProductToCart(code, quantityNumber);
      cartServices.showCart();
    }
    window.alert("Thank you for shopping");
  }
  document.getElementById("run")?.addEventListener("click", runApp);
})();
