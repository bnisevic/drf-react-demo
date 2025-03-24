import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Login from './components/Login';
import ProductTable from './components/ProductTable';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProductTable />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
