import instance from "../until/axiosCustomize"

const fetchEps = (id)=>{
  return instance.get(`/episode/read?id=${id}`)
}
const createEpi = (data)=>{
  return instance.post(`/episode/create`,{...data})
}
const updateEpi = (data)=>{
  return (
    instance.put(`/episode/update`, {...data})
  )
}
export {fetchEps,createEpi,updateEpi}