

const Concepts = require('../model/Concept'); // Concepts is the collection

// **** INPUT: string of the uniqueID of the node we're trying to access
// **** OUTPUT: An array of one object, which is the object with the uniqueID of x
const findbyUniqueID = async(uniqueID) => {
    try {
        return await Concepts.find({uniqueID: uniqueID}); 
    } catch(err) {
        console.log(err)
    }
}


// *******************************************************
// ****************** EXPORTED FUNCTION ****************** 
// *******************************************************


// **** INPUT: string of the uniqueID of the node we're trying to access
// **** OUTPUT: an object with four fields: {description, courses, related, laTex} for the given uniqueID
const findDescription = async (uniqueID) => { 

    const node = await findbyUniqueID(uniqueID);

    const description = node[0].description;
    const courses = node[0].courses;
    const related = node[0].related;
    const LaTeX = node[0].LaTeX;
    const name = node[0].name;
    const id = node[0].uniqueID;
    
    const results = {
        description: description,
        courses: courses,
        related: related,
        LaTeX: LaTeX,
        name: name,
        uniqueID: id
    };
    
    return (
        results
    );
}

module.exports = findDescription;