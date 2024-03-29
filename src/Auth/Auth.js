import auth0 from "auth0-js";

export default class Auth {
    constructor(history){
        this.history = history;
        this.userProfile = null;
        this.requestedScopes = "openid profile email read:apname";
        this.auth0 = new auth0.WebAuth({
            domain: process.env.REACT_APP_AUTH0_DOMAIN,
            clientID: "m5x45ygQQ6lguvZJBkrh5Lk9ZhUzjICg",
            redirectUri: "https://reactauth0.netlify.com/callback",
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            responseType: "code token id_token",
            scope: this.requestedScopes
        });
    }

    login = () => {
        this.auth0.authorize();
    };

    handleAuthentication = () => {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken){
                this.setSession(authResult);
                this.history.push("/");
            } else if (err){
                this.history.push("/");
                alert (`Error: ${err.error}. Check the console for further details.`);
                console.log(err);
            }
        });
    };

    setSession = authResult => {
        //set the time the access token wil expire
        const expiresAt = JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime()
        );
        //if there is a value on the scope param from the authresult
        //use it to set scopes in the session for the user. Otherwise
        //use the scopes as requested. If no scopes were requested
        //set it to nothing
        const scopes = authResult.scope || this.requestedScopes || "";
    
        localStorage.setItem("access_token", authResult.accessToken);
        localStorage.setItem("id_token", authResult.idToken);
        localStorage.setItem("expires_at", expiresAt); 
        localStorage.setItem("scopes", JSON.stringify(scopes));
    };

    isAuthenticated(){
        const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
        return new Date().getTime() < expiresAt;
    }

    logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at"); 
        localStorage.removeItem("scopes");
        this.userProfile = null;
        this.auth0.logout({
            clientID: "m5x45ygQQ6lguvZJBkrh5Lk9ZhUzjICg",
            returnTo: "https://reactauth0.netlify.com"
        });
    };

    getAccessToken = () => {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken){
            throw new Error("No acces token found.");
        }
        return accessToken;
    };

    getProfile = cb => {
        if(this.userProfile) return cb(this.userProfile);
        this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
            if (profile) this.userProfile = profile;
            cb(profile, err);
        });
    };

    userHasScopes(scopes){
        const grantedScopes = (
            JSON.parse(localStorage.getItem("scopes")) || ""
        ).split(" ");
        return scopes.every(scope => grantedScopes.includes(scope));
    }
}