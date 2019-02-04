import { checkStatus } from "./apiutils";

// TODO group these functions into one variable.

export var addPlayerApi = async(player) => {
    return fetch("http://10.0.2.2:8080/player/add", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(player),
    }).then(checkStatus)
        .then(response => { return response.json() })
        .catch(e => console.log(e));
}
export var getLobbyPlayers = async() => {
    return fetch("http://10.0.2.2:8080/lobby/players")
        .then(checkStatus)
        .then(response => { return response.json() })
        .catch(e => console.log(e));
}

export var joinLobby = async (id) => {
    console.log(id + ' joining lobby')
    return fetch(`http://10.0.2.2:8080/lobby/join/${id}`)
        .then(checkStatus)
        .then(response => { return response.json() })
        .catch(e => console.log(e));
}

export var getPlayerByDevice = async (deviceId) => {
    return fetch(`http://10.0.2.2:8080/player/get/by-device/${deviceId}`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(checkStatus)
        .then(response => { return response.json() })
        .catch(e => console.log(e));
}
export var challenge = async (challenger, opponent) => {
    return fetch(`http://10.0.2.2:8080/lobby/${challenger}/challenge/${opponent}`)
        .then(checkStatus)
        .then(response => { return response.json() })
        .catch(e => console.log(e));
}
