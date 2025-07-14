import Image from "@/components/Image";
import { formatPrice } from "@/lib/utils";

const ProductsSection = () => {
  const products = [
    {
      id: 1,
      image: "https://placehold.co/51x64/png",
      name: "Produto #1",
      price: 100000,
    },
    {
      id: 2,
      image: "https://placehold.co/51x64/png",
      name: "Produto #2",
      price: 15000,
    },
  ];

  return (
    <div className="flex flex-col gap-3 w-full">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex justify-between items-center w-full"
        >
          <div className="flex gap-4 items-center">
            <Image
              src={product.image}
              alt={product.name}
              width={51}
              height={64}
            />
            <div className="font-bold text-sm">{product.name}</div>
          </div>
          <div className="font-bold text-sm text-right">
            {formatPrice(product.price)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsSection;
