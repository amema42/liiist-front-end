'use client'; // Aggiungi questa riga per marcare il file come Client Component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Ora funziona nel client
import ProductCard from '../../../components/ui/ProductCard'; // Percorso corretto
import SupermarketInfo from '../../../components/ui/SupermarketInfo'; // Percorso corretto
import styles from '../../../components/ui/SupermarketInfo.module.css'; // Importiamo anche i CSS

const SupermarketPage = () => {
  const router = useRouter(); // Ora useRouter funziona correttamente
  const { supermarketId } = router.query; // Ottieni l'ID del supermercato dalla URL

  const [supermarketData, setSupermarketData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supermarketId) return;

    const fetchData = async () => {
      try {
        // Carica i dati del supermercato da /data/supermarkets.json
        const resShop = await fetch('/data/supermarkets.json');
        const shopData = await resShop.json();
        const selectedShop = shopData.supermarkets.find(shop => shop.uniqueShopId === supermarketId);
        setSupermarketData(selectedShop);

        // Carica i prodotti da /data/products.json
        const resProducts = await fetch('/data/products.json');
        const productsData = await resProducts.json();
        const shopProducts = productsData.products.filter(product => product.shopId === supermarketId);
        setProducts(shopProducts);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [supermarketId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="supermarket-page">
      {supermarketData && <SupermarketInfo data={supermarketData} />}
      <div className="products-list">
        {products.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SupermarketPage;
