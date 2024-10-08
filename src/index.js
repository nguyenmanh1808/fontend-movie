import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {store,persistor} from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Routes,Route, Router} from "react-router-dom";
import HomePage from './component/Home/HomePage';
import PhimMoi from './component/Movie/PhimMoi';
import PhimBo from './component/Movie/PhimBo';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DetailMovie from './component/detailMovie/detailMovie';
import PrivateRoutes from'./routes/privateRoutes';
import Admin from './component/admin/admin';
import DashBoard from './component/admin/content/DashBoard/DashBoard';
import ManageUser from './component/admin/content/user/ManageUser'
import ManageMovie from './component/admin/content/movies/ManageMovies';
import UserInfor from './component/user/UserInfor';
import MovieCategory from './component/Movie/MovieCategory';
import ManageCategory from './component/admin/content/category/ManageCategory';
import ManageComment from './component/admin/content/comment/ManageComment';
import ManageEpi from './component/admin/content/epi/ManageEpi';
import MovieSearch from './component/Movie/MovieSearch';
import 'nprogress/nprogress.css'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
      <Routes>
          <Route path='login'  element={<Login/>} />
          <Route path='register' element={<Register/>} />
          <Route path='/' exact element={<App/>}>
              <Route index  element={<HomePage/>} />
              <Route path='phim-moi'  element={<PhimMoi/>} />
              <Route path='phim-bo'  element={<PhimBo/>} />
              <Route path='movie/category/:id' exact element={<MovieCategory/>}/>
              <Route path='movie/:slug'  element={<DetailMovie/>}/>
              <Route path='account' element={<UserInfor/>} />  
              <Route path='search' element={<MovieSearch/>}/>
          </Route>

          <Route path="/admin" element={<PrivateRoutes Component={Admin}/>}>
            <Route  index element={<DashBoard />}/> 
            <Route path="manage-user"  element={<ManageUser />}/> 
            <Route path='manage-movie' element={<ManageMovie/>} />
            <Route path='manage-category' element={<ManageCategory/>} />
            <Route path='manage-comment' element={<ManageComment/>}/>
            <Route path='manage-eps/:id' element={<ManageEpi/>}/>
           
          </Route> 

          <Route path='*' element="404 not found" />
      </Routes>
      <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
        />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
