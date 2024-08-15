import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Routes,Route} from "react-router-dom";
import HomePage from './component/Home/HomePage';
import PhimMoi from './component/Movie/PhimMoi';
import PhimBo from './component/Movie/PhimBo';
import Login from './component/Login/Login';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<App/>}>
            <Route index  element={<HomePage/>} />
            <Route path='phim-moi'  element={<PhimMoi/>} />
            <Route path='phim-bo'  element={<PhimBo/>} />
        </Route>
        <Route path='login' element={<Login/>} />
    </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
