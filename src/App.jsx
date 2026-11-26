import {
  Header, Hero, Bestsellers, Collections, Mission, Footer,
  ConfigModal, SearchModal, TreesModal, BagDrawer, ConciergeButton,
} from './components';

export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <Bestsellers />
      <Collections />
      <Mission />
      <Footer />

      <ConfigModal />
      <SearchModal />
      <TreesModal />
      <BagDrawer />
      <ConciergeButton />
    </>
  );
}
