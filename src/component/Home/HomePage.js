import { useEffect, useState } from 'react';
import SlideShow from './SlideShow';
import { Link } from "react-router-dom";
import { fetchAllMovies } from '../../services/moviesSevice';
import './HomePage.scss'
import { result } from 'lodash';
import { useSelector } from 'react-redux';
const HomePage = (props)=>{
    /// thông tin user
        const account = useSelector(state => state.user.account);
        const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    //
    const [listMovies,setListMovies] = useState([]);
    const [category,setCategory] = useState("Tình cảm");
    const [movieAction,setMovieAction] = useState([]);
    const [virtualMovie,setVirtaulMovie] = useState([]);
    const [cartoon,setCartoonMovie]= useState([])

    useEffect(()=>{
        getMovie();
        getMovieAction();
        getMovieVirtual();
        getMovieCartoon();
        document.title = 'TVWatch';
    },[])
    
    const getMovie = async ()=>{
        let res = await  fetchAllMovies(category);
        if(res.data && res.data.EC === 0  ){
            setListMovies(res.data.DT)
        }
    }
    const getMovieAction = async () =>{
        let data = "Hành động"
            let res = await  fetchAllMovies(data);
            if(res.data && res.data.EC === 0  ){
                setMovieAction(res.data.DT)
            }
    }

    const getMovieVirtual = async () =>{
        let data = "Viễn tưởng"
            let res = await  fetchAllMovies(data);
            if(res.data && res.data.EC === 0  ){
                setVirtaulMovie(res.data.DT)
            }
    }
    const getMovieCartoon = async () =>{
        let data = "Hoạt hình"
            let res = await  fetchAllMovies(data);
            if(res.data && res.data.EC === 0  ){
                setCartoonMovie(res.data.DT)
            }
    }

    //lưu id phim
    const storeMovieId = (item)=>{
        sessionStorage.setItem("movieId", item.id);
    }
    return (
      <>
        <div className='sidebar-container'>
              <div className='slide-container'>
                  <SlideShow/>
              </div>
              <div className='div_content'></div>
        </div>
         <div className='app-content'>
            <div className='movies-class'>
                <div className='movies-category'>
                   {listMovies && listMovies.length > 0 &&  <Link to="#"> Phim tình cảm </Link>}
                </div>
                <div className='movies-list'>
                    {listMovies && listMovies.length > 0 && 
                        Array.from({length:listMovies.length > 5 ? 5: listMovies.length }).map((_,index)=>{
                            return (
                                <Link key={`movie-${index}`} to={`/movie/${listMovies[index].slug}-tap-1`} className='c-2-5' onClick={()=>storeMovieId(listMovies[index])} >
                                    <div className='movies_img'  >     
                                        <img src={require(`../../assets/img_poster/${listMovies[index].url_img}`)} alt=''  ></img>   
                                    </div>
                                    <div className='movies_name'>
                                        {listMovies[index].name}
                                    </div>
                                </Link>
                            )
                         })
                    }
                </div>
            </div>
            <div className='movies-class'>
                <div className='movies-category'>
                    {movieAction && movieAction.length > 0 && <Link to="#"> Phim hành động </Link>}
                </div>
                <div className='movies-list'>
                    {movieAction && movieAction.length > 0 && 
                        Array.from({length:movieAction.length > 5 ? 5: movieAction.length }).map((_,index)=>{
                            return (
                                <Link key={`movie-${index}`} to={`/movie/${movieAction[index].slug}-tap-1`} className='c-2-5' onClick={()=>storeMovieId(movieAction[index])} >
                                    <div className='movies_img'  >     
                                        <img src={require(`../../assets/img_poster/${movieAction[index].url_img}`)} alt=''  ></img>   
                                    </div>
                                    <div className='movies_name'>
                                        {movieAction[index].name}
                                    </div>
                                </Link>
                            )
                         })
                    }
                </div>
            </div>
            <div className='movies-class'>
                <div className='movies-category'>
                   {virtualMovie &&  virtualMovie.length > 0 &&<Link to="#"> Phim viễn tưởng </Link>}
                </div>
                <div className='movies-list'>
                    {virtualMovie && virtualMovie.length > 0 && 
                        Array.from({length:virtualMovie.length > 5 ? 5: virtualMovie.length }).map((_,index)=>{
                            return (
                                <Link key={`movie-${index}`} to={`/movie/${virtualMovie[index].slug}-tap-1`} className='c-2-5' onClick={()=>storeMovieId(virtualMovie[index])} >
                                    <div className='movies_img'  >     
                                        <img src={require(`../../assets/img_poster/${virtualMovie[index].url_img}`)} alt=''  ></img>   
                                    </div>
                                    <div className='movies_name'>
                                        {virtualMovie[index].name}
                                    </div>
                                </Link>
                            )
                         })
                    }
                </div>
            </div>
            <div className='movies-class'>
                <div className='movies-category'>
                   {cartoon && cartoon.length > 0 &&  <Link to="#"> Phim hoạt hình</Link>}
                </div>
                <div className='movies-list'>
                    {cartoon && cartoon.length > 0 && 
                        Array.from({length:cartoon.length > 5 ? 5: cartoon.length }).map((_,index)=>{
                            return (
                                <Link key={`movie-${index}`} to={`/movie/${cartoon[index].slug}-tap-1`} className='c-2-5' onClick={()=>storeMovieId(cartoon[index])} >
                                    <div className='movies_img'  >     
                                        <img src={require(`../../assets/img_poster/${cartoon[index].url_img}`)} alt=''  ></img>   
                                    </div>
                                    <div className='movies_name'>
                                        {cartoon[index].name}
                                    </div>
                                </Link>
                            )
                         })
                    }
                </div>
            </div>
        </div>
      </>
    )
}


export default  HomePage;