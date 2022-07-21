const token = localStorage.getItem('token')
const logged = localStorage.getItem('logged')
export const APISettings = {
    token,
    headers: {'headers': {
        'Authorization': 'Bearer '+token,
        'Accept': 'application/json',
    }},
    baseURL: 'http://localhost:8000/api/',
    logged
}