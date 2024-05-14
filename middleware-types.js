//Application level middleware
/*
bind application level middleware to an instance of the app object by using app. use() and app.method 
*/
import express from 'express';
const app = express();
// A middleware function with no mount path this function is executed every time the app receives a request
app.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
})
//this example show middleware function mounted on the /user/:id path .the function is executed for every request to /user/:id
app.use('/user/:id', (req, res, next) => {
    console.log('Request Type:', req.method);
    next();
}) 
//here is an example of loading a series of middleware function at a mount point, with a mount path.
app.use('/user/:id', (req, res, next) => {
    console.log('ID:', req.params.id);
    next();
},
(req, res, next) => {
    console.log('Name:', req.body.name);
    next();
})
//this example showa a middleware sub stack that handles GET requests to /user/:id
app.get('/user/:id', (req, res, next) => {
    console.log('ID', req.params.id);
    next()
},
(req, res, next) => {
    res.send(req.params.id)
})
//this example shows an array with middleware sub-sacks that handles Get request 
function  logOriginalUrl(req, res, next) {
    console.log(req.originalUrl);
    next()
}
function logMethod(req, res, next) {
    console.log(req.method);
    next()
}

const logStuff = [logOriginalUrl, logMethod]

app.get('/user/:id', logStuff, (req, res, next) => {
    res.send("user Info")
})