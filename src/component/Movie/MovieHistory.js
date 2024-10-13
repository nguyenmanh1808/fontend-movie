import { useEffect, useState } from 'react';
import { useSelector} from 'react-redux';
import {movieHistory} from '../../services/moviesSevice';
import './MovieCategory.scss'
import { Link } from 'react-router-dom';
const MovieHistory = ()=>{
    const account = useSelector(state => state.user.account);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
/// state
    const [movie,setMovie] = useState([]);

// use efect
  
useEffect(()=>{
    getMovieHistory()
},[])
///

const getMovieHistory = async()=>{
    let res = await movieHistory(account.access_token);
    console.log(res.data)
    if(res.data && res.data.EC === 0){
        setMovie(res.data.DT)
        console.log(res.data.DT)
        
    }
 }
    const storeMovieId = (item)=>{
        sessionStorage.setItem("movieId", item.id);
    }
    return (
        <div className='movies-class-category'>
        <div className='movies-category'>
            <Link to="#"> Lịch sử xem phim </Link>
        </div>
        <div className='movies-list'>
            {movie && movie.length > 0 ? 
                Array.from({length:movie.length > 10 ? 10: movie.length }).map((_,index)=>{
                    return (
                        <Link key={`movie-${index}`} to={`/movie/${movie[index].Movie.slug}-tap-${movie[index].slug}`} className='c-2-5' onClick={()=>storeMovieId(movie[index].Movie)} >
                            <div className='movies_img'  >     
                                <img src={require(`../../assets/img_poster/${movie[index].Movie.url_img}`)} alt=''  ></img>   
                            </div>
                            <div className='movies_name'>
                                {movie[index].Movie.name}
                            </div>
                        </Link>
                    )
                 })
                :
                <>
                    <div>
                        <h3>
                          Lịch sử xem trống
                        </h3>
                    </div>
                </> 
            }
           
        </div>
    </div>
    )
    
}

export default MovieHistory;