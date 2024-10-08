import React, { useEffect, useState } from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { Link } from "react-router-dom";
import {getMovies} from '../../services/moviesSevice'
const SlideShow = () => {
  const [listMovie,setListMovie] = useState([]);

  useEffect(()=>{
    fetchMovie();
  },[])
  const fetchMovie = async()=>{
    let respone =  await getMovies();
    if(respone && respone.data && +respone.data.EC === 0){    
          setListMovie(respone.data.DT);
    }
 }
 const storeMovieId = (item)=>{
  sessionStorage.setItem("movieId", item.id);
}
  return (
    <>
      <Fade>
        { listMovie && listMovie.length > 0 && 
          Array.from({length:listMovie.length > 5 ? 5: listMovie.length }).map((_,index)=> (
            <Link key={`movie-${index}`} to={`/movie/${listMovie[index].slug}-tap-1`}  onClick={()=>storeMovieId(listMovie[index])} >
            <div className='movies_img'  >     
               <img style={{ width: '100%',height:'554px' }} src={require(`../../assets/SlideImage/${listMovie[index].img_thumb}`)} alt=''  ></img>   
             </div> 
         </Link>
         
        ))}
      </Fade>
     
    </>
  )
}

export default SlideShow;