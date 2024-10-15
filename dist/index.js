"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const cartServices_1 = require("./service/cartServices");
const productServices_1 = require("./service/productServices");
function runApp() {
    const cartServices = new cartServices_1.CartServices();
    window.alert(productServices_1.productServices.getProducts());
    while (true) {
        const input = window.prompt(`enter product key and quantity (separated by space) or type "pay" to checkout`);
        if (!input || input.trim() === "") {
            window.alert("Input is required");
            continue; // Prompt again for valid input
        }
        if (input.toLocaleLowerCase() === "pay") {
            cartServices.pay();
            break;
        }
        const part = input.split(" ");
        if (part.length !== 2) {
            window.alert("Please enter a valid product key and quantity separated by space");
            continue; // Prompt again if the input is invalid
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
(_a = document.getElementById("run")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", runApp);
