"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productServices = exports.ProductServices = void 0;
class ProductServices {
    constructor() {
        this.getProduct = [
            {
                code: "A",
                name: "Air Mineral",
                price: 5000,
            },
            {
                code: "B",
                name: "Pillow",
                price: 4000,
            },
            {
                code: "C",
                name: "Laptop",
                price: 900000,
            },
            {
                code: "D",
                name: "Smartphone",
                price: 100000,
            },
        ];
    }
    getProductByUniqueProperty(property, value) {
        return this.getProduct.find((product) => product[property] === value);
    }
    getProducts() {
        return this.getProduct
            .map((product) => {
            return `${product.code} - ${product.name} - ${product.price}`;
        })
            .join(`\n`);
    }
}
exports.ProductServices = ProductServices;
exports.productServices = new ProductServices();
