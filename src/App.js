import React from 'react';
import { Switch } from 'react-router-dom';
import { AuthProvider } from './contexts/JWTAuthContext';
import { GlobalStoreProvider } from './contexts/GlobalStoreContext';
import routes, { renderRoutes } from './routes';
import { ToastContainer } from 'react-toastify';
import "bootstrap/dist/css/bootstrap.min.css";
import './scss/main.scss';
import 'react-toastify/dist/ReactToastify.css'; 
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <AuthProvider>
      <GlobalStoreProvider>
        <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          toastOptions={{
            // Define default options
            className: '',
            duration: 3000,
            // style: {
            //   background: '#363636',
            //   color: '#fff',
            // },
            // Default options for specific types
            success: {
              duration: 3000,
              // theme: {
              //   primary: 'green',
              //   secondary: 'black',
              // },
            },
          }}
        />
        <Switch>
          {renderRoutes(routes)}
        </Switch>
      </GlobalStoreProvider>
    </AuthProvider>
  );
};

export default App;
