import axios from './axiosConfig'

export const addUserDetails = async(uid, restrictions, preferences) => {
    var restrictionsStr = encodeURIComponent(JSON.stringify(restrictions));
    var preferencesStr = encodeURIComponent(JSON.stringify(preferences));
    var response = await axios.post(`/user/addDetails?uid='${uid}&restrictions=${restrictionsStr}&restrictions=${preferencesStr}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
        },
    })
    var data = response.json()
    console.log(data)
}

export const getUserDetails = async(uid) => {
    var response = await axios.get(`/user/getDetails?uid='${uid}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
        },
    })
    var data = response.json()
    console.log(data)
}