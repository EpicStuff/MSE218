const Concepts = require('../model/Concept'); // Concepts is the collection


// *******************************************************
// ****************** EXPORTED FUNCTION ****************** 
// *******************************************************

// **** INPUT: no input
// **** OUTPUT: no return
const dropDatabase = async () => { 
  try {
    Concepts.collection.drop();
    //return await Concepts.deleteMany({});   
  } catch(err) {
    console.log(err.message);
  }
}

module.exports = dropDatabase;