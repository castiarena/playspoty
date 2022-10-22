const BASE_API_URL = 'https://api.spotify.com/v1'

const AUTH_URL = 'https://accounts.spotify.com/api/token'
const CLIENT_ID = 'b7d42e878d06477fb9d46f43efb5ef62'
const CLIENT_SECRET = '209d07f9c6b5487a83b04476fb981145'
const CLEINT_ID_AND_SECRET = `${CLIENT_ID}:${CLIENT_SECRET}`


let auth = false;

// define api
export const api = () => {

    return {
        auth: () => fetch(AUTH_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${btoa(CLEINT_ID_AND_SECRET)}`,
                'Content-Type':'application/x-www-form-urlencoded'

              },
              body: `grant_type=authorization_code&redirect_uri=${window.location.origin}/login`
        })
    }
}
