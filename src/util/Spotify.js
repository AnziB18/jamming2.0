let userAccessToken;
const generateRandomString= (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let text = '';
    for (let i = 0; i < length; i++){
        text += possible.charAt(Math.floor(Math.random()*possible.length));
    }
    return text;
}

const Spotify ={
    getAccessToken(){
        if(userAccessToken){
            return userAccessToken;
        };
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if(accessTokenMatch && expiresInMatch){
            userAccessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => userAccessToken = '', expiresIn * 5000);
            window.history.pushState('Access Token', null, '/')
            return userAccessToken
        } else {
            const client_id = 'fa6047bbfec8400b9997ea510df9cc9c';
            const redirect_uri = 'http://localhost:3000/';
            const stateKey = 'spotify_auth_state';
            const state = generateRandomString(16);
            
            localStorage.setItem(stateKey, state);
            const scope = 'user-read-private user-read-email';
            let url = 'https://accounts.spotify.com/authorize';
            url += '?response_type=token';
            url += '&client_id=' + encodeURIComponent(client_id);
            url += '&scope=' + encodeURIComponent(scope);
            url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
            url += '&state=' + encodeURIComponent(state);
            window.location = url;
        }
    }
};
export default Spotify