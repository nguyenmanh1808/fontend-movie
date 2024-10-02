import './ManageMovies.scss'
import { FcPlus } from "react-icons/fc";
import { FaPencilAlt  } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import { toast } from "react-toastify";
import { getAllMovies ,deleteMovie} from '../../../../services/moviesSevice';
import ModalCreateMovie from './ModalCreateMovie';
import ModaConfirm from './ModalConfirm';
import { useNavigate } from "react-router-dom";
const ManageMovie =(props)=>{
    let history = useNavigate();
    //modal create edit
    const [actionModal,setActionModal] = useState("CREATE");
    const [showModalCreate,setShowModalCreate] = useState(false);
    //modal delete
    const [showModalConfirm,setShowModalConfirm] = useState(false);
    //pagnination
    const [currentPage,setCurrentPgae] = useState(1);
    const [limit,setCurrentLimit] = useState(6);
    const [totalPage,setTotalPage] = useState(0);
    // movie
    const[listMovie,setListMovie] = useState([]);
    const [dataMovie,setDataMovie] = useState("");
    const [dataDelete,setDataDelete] = useState({});
    //useEffectch
    useEffect(()=>{
        fetchMovie();
    },[currentPage])
    // resfesh
    const resfesh= async ()=>{
        await fetchMovie();
     }
    //movie
  
    const handlePageClick = async (event) => {
        setCurrentPgae(event.selected+1);
      };

    //get lits movie
    const fetchMovie = async()=>{
        let respone =  await getAllMovies(currentPage,limit);
        if(respone && respone.data && +respone.data.EC === 0){
             setTotalPage(respone.data.DT.toatalPage)
             setListMovie(respone.data.DT.movie)
             if(respone.data.DT.movie.length === 0){
                 setCurrentPgae(+currentPage-1)
             }
 
            
            
        }
     }
     // handle edit
     const handleEdit = (movie)=>{
        setDataMovie(movie);
        setActionModal("EDIT");
        setShowModalCreate(true)
     }
     // handle delete
     const handleDeleteShowCloes = ()=>{
        setDataDelete({});
        setShowModalConfirm(false);
     }
     const handleDelete = (movie)=>{
            setDataDelete(movie);
            setShowModalConfirm(true);
     }
     const handleDeleteConfirm = async()=>{
        let respone = await deleteMovie(dataDelete);
            if(respone.data && respone.data.EC=== 0){
                toast.success(respone.data.EM);
                await fetchMovie();
                setShowModalConfirm(false);
            }
            else{
                toast.error(respone.data.EM)
                setShowModalConfirm(false);
            }
    }
    /// quản lý tập phim
     const handleEpi =(movie)=>{
        history(`/admin/manage-eps/${movie.id}`)
     }
    return (
        <div className="manage-movie-container">
            <div className="title">
                Quản lý phim
            </div>
            <div className="movie-content">
                 <div className="table-movie-container">
                        <div className="table_title"><h3>Danh sách phim</h3></div>
                        <div className="acctions">
                            <button className="btn btn-primary" onClick={()=>{setShowModalCreate(true)}}><FcPlus/> Add new movies</button>
                        </div>
                 </div>

                 <div className="movie-list">
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th> STT </th>
                                <th scope="col">Id</th>
                                <th scope="col">Tên phim</th>
                                <th scope="col">Loại phim</th>
                                <th scope="col">Quốc gia</th>
                                <th scope="col">Trang thái</th>
                                <th scope="col">Số tập</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listMovie && listMovie.length > 0 &&
                               <>
                                    { listMovie.map((item,index)=>{
                                            return (
                                                <tr key={`row-${index} `}>
                                                <td>{(currentPage-1)*limit + index + 1}</td>
                                                <td>{item.id}</td>
                                                <td width="30%">{item.name}</td>
                                                <td >{item.type=== "series"?"Phim bộ": "Phim lẻ"}</td>
                                                <td>{item.national ? item.national : ""}</td>
                                                <td>{item.status ? item.status : ""}</td>
                                                <td><button className='btn btn-info btn-epi' onClick={()=>handleEpi(item)}  >{item.ep_total ? item.ep_total : ""}</button> </td>
                                                <td>
                                                    <button className="btn btn-warning me-3" onClick={()=>handleEdit(item)} ><FaPencilAlt/></button>
                                                    <button className="btn btn-danger" onClick={()=>handleDelete(item)} ><MdDelete/></button>
                                                </td>
                                            </tr>
                                            )
                                    })}
                               </>
                            }
                           
                        </tbody>    
                    </table>

                    {+totalPage > 0  && 
                        <div className='movie-pagnination'>
                            <ReactPaginate
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={limit}
                            pageCount={totalPage}
                            previousLabel="< previous"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                        />
                        </div>
                    }
                </div>
                <ModalCreateMovie  resfesh={resfesh} show={showModalCreate} setShow={setShowModalCreate}
                    dataMovie={dataMovie} setDataMovie={setDataMovie} actionModal={actionModal} setActionModal={setActionModal}
                />
                <ModaConfirm show={showModalConfirm} handleDeleteShowCloes={handleDeleteShowCloes} 
                    handleDeleteConfirm={handleDeleteConfirm}
                />
            </div>
        </div>
    )
}

export default ManageMovie;