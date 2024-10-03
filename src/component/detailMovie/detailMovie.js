import './detailMovie.scss'
import { fetchMovieById,fetchAllMovies } from '../../services/moviesSevice'
import { fetchCategoryByMovieId } from '../../services/categoryService';
import {fetchMovieComment,createComment} from '../../services/commentService';
import { fetchEps } from '../../services/epsService';
import { useEffect, useState ,useRef} from 'react';
import { Link,useNavigate,useParams } from "react-router-dom";
import './ModalNotifi'
import { useSelector} from 'react-redux';
import ModaNotifi from './ModalNotifi';
import { FaUserSecret } from "react-icons/fa";
import { toast } from 'react-toastify';
const DetailMovie = (props) =>{
    const url = 'http://localhost:8081/video/';
    // user is login
    const account = useSelector(state => state.user.account);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    ///

    const [movie,setMovie] = useState({});
    const [category,setCategory] = useState([]);
    const [epis,setEpis] = useState([])
    const [isEps,setIsEps] = useState(true);
    const [isSimilar,setIsSimilar]= useState(false);
    const [movieSimilar,setMovieSimilar] = useState([]);
    const [video,setVideo] = useState();
    let { slug } = useParams();
    //
    const [content,setContent] = useState("");
    const [listComment,setListCommnet] = useState([]);
    /// state modal
    const [show,setShow] = useState(false);

    let history = useNavigate();

    useEffect(()=>{
        window.scrollTo(0, 0);
        getmovie(); 
        getCategory();
        getEpi();
        getComment();
       if(isAuthenticated !== true){
        setShow(true);
       }
    },[])
    //deafault
    //get movies
    const getmovie = async()=>{
        let id = sessionStorage.getItem("movieId");
        let res = await fetchMovieById(id);
        if(res.data && res.data.EC===0){
            setMovie(res.data.DT);
            document.title = res.data.DT.name;
        }
    }
    //get category
    const getCategory = async ()=>{
        let movieid = sessionStorage.getItem("movieId");
         let res = await fetchCategoryByMovieId(movieid);
         if(res.data && res.data.EC === 0){
            setCategory(res.data.DT);
         }

    }
    //get tập phim
    const getEpi = async ()=>{
        let movieid = sessionStorage.getItem("movieId");
        
        let res = await fetchEps(movieid);
        if(res.data && res.data.EC === 0 && res.data.DT.episode.length > 0){
                setEpis(res.data.DT.episode);
                let arr =   res.data.DT.episode;
                console.log(arr)
                 arr.map((item,index)=>{       
                     if(slug.includes(`tap-${item.slug}`)){
                        setVideo(item.ep_url)
                        }  
               })
                 
        }
        else{
            setVideo("video-homepage.mp4")
        }
      
    }
    // get comment
     const getComment = async()=>{ 
        let movieID = sessionStorage.getItem("movieId");
        let res = await fetchMovieComment(movieID);
        if( res.data && res.data.EC === 0){
            setListCommnet(res.data.DT)
        }
     }
    //lấy danh sach phim tương tự

    const getMovieSimilar = async ()=>{
        let data= []
        if(category && category.length > 0){
            await Promise.all(
                category.map(async (item,index) => {
                    let res = await fetchAllMovies(item.name)
                        if(res.data && res.data.EC === 0){
                            data = [...res.data.DT];
                            return 1;
                        }
                })
            )
           if(data && data.length > 0){
                setMovieSimilar(data);
           }
           console.log(data)
        }
       
    }
    //thay ddoooir  tập phim
    const changeEpi = (item)=>{
            history(`/movie/${movie.slug}-tap-${item.slug}`);
          
            window.location.reload();
    }
   
    //lưu id film
    const storeMovieId = (item)=>{
        sessionStorage.setItem("movieId", item.id);
        history(`/movie/${item.slug}-tap-1`);
        window.location.reload();
    }
    // sử lý video
    const videoRef = useRef();
    const [stop, setStop] = useState(false);

    const handleVideo = () => {
        setStop(!stop);
        if (stop === true) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
    };
    // submit comment
     const submitComment = async()=>{
        let movieId = sessionStorage.getItem("movieId");
        let data ={
            token:account.access_token,
            movieId: movieId,
            content: content
        }
        let res = await createComment(data)
        if(res.data && res.data.EC === 0){
            setContent("");
            toast.success("Đang gửi bình luận");
            getComment();
        }
     }
    return (
        <>
            <div className="movie_conatiner">
                {movie && video &&
                    <>
                        <div className="movie_video" onClick={handleVideo}>
                            <video controls ref={videoRef}>
                                 <source 
                                    src={`${url}${video}`} type='video/mp4'
                                />
                             </video>
                        </div>
                        <div className='movie_infor'>
                            <div className='movie_name'>
                                <h3>{movie.name}</h3>
                            </div>
                            <div className='movie_classify'>
                                <Link className="movie_class_link btn" to="#">T13</Link>
                                {category && category.length > 0 &&
                                    category.map((item,index)=>{
                                      return(
                                        <Link key={`category-${index}`} className='movie_class_link btn' to={`/movie/category/${item.id}`} >{item.name}</Link>
                                      )  
                                    })
                                }
                            </div>
                            <div className='movie_content'>
                                    {movie.description}
                            </div>
                            <div className='detail_container'>
                                   { movie.actor &&
                                     <div className='detail_item'>
                                        <div className='item-tiltle'>Diễn viên:</div>
                                        <div className='item-container'> 
                                            <div className='item-content'>
                                                <Link to="#"> {movie.actor}</Link>
                                            </div>
                                        </div>
                                    </div>
                                   }
                                    <div className='detail_item'>
                                        <div className='item-tiltle'>Thể loại:</div>
                                        <div className='item-container'>
                                            { category && category.length > 0 &&
                                                category.map((item,index)=>{
                                                    return (
                                                        <div key={`category-${index}`} className='item-content'>
                                                            <Link to={`/movie/category/${item.id}`}> {item.name}</Link>
                                                            {index+1 !== category.length && <>,&nbsp;</> }
                                                            
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                   { movie.national &&
                                         <div className='detail_item'>
                                            <div className='item-tiltle'>Quốc Gia:</div>
                                            <div className='item-container'>
                                                <div className='item-content'>
                                                    <Link to="#">{movie.national}</Link>
                                                </div>
                                            </div>
                                        </div>

                                   }
                            </div>
                        </div>
                    </>
                }
           </div> 
           <div className='reponsive-container'>
                <div className='reponsive-tiltle'>
                    <div className={isEps ? "eps-title active" : "eps-title"} onClick={()=>{setIsEps(true);setIsSimilar(false)}}>Các tập</div>
                    <div className={isSimilar ? "simiar-title active" : "simiar-title"} onClick={()=>{setIsEps(false);setIsSimilar(true);getMovieSimilar();}} >Tương tự</div>
                </div>
                <div className='reposive-content'>
                    {epis && epis.length > 0 && isEps &&
                       
                       epis.map((item,index)=>{
                             return(
                                <div key={`tap-${index}`} className={ slug === `${movie.slug}-tap-${item.slug}`? "btn btn-active epi-content" :"btn epi-content"} onClick={()=>changeEpi(item)}>
                                {`Tập ${item.slug}`}
                                </div>
                             )  
                        })             
                    }

                    {
                        movieSimilar && movieSimilar.length > 0 && isSimilar &&
                        <div className='movies-list'>
                            {movieSimilar && movieSimilar.length > 0 && 
                            Array.from({length:movieSimilar.length > 5 ? 5: movieSimilar.length }).map((_,index)=>{
                                    return (
                                    <Link key={`movie-${index}`} to={`/movie/${movieSimilar[index].slug}-tap-1`} className='c-2-5' onClick={()=>storeMovieId(movieSimilar[index])} >
                                        <div className='movies_img'  >     
                                            <img src={require(`../../assets/img_poster/${movieSimilar[index].url_img}`)} alt=''  ></img>   
                                        </div>
                                            <div className='movies_name'>
                                                {movieSimilar[index].name}
                                        </div>
                                    </Link>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
                
           </div>
           <div className='comment-container'>
                <div className='comment-title'><h3>Bình luận</h3></div>
                <div className='comment-box'>
                <div className="col-md-12 user-comment">
                    <label  className="form-label">Bình luận của bạn</label>
                    <textarea id="form-label" name="w3review" value={content}  className='form-control' onChange={(event)=>{setContent(event.target.value)}} placeholder='Để lại bình luận' rows="2" cols="12" ></textarea>
                    <button className='btn btn-primary' onClick={()=>{submitComment()}}>Gửi</button>
                </div>
                <div className='list-comment'>
                    { listComment && listComment.length > 0 &&
                       listComment.map((item,index)=>{
                            return (
                                <div key={`comment-${index}`} className='comment-item'>
                                    <div className='user-name'><FaUserSecret size={'2em'} /><span>{item.User.username}</span></div>
                                    <div className='comment-content'>{item.content}</div>
                                 </div>
                            )
                       })
                    }
                    
                </div>
                </div>
           </div>
           <ModaNotifi show={show} setShow={setShow}/>
        </>
    )
}

export default DetailMovie;