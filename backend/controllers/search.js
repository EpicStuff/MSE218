const Concepts = require('../model/Concept'); // Concepts is the collection


// returns an array of nodes which have x as a substring in their name
const searchInName = async(x) => {
    try {
        return await Concepts.find({name: {$regex: x, $options: 'i'}}); 
    } catch(err) {
        console.log(err)
    }
}
// returns an array of nodes which have x as a substring in their description
const searchInDescription = async(x) => {
    try {
        return await Concepts.find({description: {$regex: x, $options: 'i'}}); 
    } catch(err) {
        console.log(err)
    }
}

const searchByKeyword = async (keyword) => { 


    let stripped = keyword.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(' ')
   

    console.log(stripped)
    var list = []

    for (let i = 0; i < stripped.length; i++) { 
        if (stripped[i] != '') {
            
            let inName = await searchInName(stripped[i]);
            let inDescription = await searchInDescription(stripped[i]);
            var list = list.concat(inName, inDescription)
        } 
    }

    console.log(list)

    let new_list = []
    let used = [] // keep track of what uniqueID's have been used

    // remove duplicates
    for (let j = 0; j < list.length; j++) {
        if (!used.includes(list[j].uniqueID)) {
            new_list.push({name: list[j].name, uniqueID: list[j].uniqueID});
            used.push(list[j].uniqueID)
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