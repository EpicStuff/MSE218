
const Concepts = require('../model/Concept'); // Concepts is the collection


// *******************************************************
// ****************** EXPORTED FUNCTION ****************** 
// *******************************************************

// **** INPUT: no input
// **** OUTPUT: no return
const insertNodes = async () => { 
  try {
    const treeNode = await Concepts.insertMany([
      {name: "andiee", uniqueID: "andi-2" }
    ])
    console.log("successfully added node(s) to database")
  } catch(err) {
    console.log(err.message);
  }
}

module.exports = insertNodes;