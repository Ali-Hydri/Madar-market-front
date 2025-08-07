import { useCart } from "@/context/cartContext";
import Product from "@/types/productsType";
import Image from "next/image";

interface ProductCardProps {
    product: Product;
    onClick: (product: Product) => void;
  }
  
  const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
    const { addToCart } = useCart();

    return (
      <div
        onClick={() => onClick(product)}
        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-[#F3F0EC] group"
      >
        {/* Product Image */}
        <div className="relative h-32 rounded-t-xl flex items-center justify-center overflow-hidden">
          <div className="h-20 relative w-[40%]">
            <Image
              src={`/images/products/${product.imageUrl}.png`}
              alt="محصولات"
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-300"
              sizes="80px"
            />
          </div>
          {/* Product Info */}
          <div className="p-4">
            <h4 className="text-[#787471] text-sm font-medium mb-2 text-right leading-tight line-clamp-2">
              {product.description}
            </h4>
  
            {/* Price */}
            <div className="flex items-center gap-1 mt-[12px]">
              <span className="text-xs text-[#787471] line-through">
                {product.originalPrice.toLocaleString()} تومان
              </span>
              {/* Discount Badge */}
              <div className="bg-[#C50F1F] w-[23px] h-[16px] text-white text-[8px] justify-center items-center px-1 py-[3px] rounded-full font-bold">
                {product.discountPercentage}%
              </div>
            </div>
  
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[#BA400B]">
                {product.discountedPrice.toLocaleString()} تومان
              </span>
              <button
                className="bg-[#F7F7F7] text-[#787471] text-[14px] rounded-[20px] hover:bg-gray-200 transition-colors w-[105px] h-[40px] border-[#F3F0EC] cursor-pointer"
                onClick={() =>{
                  addToCart(product)}
                } 
              >
                افزودن به سبد
              </button>
            </div>
          </div>
        </div>
        <div className="bg-[#FFEDE5] text-[#BA400B] h-[34px] rounded-b-[9px] flex justify-between py-[8px] px-[16px]">
          <p className="text-[14px] font-bold">قیمت با حامی کارت</p>
          <div className="flex items-center gap-[2px]">
            <p className="text-[16px] font-bold">۳,۰۰۰,۰۰۰</p>
            <p className="text-[10px]">تومان</p>
          </div>
        </div>
      </div>
    );
  };

  export default ProductCard;