import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;



const fetchSinToken = (endpoint, data, method = 'GET') => {
    const url = `${baseUrl}/${endpoint}` //LOCCALHOST:4000/api/auth

    if(method === 'GET'){
        return fetch(url);
    }else{
        return fetch(url, {
            method,
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
}

const fetchConToken = (endpoint, data, method = 'GET') => {
    const url = `${baseUrl}/${endpoint}` //LOCCALHOST:4000/api/auth
    const token = localStorage.getItem('token') || '';
   
   

    if(method === 'GET'){
        return fetch(url, {
            method,
            headers: {
                'x-token': token
            }
        });
    }else{
        return fetch(url, {
            method,
            headers:{
               
                // 'Content-Type': 'multipart/form-data',
                'Content-type': 'application/json',
                'x-token': token,
                
            },
            body: JSON.stringify(data)
            
        })
        
    }
}
// Send a POST request
const fetchConAxios = (endpoint, data, method = 'POST') => {
    const url = `${baseUrl}/${endpoint}` //LOCCALHOST:4000/api/auth
    const token = localStorage.getItem('token') || '';
return axios({
    method ,
    url,
    headers:{
               
        // 'Content-Type': 'multipart/form-data',
        // 'Content-type': 'application/json',
        'x-token': token,
        
    },
    data: data
  });

}
export {
    fetchSinToken,
    fetchConToken,
    fetchConAxios
}