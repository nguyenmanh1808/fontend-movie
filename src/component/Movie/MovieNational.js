import { useEffect, useState } from 'react';
import {movieNational} from '../../services/moviesSevice';
import './MovieCategory.scss'
import { Link,useParams} from 'react-router-dom';
const MovieNational = ()=>{
    const [movie,setMovie] = useState([]);
    let {national} = useParams();

    useEffect(()=>{
        setMovie("")
        getMovieType();
    },[national])

    const getMovieType = async()=>{
        let res = await movieNational(national);
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
        <div>
        <div className='movies-class-category'>
   <div className='movies-category'>
       <Link to="#"> Danh sách phim {national} </Link>
   </div>
   <div className='movies-list'>
       {movie && movie.length > 0 ? 
           Array.from({length:movie.length > 20 ? 20: movie.length }).map((_,index)=>{
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
                     Admin lười quá chưa cập nhật phim
                   </h3>
               </div>
           </> 
       }
      
   </div>
</div>
   </div>
    )
}

export default MovieNational