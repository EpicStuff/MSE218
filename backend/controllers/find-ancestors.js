const Concepts = require('../model/Concept'); // Concepts is the collection


// returns an array of one object, which is the object with the uniqueID of x
const findNode = async(x) => {
    try {
        return await Concepts.find({uniqueID: x}); 
    } catch(err) {
        console.log(err)
    }
}

const findAncestors = async (uniqueID) => { 
   
    let current = await findNode(uniqueID);

    

    let ancestors = []
    for (let i = 0; i < 3; i++) {
        ancestors.push({name: current[0].name, colour: current[0].colour, uniqueID: current[0].uniqueID});
        if (current[0].parent != 'none') {
            let parent = await findNode(current[0].parent);
            current = parent;
        } else {
            break;  
        }
    }

    console.log(ancestors)

    const to_return = {
        ancestors: ancestors,
    };
    
    return (
        to_return
    );
}

module.exports = findAncestors;