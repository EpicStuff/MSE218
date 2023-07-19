const Concepts = require('../model/Concept'); // Concepts is the collection


// **** INPUT: A uniqueID x
// **** OUTPUT: An array of one object, which is the object with the uniqueID of x
const findNode = async(x) => {
    try {
        return await Concepts.find({uniqueID: x}); 
    } catch(err) {
        console.log(err)
    }
}


// *******************************************************
// ****************** EXPORTED FUNCTION ****************** 
// *******************************************************

// **** INPUT: string of the uniqueID of the node we're trying to access
// **** OUTPUT: an object with one fields (ancestors) which contains a list of the ancestors, each ancestor in the form of an object with {name, colour, uniqueID}
const findAncestors = async (uniqueID) => { 
   
    let current = await findNode(uniqueID);          // find the current node

    let ancestors = []
    for (let i = 0; i < 3; i++) {
        ancestors.push({name: current[0].name, colour: current[0].colour, uniqueID: current[0].uniqueID});    // push the current node info to the list
        if (current[0].parent != 0) {
            let parent = await findNode(current[0].parent);  // find the parent node of the current node
            current = parent;                                // set current to its parent
        } else {
            break;  
        }
    }

    const results = {
        ancestors: ancestors,
    };
    
    return (
        results
    );
}

module.exports = findAncestors;