import { useEffect, useState } from 'react';
import {movieType} from '../../services/moviesSevice';
import './MovieCategory.scss'
import { Link,useParams} from 'react-router-dom';
const PhimBo = ()=>{
    const [movie,setMovie] = useState([]);
    let {type} = useParams();

    useEffect(()=>{
        setMovie("")
        getMovieType();
    },[type])

    const getMovieType = async()=>{
        let data;
        if(type === 'phim-le'){
            data = 'single';
        }
        else{
            data = 'series';
        }
        let res = await movieType(data);
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
            <Link to="#">  {type === 'phim-le' ? "Phim lẻ" : "Phim bộ"} </Link>
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

export default PhimBo