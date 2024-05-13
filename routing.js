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