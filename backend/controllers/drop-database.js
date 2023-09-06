const Concepts = require('../model/Concept'); // Concepts is the collection


// *******************************************************
// ****************** EXPORTED FUNCTION ****************** 
// *******************************************************

// **** INPUT: no input
// **** OUTPUT: no return
const dropDatabase = async () => { 
  try {
    Concepts.collection.drop();
    console.log('database dropped successfully')
    //return await Concepts.deleteMany({});   
  } catch(err) {
    console.log(err.message);
  }
}

module.exports = dropDatabase;