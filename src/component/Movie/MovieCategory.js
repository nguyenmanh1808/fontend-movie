import { useEffect, useState } from 'react';
import {fetchCategoryByid} from '../../services/categoryService';
import { Link,useNavigate,useParams } from "react-router-dom";
import './MovieCategory.scss'
const MovieCategory = ()=>{
    const [listMovie,setListMovie] = useState([]);
    const [nameCategory,setNameCategory] = useState("");
    let {id} = useParams();

    const getMovies = async()=>{
        let res = await fetchCategoryByid(id);
        if(res.data && res.data.EC===0){
            setListMovie(res.data.DT.Movies);
            setNameCategory(res.data.DT.name);
        }
    }
    const storeMovieId = (item)=>{
        sessionStorage.setItem("movieId", item.id);
    }
    useEffect(()=>{
        getMovies();
    },[])

    return (
        <div className='movies-class-category'>
        <div className='movies-category'>
            <Link to="#"> {nameCategory} </Link>
        </div>
        <div className='movies-list'>
            {listMovie && listMovie.length > 0 && 
                Array.from({length:listMovie.length > 20 ? 20: listMovie.length }).map((_,index)=>{
                    return (
                        <Link key={`movie-${index}`} to={`/movie/${listMovie[index].slug}-tap-1`} className='c-2-5' onClick={()=>storeMovieId(listMovie[index])} >
                            <div className='movies_img'  >     
                                <img src={require(`../../assets/img_poster/${listMovie[index].url_img}`)} alt=''  ></img>   
                            </div>
                            <div className='movies_name'>
                                {listMovie[index].name}
                            </div>
                        </Link>
                    )
                 })
            }
        </div>
    </div>
    )
}

export default MovieCategory;