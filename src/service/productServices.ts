import { Product } from "../models/product";

export class ProductServices {
  private getProduct: Product[] = [
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

  getProductByUniqueProperty<T>(
    property: keyof Product,
    value: T
  ): Product | undefined {
    return this.getProduct.find((product) => product[property] === value);
  }

  getProducts(): string {
    return this.getProduct
      .map((product) => {
        return `${product.code} - ${product.name} - ${product.price}`;
      })
      .join(`\n`);
  }
}

export const productServices = new ProductServices();
