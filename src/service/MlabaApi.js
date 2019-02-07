import { checkStatus } from "../utils/apiutils";
import { API_SERVER, API_CONFIG } from '../properties';

export var MlabaApi = {
    addPlayerApi: async (player) => {

        return fetch(`${API_SERVER}${API_CONFIG.addPlayer}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(player),
        }).then(checkStatus)
            .then(response => { return response.json() })
            .catch(e => console.log(e));
    },
    move: async (gameid, move) => {
        return fetch(`${API_SERVER}/game/move/${gameid}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(move),
        }).then(checkStatus)
            .then(response => { return response.json() })
            .catch(e => console.log(e));
    },
    getLastMove: async (gameid) => {
        return fetch(`${API_SERVER}/game/getLastMove/${gameid}`)
            .then(checkStatus)
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
    accept: async (player, challenge) => {
        return fetch(`${API_SERVER}/lobby/${player}/accept/${challenge}`)
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
    },
    getPlayerGame: async (id) => {
        return fetch(`${API_SERVER}/game/getPlayerGame/${id}`)
            .then(checkStatus)
            .then(response => { return response.json() })
            .catch(e => console.log(e));
    },
    setWinner: async (gameId, playerId) => {
        return fetch(`${API_SERVER}/game/${id}/setWinner/${playerId}`)
        .then(checkStatus)
        .then(response => { return response.json() })
        .catch(e => console.log(e));
    }
}