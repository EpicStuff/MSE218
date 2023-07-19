
require('dotenv').config();
const express = require('express');                // express is the framework that makes things very fast and easy. It was installed as the dependancy in the package.json
const app = express();                             // app is a function that express creates, and we can then do things with it
const path = require('path');                      // common core module, which lets us use the path directory
const logger = require('./middleware/logEvents');  // import the file from middleware
const cors = require('cors');                      // listed as a dependancy in the package.json
const roots = require('./routes/root');            // import the routes root file, which stores the route


// CONTROLLER IMPORTS - READING DATABASE ****************************************************************************************
// ******************************************************************************************************************************
const findTree = require("./controllers/find-subtree");                   // generates the subtree given a uniqueID
const findNodeDescription = require("./controllers/find-description");    // finds the description elements given a uniqueID
const findConceptsbyCourses = require("./controllers/find-overlap");      // given a list of courses, finds the concepts they have in common
const findAncestors = require("./controllers/find-ancestors");            // given a uniqueID, finds three levels of ancestors
const searchByKeyword = require("./controllers/search");                  // given a keywords, returns uniqieIDs of nodes which contain that keyword


// CONTROLLER IMPORTS - WRITING TO DATABASE *************************************************************************************
// ******************************************************************************************************************************
const insertNodes = require("./controllers/insert-tree-node");
const dropDatabase = require("./controllers/drop-database");
const insertDataFromCSV = require("./controllers/csv-reading");


// MONGOOSE DATABASE SET UP *****************************************************************************************************
// ******************************************************************************************************************************
const mongoose = require('mongoose');              // mongoose is a framework that lets us interact with mongoDB
const connectDB = require('./config/dbConnect');   // function connectDB is defined in the dbConnect.js file, which just calls the mongoose.connect() function with our database_uri
mongoose.set('strictQuery', true);                 // adding this in cuz it was giving an error without it, not sure what it's for
connectDB();

// FUNCTION TO RUN WHEN ADDING NODES ********************************************************************************************
// ******************************************************************************************************************************

//dropDatabase();
//const csv = "./csv_files/top.csv"
//insertDataFromCSV(csv);


// OTHER SET UP *****************************************************************************************************************
// ******************************************************************************************************************************
const PORT = process.env.PORT || 3500;          // this is the port where our server exists

app.use(logger);         // this imports the logEvents file, where we created a logger for any request that goes through the site
app.use(cors());         // cross origin resource sharing, not sure why we need this, I think for security but it's not set up

app.use(express.urlencoded({extended: false}));                // handle urlencoded data (if form data comes in, we need this)
app.use(express.json());                                       // handle json data
app.use(express.static(path.join(__dirname, './public')));     // used to serve static files (files that should be available to the public)


// ****************************************************************************************
// ********************* HERE IS WHERE THE REQUESTS / RESPONSES GO ************************
// ****************************************************************************************

// **** REQUEST: The keyword that the use inputs
// **** RESPONSE: A list containing an object with the name and uniqueID for each node which contains 
// the keyword in either the name or the description. 
app.get('/search/:keyword', (req, res) => { 
  const input = req.params.keyword;
  return Promise.resolve(1).then((res) => {
      let resp = searchByKeyword(input);
      return resp
    }).then((node) => {
      res.json(node);
    }) 
});

// **** REQUEST: The uniqueID which we want to fetch the description data
// **** RESPONSE: A json object with the definition, related courses, and related concepts, and a flag
// variable which is true if the definition contains LaTeX
app.get('/node/:id', (req, res) => { 
    const input = req.params.id;
    return Promise.resolve(1).then((res) => {
        let resp = findNodeDescription(input);
        return resp
      }).then((node) => {
        res.json(node);
      }) 
});

// **** REQUEST: The uniqueID from the root node of the tree we want to create
// **** RESPONSE: A json object with the tree in the nested format
app.get('/tree/:id', (req, res) => {  
    const input = req.params.id;
    return Promise.resolve(1).then((res) => {
        let resp = findTree(input);
        return resp
      }).then((tree) => {
        res.json(tree);
      })    
});

// **** REQUEST: A string containing course ID's with commas in between (ie 'MSE101,MSE202')
// **** RESPONSE: Returns an array of concepts which include all course codes in the array, currently, just holding the names
app.get('/concept/:courseIDs', (req, res) => { 
    const input = req.params.courseIDs;
    return Promise.resolve(1).then((res) => {
        let resp = findConceptsbyCourses(input);
        return resp
      }).then((node) => {
        res.json(node);
      }) 
});

// **** REQUEST: The uniqueID from the selected node
// **** RESPONSE: An object with one fields (ancestors) which contains a list of the ancestors, 
// each ancestor in the form of an object with {name, colour, uniqueID}
app.get('/grandparent/:id', (req, res) => { 
  const input = req.params.id;
  return Promise.resolve(1).then((res) => {
      let resp = findAncestors(input);
      console.log(resp)
      return resp
    }).then((node) => {
      res.json(node);
    }) 
});

// ****************************************************************************************
// ****************************************************************************************
// ****************************************************************************************
// ****************************************************************************************

// routes
app.use(roots);

mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})


















// PATH is the path on the server, i.e. the page we are working on
// HANDLER is the call back function when we visit this path
//app.METHOD(PATH, HANDLER)


//app.get()  // get data
//app.post() // add data
//app.put() // edit data



//require('dotenv').config();
//const mongoose = require('mongoose');
//const connectDB = require('./config/dbConnect')

//const express = require('express');
//const app = express();
//const path = require('path');
//const {logger} = require('./middleware/logEvents');
//const cors = require('cors');
//const { connect } = require('http2');
//const PORT = process.env.PORT || 3500

//connectDB();

// custom middleware
//app.use(logger);

//var insertRouter = require('./trial/insert-route');
//app.use('/', insertRouter);

// built in middleware
//  handled for all routes
//app.use(express.urlencoded({ extended: false })); // handing form data
//app.use(express.json()); // is json data is submitted
//app.use(express.static(path.join(__dirname, '/public'))); // allows you to find things in the public folder (withouth this css wouldn't link)

// routes
//app.use('/', require('./routes/root'));

/*
app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
*/

/*
// not working?? 
// Cross Origin Resource Sharing
const whitelist = ['https://www.google.ca/'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
*/