import { useEffect, useState } from 'react'
import {fetchEps} from '../../../../services/epsService'
import { useParams } from 'react-router-dom';
import { FcPlus } from "react-icons/fc";
import { FaPencilAlt  } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import './ManageEpi.scss'
import ModalEpi from './ModalEpi';
const ManageEpi = (props)=>{
    let { id } = useParams();
    ///
    const [listEpi,setListEpi] = useState([]);
    const [nameMovie,setNameMovie] = useState("");
    /// modal action
        const[show,setShow] = useState(false)
        const [action,setAction] = useState("CREATE");
        const [dataEpi,setDataEpi] = useState();
    //
    useEffect (()=>{
        getEpi();
    },[])
    const getEpi =  async ()=>{
        let res = await fetchEps(id);
        if(res.data && res.data.EC === 0){
            setListEpi(res.data.DT.episode);
            setNameMovie(res.data.DT.name);
        }
    }
    // click edit
    const handleEdit =(item)=>{
        setAction("EDIT");
        setDataEpi(item);
        setShow(true);
    }

    return (
    <div className="manage-epi-container">
        <div className="title">
            Quản lý tập phim
        </div>
        <div className="epi-content">
             <div className="table-epi-container">
                    <div className="table_title"><h3>Danh sách tập phim</h3></div>
                    <div className="acctions">
                        <button className="btn btn-primary" onClick={()=>{setShow(true)}} ><FcPlus/> Thêm tập phim</button>
                    </div>
                   
             </div>

             <div className="epi-list">
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th> STT </th>
                            <th scope="col">Tên phim</th>
                            <th scope="col">Tên tập phim</th>
                            <th scope="col">Tập</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listEpi && listEpi.length > 0 &&
                           <>
                                { listEpi.map((item,index)=>{
                                        return (
                                            <tr key={`row-${index} `}>
                                            <td>{ index + 1}</td>
                                            <td width="30%">{item.Movie.name}</td>
                                            <td width="30%">{item.name}</td>
                                            <td >{item.slug}</td>
                                            <td>
                                                <button className="btn btn-warning me-3"  onClick={()=>{handleEdit(item)}} ><FaPencilAlt/></button>
                                                <button className="btn btn-danger" ><MdDelete/></button>
                                            </td>
                                        </tr>
                                        )
                                })}
                           </>
                        }
                       
                    </tbody>    
                </table>

               
            </div>
           
        </div>

        <ModalEpi getEpi={getEpi}  nameMovie={nameMovie}  show={show} setShow={setShow} action={action} 
            setAction={setAction} dataEpi = {dataEpi} setDataEpi={setDataEpi}
        />
    </div>
    )
}

export default ManageEpi;