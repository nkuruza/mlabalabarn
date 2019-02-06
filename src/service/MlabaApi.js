import { checkStatus } from "./apiutils";
import { API_SERVER, API_CONFIG } from './properties';

export var MlabaApi = {
    addPlayerApi: async (player) => {
        return fetch(`${API_SERVER}${API_CONFIG.addPlayer}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(player),
        }).then(checkStatus)
            .then(response => { return response.json() })
            .catch(e => console.log(e));
    },
    getLobbyPlayers: async () => {
        return fetch(`${API_SERVER}${API_CONFIG.lobbyPlayers}`)
            .then(checkStatus)
            .then(response => { return response.json() })
            .catch(e => console.log(e));
    },
    challenge: async (challenger, opponent) => {
        return fetch(`${API_SERVER}/lobby/${challenger}/challenge/${opponent}`)
            .then(checkStatus)
            .then(response => { return response.json() })
            .catch(e => console.log(e));
    },
    joinLobby: async (id) => {
        return fetch(`${API_SERVER}/lobby/join/${id}`)
            .then(checkStatus)
            .then(response => { return response })
            .catch(e => console.log(e));
    },
    getPlayerByDevice: async (deviceId) => {
        return fetch(`${API_SERVER}/player/get/by-device/${deviceId}`)
            .then(checkStatus)
            .then(response => { return response.json() })
            .catch(e => console.log(e));
    },
    getChallenges: async (id) => {
        return fetch(`${API_SERVER}/lobby/challenges/${id}`)
            .then(checkStatus)
            .then(response => { return response.json() })
            .catch(e => console.log(e));
    }
}