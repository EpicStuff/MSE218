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
    
    /*
    let current = await findNode(uniqueID);          // find the current node

    let ancestors = {}

    let child = await findNode(uniqueID); 
    if (child[0].parent != 0) {
        let parent = await findNode(child[0].parent);
        if (parent[0].parent != 0){
            let grandparent = await findNode(parent[0].parent);

            ancestors.child = {name: child[0].name, colour: child[0].colour, uniqueID: child[0].uniqueID}
            ancestors.parent = {name: parent[0].name, colour: parent[0].colour, uniqueID: parent[0].uniqueID}
            ancestors.grandparent = {name: grandparent[0].name, colour: grandparent[0].colour, uniqueID: grandparent[0].uniqueID}
        }   
    } 

    */
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
    /*
    let ancestors = []
    let child = await findNode(uniqueID); 
    let parent = await findNode(child[0].parent);
    let grandparent = await findNode(parent[0].parent);

    ancestors[0] = {name: child[0].name, colour: child[0].colour, uniqueID: child[0].uniqueID}
    ancestors[1] = {name: parent[0].name, colour: parent[0].colour, uniqueID: parent[0].uniqueID}
    ancestors[2] = {name: grandparent[0].name, colour: grandparent[0].colour, uniqueID: grandparent[0].uniqueID}
    */
    console.log(ancestors)
    
    const results = {
        ancestors: ancestors,
    };
    
    return (
        results
    );
}

module.exports = findAncestors;