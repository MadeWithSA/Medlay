export const asset = (path) => `${import.meta.env.BASE_URL}assets/${path}`;

export const RATES = {
  UZS: { rate: 12850, suffix: ' UZS', prefix: '' },
  USD: { rate: 1, suffix: '', prefix: '$' },
  AED: { rate: 3.67, suffix: ' AED', prefix: '' },
};

export function formatPrice(usdAmount, currency) {
  const cfg = RATES[currency];
  const val = Math.round(usdAmount * cfg.rate);
  const formatted = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${cfg.prefix}${formatted}${cfg.suffix}`;
}

// scene — индекс сцены (0..3), x / y — положение хотспота внутри сцены в %
export const PRODUCTS = [
  {
    id: 'toucan-brooch',
    collection: 'Be Free',
    nameRu: 'Брошь-кулон Be Free Toucan',
    nameEn: 'Be Free Toucan Brooch Pendant',
    specs: '18K White Gold • 1.45 ct Diamonds & Yellow Sapphires',
    priceUsd: 3680,
    oldPriceUsd: 4250,
    image: 'products/brooch-toucan.png',
    bestseller: false,
    scene: 0, x: 29, y: 44,
  },
  {
    id: 'flamingo-brooch',
    collection: 'Be Free',
    nameRu: 'Брошь Be Free Flamingo',
    nameEn: 'Be Free Pink Sapphire Flamingo Brooch',
    specs: '18K Rose Gold • 1.20 ct Pink Sapphires & Diamonds',
    priceUsd: 3290,
    oldPriceUsd: 3800,
    image: 'products/brooch-flamingo.png',
    bestseller: false,
    scene: 0, x: 56, y: 40,
  },
  {
    id: 'hummingbird-brooch',
    collection: 'Be Free',
    nameRu: 'Брошь Be Free Hummingbird',
    nameEn: 'Be Free Emerald & Sapphire Hummingbird',
    specs: '18K White Gold • 1.35 ct Emeralds, Sapphires & VVS Diamonds',
    priceUsd: 3450,
    oldPriceUsd: 3990,
    image: 'products/brooch-hummingbird.png',
    bestseller: true,
    scene: 0, x: 80, y: 49,
  },
  {
    id: 'sapphire-earrings',
    collection: 'Be True',
    nameRu: 'Серьги Be True Blue Pear Drop',
    nameEn: 'Be True Blue Sapphire & Diamond Drop Earrings',
    specs: 'Platinum 950 • 2.40 ct Pear Sapphires & Halo Diamonds',
    priceUsd: 4120,
    oldPriceUsd: 4750,
    image: 'products/earrings-sapphire.png',
    bestseller: false,
    scene: 1, x: 25, y: 44,
  },
  {
    id: 'leaf-earrings',
    collection: 'Be True',
    nameRu: 'Серьги Be True Diamond Leaf',
    nameEn: 'Be True Marquise Leaf Stud Earrings',
    specs: '18K White Gold • 1.10 ct Marquise Lab Diamonds (E, VVS2)',
    priceUsd: 1950,
    oldPriceUsd: 2300,
    image: 'products/earrings-always-be.png',
    bestseller: false,
    scene: 1, x: 50, y: 48,
  },
  {
    id: 'leaf-ring',
    collection: 'Be True',
    nameRu: 'Кольцо Be True Leaf Solitaire',
    nameEn: 'Be True Leaf-Cut Solitaire Ring',
    specs: 'Platinum 950 • 1.00 ct Leaf-Cut Lab Diamond (D, VVS1)',
    priceUsd: 2450,
    oldPriceUsd: 2890,
    image: 'products/ring-leaf.png',
    bestseller: true,
    scene: 1, x: 77, y: 54,
  },
  {
    id: 'kohana-necklace',
    collection: 'Kohana',
    nameRu: 'Колье Kohana Hydrangea Bloom',
    nameEn: 'Kohana Floral Cluster Diamond Necklace',
    specs: '18K Two-Tone Gold • 1.15 ct Pavé Lab Diamonds',
    priceUsd: 2890,
    oldPriceUsd: 3350,
    image: 'products/necklace-kohana.png',
    bestseller: false,
    scene: 2, x: 52, y: 56,
  },
  {
    id: 'kohana-ring',
    collection: 'Kohana',
    nameRu: 'Кольцо Kohana Floral Cluster',
    nameEn: 'Kohana Two-Tone Diamond Flower Ring',
    specs: '18K White & Yellow Gold • 1.65 ct Pavé Diamonds (E, VS1)',
    priceUsd: 4800,
    oldPriceUsd: 5490,
    image: 'products/ring-kohana.png',
    bestseller: true,
    scene: 2, x: 24, y: 51,
  },
  {
    id: 'honeycomb-necklace',
    collection: 'Just Bee',
    nameRu: 'Колье Just Bee Honeycomb',
    nameEn: 'Just Bee Hexagon Diamond Cluster Necklace',
    specs: '18K Rose & Yellow Gold • 1.50 ct Pavé Lab Diamonds',
    priceUsd: 3180,
    oldPriceUsd: 3690,
    image: 'products/necklace-honeycomb.png',
    bestseller: true,
    scene: 3, x: 36, y: 49,
  },
  {
    id: 'honeycomb-earrings',
    collection: 'Just Bee',
    nameRu: 'Серьги Just Bee Hexagon Drop',
    nameEn: 'Just Bee Honeycomb Linear Drop Earrings',
    specs: '18K Yellow Gold • 1.30 ct Brilliant Lab Diamonds',
    priceUsd: 2640,
    oldPriceUsd: 3100,
    image: 'products/earrings-always-be.png',
    bestseller: false,
    scene: 3, x: 61, y: 42,
  },
];

export const SCENES = [
  { id: 'tier-befree', img: 'panoramas/scene-be-free.jpg', n: '01', name: 'Be Free', descKey: 't1_desc', alt: 'Be Free tropical birds' },
  { id: 'tier-betrue', img: 'panoramas/scene-be-true.jpg', n: '02', name: 'Be True', descKey: 't2_desc', alt: 'Be True botanical leaf' },
  { id: 'tier-kohana', img: 'panoramas/scene-kohana.jpg', n: '03', name: 'Kohana', descKey: 't3_desc', alt: 'Kohana hydrangea bloom' },
  { id: 'tier-justbee', img: 'panoramas/scene-just-bee.jpg', n: '04', name: 'Just Bee', descKey: 't4_desc', alt: 'Just Bee golden honeycomb' },
];

export const METALS = ['18K White Gold', '18K Yellow Gold', '18K Rose Gold', 'Platinum 950'];
export const SIZES = ['16.0 (US 5.5)', '16.5 (US 6)', '17.0 (US 6.5)', 'Standard Gift Box'];
