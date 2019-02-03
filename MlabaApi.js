import { checkStatus } from "./apiutils";

//import checkStatus from './apiutils';

export var addPlayerApi = player =>{
    return fetch("http://10.0.2.2:8080/player/add", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(player),
    }).then(checkStatus)
    .then(response => {return response.json()})
    .catch(e => console.log(e));
}