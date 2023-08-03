import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import router from './routes';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import store from './store';

import "./assets/css/globals.css"; 
import "./assets/css/text-utilities.css"; 
import "./assets/css/mode.styles.css"; 
import "./assets/css/theme.styles.css"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import "swiper/css";

const root = ReactDOM.createRoot(document.getElementById('root'));

serviceWorkerRegistration.unregister();

root.render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
);
