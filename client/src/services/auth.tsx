import axios from 'axios';

const signup = (username : string, password : string) =>{
  const timeStamp = new Date();
  return axios.post('/api/auth/signup', {username, password, timeStamp})
  .then(response=>{
    return response.data;
  })
  .catch(err=>{
    return err.response.data; 
  })
}

const login = (username : string, password : string) =>{
  return axios.post('/api/auth/login', {username, password})
  .then(response => {
    return response.data;
  })
  .catch(err =>{
    return err.response.data;
  })
}

const logout = () =>{
  return axios.delete('/api/auth/logout')
  .then(response=>{
    return response.data
  })
  .catch(err => {
    return err.response.data; 
  })
}

export {signup, logout, login};