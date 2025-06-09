import { Route, Routes } from "react-router-dom";
import MainLayout from './layouts/MainLayout';
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const CatalogPage = lazy(() => import("./pages/CatalogPage/CatalogPage"));
const CamperDetailsPage = lazy(() => import("./pages/CamperDetailsPage/CamperDetailsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

const CamperFeatures = lazy(() => import("./components/CamperFeatures/CamperFeatures"));
const CamperReviews = lazy(() => import("./components/CamperReviews/CamperReviews")); 

function App() {
  return (
    <Suspense fallback={<div>Завантаження сторінки...</div>}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/campers" element={<CatalogPage />} />
          
          <Route path="/campers/:camperId" element={<CamperDetailsPage />}>
            <Route index element={<CamperFeatures />} /> 
            <Route path="features" element={<CamperFeatures />} />
            <Route path="reviews" element={<CamperReviews />} /> 
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} /> 
      </Routes>
    </Suspense>
  );
}

export default App;