
import { REACT_APP_API_URL } from 'commons/constants'



const callApiHttp = ({ url, method, baseURL, data, params }) =>
    new Promise((resolve, reject) =>
        fetch(REACT_APP_API_URL + url, {
            method,
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((json) =>{
                console.log(`json`, json)
                return  resolve({
                    data: json
                })
            })
    )



export default callApiHttp
