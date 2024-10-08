import { useEffect, useState } from 'react';
import {  useSearchParams ,Link} from "react-router-dom";
import {getMovieSearch} from '../../services/moviesSevice';
import './MovieCategory.scss'
const MovieSearch = ()=>{
    const [searchParams] = useSearchParams();
    let inputValue = searchParams.get('q');
/// state
    const[result,setResult] = useState();

// use efect
  
useEffect(()=>{
    setResult("");
    getResult();
},[inputValue])
///

    const getResult = async()=>{
        let res =  await getMovieSearch(inputValue);
        if(res.data && res.data.EC === 0){
            setResult(res.data.DT)
            console.log(res.data.DT)
         }
    }
    const storeMovieId = (item)=>{
        sessionStorage.setItem("movieId", item.id);
    }
    return (
        <div className='movies-class-category'>
        <div className='movies-category'>
            <Link to="#"> Kết quả tìm kiếm cho "<span >{inputValue}</span>" </Link>
        </div>
        <div className='movies-list'>
            {result && result.length > 0 ? 
                Array.from({length:result.length > 10 ? 10: result.length }).map((_,index)=>{
                    return (
                        <Link key={`movie-${index}`} to={`/movie/${result[index].slug}-tap-1`} className='c-2-5' onClick={()=>storeMovieId(result[index])} >
                            <div className='movies_img'  >     
                                <img src={require(`../../assets/img_poster/${result[index].url_img}`)} alt=''  ></img>   
                            </div>
                            <div className='movies_name'>
                                {result[index].name}
                            </div>
                        </Link>
                    )
                 })
                :
                <>
                    <div>
                        <h3>
                            Không tìm thấy kết quả phù hợp
                        </h3>
                    </div>
                </> 
            }
           
        </div>
    </div>
    )
    
}

export default MovieSearch;