import React from 'react';
import {createRoot} from 'react-dom/client'
//import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import './vendors/daterangepicker/daterangepicker.css';
// import './vendors/datatables.net-bs5/css/dataTables.bootstrap5.min.css';

//import './vendors/datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css';

import './dist/css/style.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root =createRoot(document.getElementById('root'))
root.render(
   <>
    <Provider store = {store}>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    </Provider>
    <ToastContainer />
  </>
);