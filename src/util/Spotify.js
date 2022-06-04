let accessToken;
const client_Id = 'fa6047bbfec8400b9997ea510df9cc9c';
const redirect_Uri = 'http://localhost:3000/';
;
// const generateRandomString= (length) => {
//     const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let text = '';
//     for (let i = 0; i < length; i++){
//         text += possible.charAt(Math.floor(Math.random()*possible.length));
//     }
//     return text;
// }

const Spotify ={
    getAccessToken(){
        if(accessToken){
            return accessToken;
        };

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 50000);
            window.history.pushState('Access Token', null, '/')
            return accessToken
        } else {
            const accesUrl = `https://accounts.spotify.com/authorize?client_id=${client_Id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_Uri}`;
            window.location = accesUrl;
        }
    },
    async search(term){
        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json'};
        let searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term}`
        try{
            const response = await fetch(searchUrl,{headers: headers});  
            if(response.ok){
                const jsonResponse = await response.json()
                if(!jsonResponse.tracks){
                    return [];
                } else {
                    return jsonResponse.tracks.items.map((track) => 
                        ({id: track.id, name: track.name, uri: track.uri,  artist: track.artists[0].name, album: track.album.name})); // map through an array, get a new array, but inside this new array, we need a object for app.js to handle searchResults
                }
            }
            throw new Error('Request failed');
        } catch(error){
            console.log(error);
        }
    },
    async savePlaylist(playlistName, trackURIs){
        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json'};
        const saveUserIdUrl = `https://api.spotify.com/v1/me`;
        let user_id;
        let playlist_id;    
        const createPlaylistUrl = `https://api.spotify.com/v1/users/${user_id}/${playlistName}`;
        const addPlaylistUrl = `https://api.spotify.com/v1/playlists/${playlist_id}/${trackURIs}`;
        const data = {
            "name": "New Playlist",
            "description": "New playlist description",
            "public": false
          };
        const dataAddPlaylist = {
            "uris": [
                "string"
              ],
              "position": 0
        }
        try{
            const response = await fetch(saveUserIdUrl, {
                                headers: headers
                              });
            if(response.ok){
                const jsonResponse = await response.json()
                if(jsonResponse["display_name"] === null){
                    return console.log('no display name available')
                } else {
                    return user_id = jsonResponse.id
                }
            } throw new Error('Request failed');
        } catch(error) {
            console.log(error);
        }

        try{
            const response = await fetch(createPlaylistUrl, {
                                method: 'POST',
                                body: data,
                                headers: headers
                                })
            if(response.ok){
                const jsonResponse = await response.json();
                return playlist_id = jsonResponse;
            }
        } catch(error){
            console.log(error);
        }
        try{
            const response = await fetch(addPlaylistUrl, {
                                method: 'POST',
                                body: dataAddPlaylist,
                                headers: headers
                                })
            if(response.ok){
                const jsonResponse = await response.json();
                return jsonResponse;
            }
        } catch(error){
            console.log(error);
        }
    }
};
export default Spotify