import axios from './axiosConfig';

var userSignedUp = false;
var userAuthenticated = false;
var uid = '';

export const isUserAuthenticated = () => {
    return userAuthenticated 
}

export const isUserSignedUp = () => {
    return userSignedUp
} 

export const getUID = () => {
    return uid
}

export const signUp = async(credentials) => {
    try {
        var phone = parseInt(credentials.phone)
        var firstname = credentials.firstname
        var lastname = credentials.lastname

        var response = await axios.post(`/user/signup?phone='${phone}&firstname=${firstname}&lastname=${lastname}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            },
        })

        await response
        
        if (response.data.error === false) {
            uid = response.data.messages.uid
            userAuthenticated = true
            userSignedUp = true
        } 
    } catch (err){
        console.log(err)
    }
}

export const logIn = async(phoneNumber) => {
    var response = await fetch(`/user/login?phone='${phoneNumber}`, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
        },
    })
    var data = response.json()
    console.log(data)
}

export const logOut = () => {
    userAuthenticated = false
    userSignedUp = false
}
