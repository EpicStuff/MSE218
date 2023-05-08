const Concepts = require('../model/Concept'); // Concepts is the collection


// returns an array of one object, which is the object with the uniqueID of x
const findbyOverlap = async(x) => {
    try {
        return await Concepts.find({courses: {$all: x}}); 
    } catch(err) {
        console.log(err)
    }
}

const findConceptsbyCourses = async (courseIDs) => { 
    // PARAM
    //const uniqueID = "function0"; 
    courseIDsArray = courseIDs.split(",");
    console.log(courseIDs)
    const nodes = await findbyOverlap(courseIDsArray);
    console.log(nodes)

    var concepts = []
    for (let i = 0; i < nodes.length; i++) {
        console.log(concepts)
        console.log(nodes[i].name)
        concepts.push(nodes[i].name);
    }

    const to_return = {
        concepts: concepts,
    };
    
    return (
        to_return
    );
}

module.exports = findConceptsbyCourses;