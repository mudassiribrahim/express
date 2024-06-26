/*
MiddleWares:
Middlewares are functions that are executed between the request and the response. They can be used to add functionality to your express application.
*/
import express from 'express';
const app = express();

//Auth middleWare function 
const auth = function (req, res, next) {
    console.log('Auth');
    next();
}
app.use(auth);

app.get('/', (req, res) => {    
    res.send('Hello World');
});

// middleWare function for request time
const time = function (req, res, next) {
    req.requestTime = Date.now();
    next();
}
app.use(time);

app.get('/', (req, res) =>{
let responseText = 'hello world';
responseText += `request time: ${req.requestTime}`;
res.send(responseText);
})
// middleWare function validateCookies 
async function validateCookies(req, res, next) {
    try {
        if (req.cookies.validate === 'true') {
            next();
        } else {
            res.send('Cookie validation failed');
        }
    } catch (error) {
        next(error);
    }
}
app.use(validateCookies);
