import axios from 'axios' 

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001"

/** API Class. Static class tying together methods used to get/send to the API. */

class SailMasterIIApi {
    // token to interact with API is stored here
    static token 

    static async request(endpoint, data = {}, method = "get") {
        const url = `${BASE_URL}/${endpoint}`
        const headers = { Authorization: `Bearer ${SailMasterIIApi.token}`}
        const params = method === "get" ? data : {} 

        try {
            return (await axios({ url, method, data, params, headers })).data;

        } catch(err) {
            console.log('err', err)
            let message = err.response.data.error.message 
            throw Array.isArray(message) ? message : [message] 
        }
    }

    // Individual API routes

    /** Get all clubs and single club filtered by id. */
    static async getClubs() {
        let res = await this.request('clubs')
        return res.club
    }

    static async getClub(id) {
        let res = await this.request(`clubs/${id}`)
        return res.club 
    }

    /** Get all voyages and single voyage filtered by id. */
    static async getVoyages() {
        let res = await this.request('voyage')
        return res.voyage
    }

    static async getVoyage(id) {
        let res = await this.request(`voyage/${id}`)
        return res.voyage 
    }

    /** Post new voyage to database */
    static async newVoyage(data) {
        await this.request(`voyage/new`, data, "post")
    }

    /** Delete voyage from database */
    static async removeVoyage(id) {
        let res = await this.request(`voyage/${id}/delete`, {}, "delete") 
        return res.voyage
    }

    /** Patch voyage and save to database */
    static async editVoyage(id, data) {
        let res = await this.request(`voyage/${id}/edit`, data, "patch")
        return res.voyage 
    }

    /** Get current user */
    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`) 
        return res.user 
    }

    /** Patch current user */
    static async saveProfile(username, data) {
        let res = await this.request(`users/${username}`, data, "patch")
        return res.user
    }

    /** Post signup with username, password, firstName, lastName, email */
    static async signup(data) {
        try {
            let res = await this.request(`auth/register`, data, "post")
            return res.token
        } catch(err) {
            console.error('Error registering', err)
        }
    }

    /** Post login from username/password and get "token" back */
    static async login(data) {
        let res = await this.request(`auth/token`, data, "post")
        return res.token 
    }
 
}

export default SailMasterIIApi 