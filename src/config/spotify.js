const SPACE_DELIMITER = "%20"
const SCOPES = ["user-read-email", "user-top-read", "user-read-currently-playing", "user-read-recently-played"]
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER)

export const handleLogin = () =>{
    window.location = `${process.env.SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${process.env.SPOTIFY_CLIENT_ID}&redirect_uri=${process.env.SPOTIFY_REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`
}

