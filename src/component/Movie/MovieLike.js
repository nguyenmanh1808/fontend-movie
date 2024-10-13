import { useEffect, useState } from 'react';
import { useSelector} from 'react-redux';
import {movieLike,fetchMovieById} from '../../services/moviesSevice';
import './MovieCategory.scss'
import { Link } from 'react-router-dom';
const MovieLike = ()=>{
    const account = useSelector(state => state.user.account);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
/// state
    const [movie,setMovie] = useState([]);

// use efect
  
useEffect(()=>{
    getMovieLike();
   
},[])
///

const getMovieLike = async()=>{
    let res = await movieLike(account.access_token);
    console.log(res.data)
    if(res.data && res.data.EC === 0){
        
        let arr = res.data.DT.map(item =>{
            return item.Movie
         })

        setMovie(arr)
        
    }
 }
    const storeMovieId = (item)=>{
        sessionStorage.setItem("movieId", item.id);
    }
    return (
        <div className='movies-class-category'>
        <div className='movies-category'>
            <Link to="#"> Danh sách phim ưa thích </Link>
        </div>
        <div className='movies-list'>
            {movie && movie.length > 0 ? 
                Array.from({length:movie.length > 10 ? 10: movie.length }).map((_,index)=>{
                    return (
                        <Link key={`movie-${index}`} to={`/movie/${movie[index].slug}-tap-1`} className='c-2-5' onClick={()=>storeMovieId(movie[index])} >
                            <div className='movies_img'  >     
                                <img src={require(`../../assets/img_poster/${movie[index].url_img}`)} alt=''  ></img>   
                            </div>
                            <div className='movies_name'>
                                {movie[index].name}
                            </div>
                        </Link>
                    )
                 })
                :
                <>
                    <div>
                        <h3>
                          Danh sách phim yêu thích rỗng
                        </h3>
                    </div>
                </> 
            }
           
        </div>
    </div>
    )
    
}

export default MovieLike;