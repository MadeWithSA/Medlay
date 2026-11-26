# MEDLAY — React (Vite)

```bash
npm install
npm run dev      # локальный запуск
npm run build    # сборка в dist/
```

Структура:
- `src/store.jsx` — состояние (язык RU/EN, валюта, корзина, промокод MEDLAY10, деревья, модалки)
- `src/data/products.js` — каталог, сцены и позиции хотспотов
- `src/i18n.js` — тексты RU / EN
- `src/components/` — по одному файлу на блок: Header, Hero, Bestsellers, Collections, Mission, Footer, ConfigModal, SearchModal, TreesModal, BagDrawer, ConciergeButton (+ Backdrop). Все подключаются в App.jsx через `import { Header, Footer } from "./components"`
- `public/assets/` — видео, сцены и фото украшений
# Medlay
