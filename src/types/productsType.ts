  interface Product {
    id: number;
    name: string;
    imageUrl: string;
    originalPrice: number;
    discountedPrice: number;
    discountPercentage: number;
    description: string;
    ingredients?: string;
    packaging?: string;
    weight?: string;
  }

  export default Product