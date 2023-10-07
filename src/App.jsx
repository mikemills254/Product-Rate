import React, { useEffect } from 'react';
import LandPage from '../Pages/LandPage';
import HomePage from '../Pages/HomePage';
import ProductPage from '../Pages/ProductPage';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(isAuthenticated);
  }, [accessToken]);

  return (
    <Router>
      <Routes>
        {accessToken ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/productPage" element={<ProductPage />} />
          </>
        ) : (
          <Route path="/" element={<LandPage />} />
        )}
      </Routes>
    </Router>

  );
}

export default App;
