
import './App.scss';
import Footer from './component/footer/footer';
import Header from './component/Navigation/Header';
import { Outlet, Link } from "react-router-dom";


const App = () => {
  return (
    <div className="app-container"> 
      <div className='header-container'>
         <Header/>
      </div>
      <div className='main-container'>
        <Outlet/>
      </div>
      <div className='footer-container'>
        <Footer/>
      </div>
    </div>
  )
}

export default App;
