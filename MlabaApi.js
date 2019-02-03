import { checkStatus } from "./apiutils";

//import checkStatus from './apiutils';

// TODO group these functions into one variable.

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
export var getLobbyPlayers = () => {
    return fetch("http://10.0.2.2:8080/lobby/players")
        .then(checkStatus)
        .then(response => {return response.json()})
        .catch(e => console.log(e));
}