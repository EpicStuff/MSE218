const mongoose = require('mongoose');
const Node = require('../model/tree');

mongoose.connect('mongodb+srv://andreamitchell:msedatabase@cluster0.j92oqib.mongodb.net/?retryWrites=true&w=majority');
 

async function run() {
  try {
    const treeNode = await Node.create({  // updateOne instead of create to update instead of creating new data
      name: "1A", 
      parent: "some parent"
    })
    console.log(treeNode);
  } catch(err) {
    console.log(err.message);
  }
}

run()