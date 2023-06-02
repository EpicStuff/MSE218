
const Concepts = require('../model/Concept'); // Concepts is the collection

// **** INPUT: A string of a word
// **** OUTPUT: An array of nodes which have x as a substring in their name
const searchInName = async(x) => {
    try {
        return await Concepts.find({name: {$regex: x, $options: 'i'}});   // i means its not case sensitive
    } catch(err) {
        console.log(err)
    }
}

// **** INPUT: A string of a word
// **** OUTPUT: An array of nodes which have x as a substring in their description
const searchInDescription = async(x) => {
    try {
        return await Concepts.find({description: {$regex: x, $options: 'i'}}); 
    } catch(err) {
        console.log(err)
    }
}


// *******************************************************
// ****************** EXPORTED FUNCTION ****************** 
// *******************************************************

// **** INPUT: string of the keyword that the user inputted
// **** OUTPUT: an object with one field (results) which contains an array where each element is the {name, uniqueID} for all nodes that match the search
const searchByKeyword = async (keyword) => { 

    let stripped = keyword.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(' ')
   
    var list = []        
    for (let i = 0; i < stripped.length; i++) {                                // Loop through each word that was in the search
        if (stripped[i] != '') {
            let inName = await searchInName(stripped[i]);                      // Search for the keyword as substring in names field
            let inDescription = await searchInDescription(stripped[i]);        // Search for the keyword as substring in description field
            var list = list.concat(inName, inDescription)                      // any node that is found is added to the list
        } 
    }

    let new_list = []                                                     
    let used = []                                                              // keep track of what uniqueID's have been used

    for (let j = 0; j < list.length; j++) {                                    // This loop is used remove duplicates from the list above
        if (!used.includes(list[j].uniqueID)) {
            new_list.push({name: list[j].name, uniqueID: list[j].uniqueID});   // if it is not in the used list, add it to the new list
            used.push(list[j].uniqueID)                                        // update the used list
        }
    }

    const to_return = {
        results: new_list,
    };
    
    return (
        to_return
    );
}

module.exports = searchByKeyword;