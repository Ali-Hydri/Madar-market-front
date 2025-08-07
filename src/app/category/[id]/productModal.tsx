import { useCart } from "@/context/cartContext";
import Product from "@/types/productsType";
import Image from "next/image";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

// Product Modal Component
const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { addToCart } = useCart();


  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 flex items-end justify-center z-50 w-[375px] mx-auto">
      <div
        className={`bg-[#FAFAFA] rounded-t-2xl w-full h-[90vh] overflow-y-auto relative transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors z-10"
        >
          ×
        </button>

        {/* Product Image */}
        <div className="relative h-64  rounded-t-2xl flex items-center justify-center">
          <div className="w-48 h-48 relative">
            <Image
              src={`/images/products/${product.imageUrl}.png`}
              alt={product.name}
              fill
              className="object-contain"
              sizes="192px"
            />
          </div>
          {/* Image Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-6">
          <h2 className="text-[16px]  font-bold text-[#6B6866] mb-4 text-right">
            {product.name}
          </h2>

          {/* Specifications Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-white rounded-lg p-3">
              <p className="text-sm text-[#979593] mb-1">مواد تشکیل دهنده:</p>
              <p className="text-sm font-medium text-[#787471]">
                {product.ingredients || "شیر گاوی"}
              </p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-sm text-[#979593] mb-1">نوع بسته بندی:</p>
              <p className="text-sm font-medium text-[#787471]">
                {product.packaging || "پلی اتیلن"}
              </p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-sm text-[#979593] mb-1">مواد تشکیل دهنده:</p>
              <p className="text-sm font-medium text-[#787471]">
                {product.ingredients || "شیر گاوی"}
              </p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-sm text-[#979593] mb-1">نوع بسته بندی:</p>
              <p className="text-sm font-medium text-[#787471]">
                {product.packaging || "پلی اتیلن"}
              </p>
            </div>
          </div>

          {/* Pricing Section - Fixed at Bottom */}
          <div className="fixed bottom-0 left-0 right-0 bg-[#FAFAFA] p-6 ">
            <div className="space-y-4 mb-6 ">
              {/* Supporter Card Price */}
              <div className="flex items-center justify-between rounded-[10px] bg-white relative p-[1px] bg-gradient-to-r from-[#D2DD25] via-[#43B999] via-[#02A9EC] via-[#364FC0] to-[#65029B]">
                <div className="flex items-center justify-between w-full bg-white rounded-[9px] p-[8px]">
                  <button className="font-bold text-[#65029B] rounded-lg text-[14px]">
                    قیمت با حامی کارت
                  </button>
                  <div className=" rounded-lg px-3 py-2">
                    <span className="flex justify-center items-center gap-1 text-[16px] font-bold  text-[#0B8500]">
                      {product.discountedPrice.toLocaleString()}{" "}
                      <p className="text-[10px]">تومان</p>
                    </span>
                  </div>
                </div>
              </div>

              {/* Regular Price */}
              <div className="flex justify-between gap-[40px]">
                {/* Add to Cart Button */}
                <button
                  onClick={() =>{
                    addToCart(product)}
                  } 
                  className="cursor-pointer bg-[#FF6A29] text-white py-2 px-[12px] rounded-[12px]  font-bold text-[14px] hover:bg-orange-600 transition-colors w-[246px] h-[48px]"
                >
                  افزودن به سبد خرید
                </button>
                <div className="flex flex-col justify-between items-center">
                  <span className="text-sm text-[#787471]">قیمت کالا</span>
                  <span className="flex gap-1 font-bold justify-center items-center text-base text-[#FF6A29]">
                    {product.discountedPrice.toLocaleString()}
                    <p className="text-[10px]">تومان</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
