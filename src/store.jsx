import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { PRODUCTS, formatPrice as fmt } from './data/products.js';
import { T } from './i18n.js';

const StoreContext = createContext(null);
export const useStore = () => useContext(StoreContext);

const INITIAL_TREES = [
  { id: 'MD-8841-UZ', species: 'Juniperus Seravschanica (Арча)', coords: '41.3111° N, 69.2797° E', date: '2026-11-20' },
];

export function StoreProvider({ children }) {
  const [currency, setCurrency] = useState('UZS');
  const [lang, setLang] = useState('RU');
  const [bag, setBag] = useState([]);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoMsg, setPromoMsg] = useState('');
  const [trees, setTrees] = useState(INITIAL_TREES);

  // overlays
  const [bagOpen, setBagOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [treesOpen, setTreesOpen] = useState(false);
  const [configProductId, setConfigProductId] = useState(null);

  const t = T[lang];
  const formatPrice = useCallback((usd) => fmt(usd, currency), [currency]);
  const productTitle = useCallback((p) => (lang === 'RU' ? p.nameRu : p.nameEn), [lang]);

  const addToBag = useCallback((product, metal, size, priceUsd) => {
    setBag((prev) => {
      const idx = prev.findIndex((i) => i.id === product.id && i.metal === metal && i.size === size);
      if (idx >= 0) return prev.map((i, k) => (k === idx ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, {
        id: product.id, nameRu: product.nameRu, nameEn: product.nameEn,
        image: product.image, metal, size, priceUsd, qty: 1,
      }];
    });
    setConfigProductId(null);
    setBagOpen(true);
  }, []);

  const updateQty = useCallback((idx, delta) => {
    setBag((prev) => prev
      .map((i, k) => (k === idx ? { ...i, qty: i.qty + delta } : i))
      .filter((i) => i.qty > 0));
  }, []);

  const applyPromo = useCallback((raw) => {
    const code = raw.trim().toUpperCase();
    if (code === 'MEDLAY10') {
      setPromoDiscount(0.1);
      setPromoMsg('ok');
    } else {
      setPromoDiscount(0);
      setPromoMsg('bad');
    }
  }, []);

  const completeOrder = useCallback(() => {
    if (bag.length === 0) return;
    const certId = 'MD-' + Math.floor(1000 + Math.random() * 9000) + '-UZ';
    setTrees((prev) => [{
      id: certId,
      species: 'Quercus Castaneifolia (Заповедный дуб)',
      coords: '41.3452° N, 69.3104° E',
      date: new Date().toISOString().slice(0, 10),
    }, ...prev]);
    setBag([]);
    setBagOpen(false);
    window.alert(T[lang].order_done(certId));
  }, [bag.length, lang]);

  const value = useMemo(() => ({
    currency, setCurrency, lang, setLang, t, formatPrice, productTitle,
    products: PRODUCTS,
    bag, addToBag, updateQty, promoDiscount, promoMsg, applyPromo, completeOrder,
    trees,
    bagOpen, setBagOpen, searchOpen, setSearchOpen, treesOpen, setTreesOpen,
    configProductId, openConfig: setConfigProductId, closeConfig: () => setConfigProductId(null),
  }), [currency, lang, t, formatPrice, productTitle, bag, addToBag, updateQty,
    promoDiscount, promoMsg, applyPromo, completeOrder, trees, bagOpen, searchOpen, treesOpen, configProductId]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
