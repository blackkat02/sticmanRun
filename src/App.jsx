import { Route, Routes } from 'react-router-dom'
// import ProductsPage from './pages/ProductsPage/ProductsPage'
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage/HomePage'
import MoviesPage from './pages/MoviesPage/MoviesPage'
// import ProductsDetailsPage from './pages/ProductsDetailsPage/ProductsDetailsPage'
// import ProductMeta from './components/ProductMeta/ProductMeta'
// import ProductDimensions from './components/ProductDimensions/ProductDimensions'
// import HomeLayout from './layouts/HomeLayout/HomeLayout'
// import ProductsLayout from './layouts/ProductsLayout/ProductsLayout'

const App = () => {


  return (
    <div>
      {/* <Nav /> */}
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="movies" element={<MoviesPage />} />
        </Route>
        {/* <Route path='/' element={<HomeLayout />}>
          <Route index element={<HomePage />} />
        </Route> */}
        {/* <Route path='/' element={<HomePage />} /> */}
        {/* <Route path='/products' element={<ProductsLayout />}>
          <Route index element={<ProductsPage />} />
          <Route path='/products/:productId' element={<ProductsDetailsPage />}>
            <Route path='meta' element={<ProductMeta />} />
            <Route path='dimensions' element={<ProductDimensions />} />
          </Route>
        </Route>
        <Route path='*' element={<div>404</div>} /> */}
      </Routes>
    </div>
  )
}

export default App;
