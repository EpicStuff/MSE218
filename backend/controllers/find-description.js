const Concepts = require('../model/Concept'); // Concepts is the collection


// returns an array of one object, which is the object with the uniqueID of x
const findbyUniqueID = async(x) => {
    try {
        return await Concepts.find({uniqueID: x}); 
    } catch(err) {
        console.log(err)
    }
}

const findDescription = async (uniqueID) => { 
    // PARAM
    //const uniqueID = "function0";

    const node = await findbyUniqueID(uniqueID);

    const description = node[0].description;
    const courses = node[0].courses.split(", ");
    const related = node[0].related.split(", ");

    const to_return = {
        description: description,
        courses: courses,
        related: related
    };
    
    return (
        to_return
    );
}

module.exports = findDescription;