import instance from "../until/axiosCustomize"

const fetchEps = (id)=>{
  return instance.get(`/episode/read?id=${id}`)
}
const createEpi = (data)=>{
  return instance.post(`/episode/create`,data)
}
const updateEpi = (data)=>{
  return (
    instance.put(`/episode/update`, {...data})
  )
}
const deleteEpi = (data)=>{
  return instance.delete('/episode/delete', {data:{id:data.id}})
}
export {fetchEps,createEpi,updateEpi,deleteEpi}