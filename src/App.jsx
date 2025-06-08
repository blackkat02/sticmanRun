import { Route, Routes } from "react-router-dom";
import MainLayout from './layouts/MainLayout';
import { lazy, Suspense } from "react";

// const CampersFeatures = lazy(() => import("./components/CampersFeatures/CampersFeatures"));
// const CampersReviews = lazy(() => import("./components/CampersReviews/CampersReviews"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const CamperDetailsPage = lazy(() => import("./pages/CamperDetailsPage/CamperDetailsPage"));
const CatalogPage = lazy(() => import("./pages/CatalogPage/CatalogPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/campers" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<CamperDetailsPage />}>
            {/* <Route path="features" element={<campersFeatures />} />
            <Route path="reviews" element={<campersReviews />} /> */}
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </Suspense>
  );
}

export default App;