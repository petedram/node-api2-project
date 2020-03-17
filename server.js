const express = require('express');
const dbRouter = require('./hubs/db-router.js');
const cors = require('cors');


//add messages-router?


const server = express();

server.use(express.json());

//cors middleware stretch
server.use(cors());

//any requests to this path will be passed to this router
server.use('/api/', dbRouter); //can put in a function that is defined elsewhere.
//mounting this router to the server using this mounth path - the router starts looking after the mount point for remainder of path.


// endpoints

// server.get('/', (req, res) => {
//     res.send('hello world!!!');

//     console.log('server');
// });


module.exports = server; // same as server module created at top.

