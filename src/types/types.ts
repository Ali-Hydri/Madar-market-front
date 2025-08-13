export interface User {
  id: string;
  name: string;
  email: string;
  lastname: string;
  phone?: string;
  isAdmin?: boolean;
}

export interface Product {
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
  isSpecial?: boolean;
  isSpecialLine2?: boolean;
}

export interface CategoryItem {
  id: number;
  name: string;
  imageUrl: string;
  alt: string;
}

export interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}
