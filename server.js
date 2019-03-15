
const express = require("express");
require("dotenv").config();
const jwt = require("express-jwt"); //validate JWT and set req.user
const jwksRsa = require("jwks-rsa"); //RETRIEVE RSA KEYS from a JSON web key set (JWKS) endpoint
res.setHeader("Content-Security-Policy", "script-src 'self'");
const checkJwt = jwt({
    //dynamically provide a signing key based on the kid in the header
    //and the signing keys provided by the JKWS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true, //cache the signing key
        rateLimit: true,
        jwksRequestsPerMinute: 5, //prevent attackers from requesting more than 5 per minute
        jwksUri: `https://${
            process.env.REACT_APP_AUTH0_DOMAIN
        }/.well-known/jwks.json`     
    }),
    //validate the audience and the issuer
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,

    //this must match the algorithm selected in the AUTH0 dashboard under your app's advanced settings under the 0auth tab
    algorithms: ["RS256"]
});
const app = express();



app.get("/private", checkJwt, function(req, res){
    res.json({
        message: 'osties@live.be'
    });
});

app.listen(3001);
console.log("API server listening on " + process.env.REACT_APP_AUTH0_AUDIENCE);