
const Concepts = require('../model/Concept'); // Concepts is the collection

// **** INPUT: Array with each course code as an item
// **** OUTPUT: an array with all nodes which contain all the courseID's from the input array in their courses field
const findbyOverlap = async(courseIDsArray) => {
    try {
        return await Concepts.find({courses: {$all: courseIDsArray}}); 
    } catch(err) {
        console.log(err)
    }
}

// *******************************************************
// ****************** EXPORTED FUNCTION ****************** 
// *******************************************************

// **** INPUT: String with course codes separated by commas
// **** OUTPUT: an object with one field (concepts) which contain an array of all the names of concepts which are common to the courses in the string
const findConceptsbyCourses = async (courseIDs) => { 

    courseIDsArray = courseIDs.split(",");                 // courseID's are sent via a string with commas in between (ie 'MSE101,MSE202')
 
    const nodes = await findbyOverlap(courseIDsArray);     

    var concepts = []
    for (let i = 0; i < nodes.length; i++) {
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