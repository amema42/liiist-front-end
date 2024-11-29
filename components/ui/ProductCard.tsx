import React from 'react';

interface ProductCardProps {
  product: {
    productId: string;
    full_name: string;
    img_url: string;
    description: string;
    price: string;
    price_for_kg: string;
    discounted_price: string;
    quantity: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.img_url} alt={product.full_name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{product.full_name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-price">
          <span className="price">{product.discounted_price ? product.discounted_price : product.price}</span>
          {product.discounted_price && <span className="original-price">{product.price}</span>}
        </div>
        <div className="product-quantity">
          {product.quantity} disponibile
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
