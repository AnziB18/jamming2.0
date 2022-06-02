let userAccessToken;
const client_id = 'fa6047bbfec8400b9997ea510df9cc9c';
const redirect_uri = 'http://localhost:3000/';
let searchUrl = 'https://api.spotify.com/v1/search?';
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
            const stateKey = 'spotify_auth_state';
            const state = generateRandomString(16);
            
            localStorage.setItem(stateKey, state);
            const scope = 'user-read-private user-read-email';
            let accesUrl = 'https://accounts.spotify.com/authorize';
            accesUrl += '?response_type=token';
            accesUrl += '&client_id=' + encodeURIComponent(client_id);
            accesUrl += '&scope=' + encodeURIComponent(scope);
            accesUrl += '&redirect_uri=' + encodeURIComponent(redirect_uri);
            accesUrl += '&state=' + encodeURIComponent(state);
            window.location = accesUrl;
        }
    },
    async search(term){
        const type = 'type=track';
        const externAudio = '&include_external=audio';
        const q = '&q=TERM';
        const limit ='&10';
        searchUrl += `${type}${externAudio}${limit}${q}`;
        
        try{
            const accessToken = Spotify.getAccessToken();
            const headers = {Authorization: `Bearer ${accessToken}`};
            const response = await fetch(searchUrl,headers);
            if(response.ok){
                const jsonResponse = await response.json()
                if(!jsonResponse.tracks){
                    return [];
                } else {
                return jsonResponse.tracks.item.map(track => ({name: track.name, uri: track.uri, id: track.id, artist: track.artists[0].name, album: track.ablum.name} ) ) // map through an array, get a new array, but inside this new array, we need a object for app.js to handle searchResults
                }
            }
            throw new Error('Request failed');
        } catch(error){
            console.log(error);
        }
    }
};
export default Spotify