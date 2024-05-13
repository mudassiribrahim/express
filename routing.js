/*
Routing refers to how an application's request-response cycle is constructed.
In the other words, the application listen for request that match the specified routes and method and when 
it detects a match IT call the corresponding handler function.
*/

import express from 'express';
//basic route

const app = express();
// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
    res.send('Hello World');
});

/*
Route Methods:
A route methods is derived from one of the HTTP methods and is attached to an instance of the express class
*/
// Get method route 
app.get('/about', (req, res) => {
    res.send('About Page');
});
// Post method route
app.post('/contact', (req, res) => {
    res.send('Contact Page');
});

// Express supports methods that correspond all HTTP methods.
app.all('/info',(req,res,next)=>{
    console.log('access all info')
    next() //pass control tho next handler
})

/*
Route Parameters:
Route parameters are named URL segments that are used to capture the values specified at their position in the URL.

Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
*/

//Route handlers:
/*
You can provide multiple callback functions that behave like middleware to handle a request. The only
exception is that these callbacks might invoke next('route') to bypass the remaining route callbacks. 
*/
//multiple handler functions
const cb0 = function (req, res, next) {
    console.log('CB0')
    next()
  }
  
  const cb1 = function (req, res, next) {
    console.log('CB1')
    next()
  }
  
  const cb2 = function (req, res) {
    res.send('Hello from C!')
  }
  
  app.get('/example/c', [cb0, cb1, cb2])
//A combination of independent functions and arrays of functions can handle a route. For example:
  const cb01 = function (req, res, next) {
    console.log('CB0')
    next()
  }
  
  const cb11 = function (req, res, next) {
    console.log('CB1')
    next()
  }
  
  app.get('/example/d', [cb01, cb11], (req, res, next) => {
    console.log('the response will be sent by the next function ...')
    next()
  }, (req, res) => {
    res.send('Hello from D!')
  })