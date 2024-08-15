
import './App.scss';
import SlideShow from './component/Home/SlideShow';
import Header from './component/Navigation/Header';
import { Outlet, Link } from "react-router-dom";


const App = () => {
  return (
    <div className="app-container"> 
      <div className='header-container'>
         <Header/>
      </div>
      <div className='main-container'>
        <div className='sidebar-container'>
            <div className='slide-container'>
                <SlideShow/>
            </div>
        </div>
        <div className='app-content'></div>
         <Outlet/>
      </div>
    </div>
  );
}

export default App;
