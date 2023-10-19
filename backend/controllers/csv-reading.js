const Concepts = require('../model/Concept'); // Concepts is the collection
const fs = require("fs");
const { parse } = require("csv-parse");
const insert = require('./insert-tree-node');


// **** INPUT: no input
// **** OUTPUT: returns a list of all the objects which are already in the databse. 
const get_database_ids = async () => { 
    try {
        return await Concepts.find({}, {uniqueID: 1, name: 1} );   
    } catch(err) {
        console.log(err)
    }
}

// **** INPUT: the uniqueID for a node
// **** OUTPUT: Seaches the database collection "concepts" to see if the uniqueID is already taken. 
//              Returns true if it was in the databse already.
const in_database = async (uniqueID) => {
    try {
        let flag = await Concepts.exists({uniqueID:  uniqueID});   
        return (flag == null) ? false : true;
    } catch(err) {
        console.log(err)
    }
}

// ================ DATA CHECKING =====================
// Each function checks that the data for that particular field is correct
// They take in the data value from the excel, and return either -1 if the 
// data is not in the correct format, or there's some issue with it. Otherwise
// it casts the value to the correct data type, and returns it

const check_uniqueID = async (uniqueID) => {
    return (isNaN(Number(uniqueID))) ? -1 : Number(uniqueID);
}
const check_parent = async (parent) => {
    return (isNaN(Number(parent))) ? -1 : Number(parent);
}
const check_name = async (n) => {
    return (n == "") ? -1 : n;
}
const check_shape = async (shape) => {
    return (shape == "d") ? shape : (shape == "") ? "r": -1;
}
const check_colour = async (colour) => {
    let colours = "robgvp"
    return (colours.includes(colour)) ? colour : -1;
}
const check_description = async (description) => {
    return (description == "-" || description == "") ? "" : description;
}
const check_LaTeX = async (description) => {
    return (description.includes("$")) ? true : false;
}
const check_courses = async (courses) => {
    const mse_courses = ['MSE238', 'MSE219', 'MSE218', 'MSE217', 'MSE222', 'MAT294', 'MSE244', 'MSE245', 'MSE202']
    if (courses == '') {
        return []  
    }
    let courses_list = courses.trim().split(", ");
    for (let i in courses_list) {
        if (!mse_courses.includes(courses_list[i])) {
            return -1
        }
    }
    return courses_list
}
const check_related = async (related, id_name_dict) => {
    let new_related_list = []
    let related_list = related.split(", ");
    for (let i in related_list) {
        try {
            if (related_list[i] != "") {
                let casted = Number(related_list[i]) 
                let value = id_name_dict[casted];
                new_related_list.push({
                    uniqueID: casted,
                    name: value
                })
            }
        } catch(err) {
            return -1 
        }
    }
    return new_related_list
}
// =======================================================


// **** INPUT: takes in the whole list of data that came from the csv file
// **** OUTPUT: This function outputs two things:
//                1) a dictionary with each uniqueID as the key, with the name as its value
//                2) a list of all the parents in the 
const create_id_name_dict = async (data) => {
    let id_name_dict = {}
    let list_of_parents = []
    for (let i in data) {
        let row = data[i]
        let uniqueID = await check_uniqueID(row[0])
        let name = await check_name(row[1])
        let parent = await check_name(row[2])
        if (uniqueID == -1 || name == -1 || parent == -1) {
            return ("there was an issue in making the dictionary with:", row[0], row[1])
        } else {
            id_name_dict[uniqueID] = name;
            list_of_parents.push(parent)
        }
    }
    return [id_name_dict, list_of_parents];
}


// **** INPUT: takes in the processes csv data (in the form of a nested list), a dictionary of IDs/Names, and a list of all parent nodes
// **** OUTPUT: returns all the data which has been cleaned and processed, and is ready for entry into the database
const loop_through_data = async (data, id_name_dict, list_of_parents) => {
    
    // lists for returning
    let cleaned = []
    let uniqueIDsList = []

    // loop through every row in the data list
    for (let i in data) {
        
        let row = data[i]

        // data checking, each checker has its own function, and it casts it to the right datatype
        // if there is an issue with any of the data, it returns -1
        let uniqueID = await check_uniqueID(row[0])
        let name = await check_name(row[1])
        let parent = await check_parent(row[2])
        let shape = await check_shape(row[3])
        let colour = await check_colour(row[4])
        let description = await check_description(row[5])
        let LaTeX = await check_LaTeX(row[5])
        let courses = await check_courses(row[6])
        let related = await check_related(row[7], id_name_dict)

        // checks if the 
        const flag = await in_database(uniqueID)

        // if it found an issue for any of the data in this row. 
        if (uniqueID == -1 || name == -1 || parent == -1 || colour == -1 || shape == -1 || LaTeX == -1 || description == -1 || courses == -1 || related == -1) {
            console.log("-1 there was an issue with:", row[0], row[1])
            console.log(
                "uniqueID:", uniqueID, 
                "name:", name, 
                "parent:", parent, 
                "colour:", colour, 
                "shape:", shape, 
                "LaTeX:", LaTeX, 
                "courses:", courses, 
                "description:", description, 
                "related:", related)
            return [-1, null]

        // if the the uniqueID was already in the database
        } else if (flag) { 
            console.log("This data is already in the database:", row[0], row[1])
            return [-1, null]

        // otherwise, we're good to go
        } else {
            let leaf = list_of_parents.includes(String(uniqueID)) ? false : true;
            cleaned.push({
                uniqueID: uniqueID, 
                name : name, 
                parent: parent, 
                colour: colour, 
                shape: shape, 
                LaTeX: LaTeX, 
                courses: courses, 
                description: description, 
                related: related,
                leaf: leaf
            })
            uniqueIDsList.push(uniqueID)
        }
    }
    console.log("All data is ready to be pushed into the database")
    return [cleaned, uniqueIDsList]
}

// **** INPUT: the dictionary of all cleaned data, and a list of all the ids
// **** OUTPUT: returns true if there is a parent for every node in the database
const check_if_parent_exists = async (data, ids) => {
    const databaseIDs = await get_database_ids()
    let master_list = ids
    master_list.push(0)
    for (let i in databaseIDs) {
        master_list.push(databaseIDs[i].uniqueID)
    }
    for (let j in data) {
        let parent = data[j].parent;
        
        if (!master_list.includes(parent)) {
            console.log("The parent of this node doesn't exist: ", data[j])
            return false
        }
    }
    return true 
}

// **** INPUT: The string name of the csv file.
// **** OUTPUT: This function processes the file, such that it becomes a nested list of data.
const csvReading = async (csv_file_name) => { 
    return new Promise(function(resolve,reject){
        let data = [] 
        fs.createReadStream(csv_file_name)
            .pipe(parse({ delimiter: ",", from_line: 2 }))
            .on("data", function (row) {
                if (row[0] != '') {
                    data.push(row);
                }
            })
            .on("error", function (error) {
                reject;
            })
            .on("end", function () {
                console.log("finished");
                resolve(data);
            });
    })
}

// *******************************************************
// ****************** EXPORTED FUNCTION ****************** 
// *******************************************************

// **** INPUT: the name of the csv file
// **** OUTPUT: no return
const mainFunction = async (csv_file_name) => {
    
    // process the data
    let data = await csvReading(csv_file_name);
   
    // create a dictionary: keys = uniqueIDs : values = names
    // create a list of all the parents (used to determine if the node is a list)
    let result = await create_id_name_dict(data);
    let id_name_dict = result[0]
    let list_of_parents = result[1]
    

    // loop through data, produce the cleaned results
    // cleaned_data is a list of dictionaries, each containing node data for a node
    // ids is just a list of all the ids of the data
    let results = await loop_through_data(data, id_name_dict, list_of_parents);
    let cleaned_data = results[0]; 
    let ids = results[1];
    console.log(results)

    // if there was an error in the data, it will return -1 
    if (cleaned_data == -1) {

        console.log('Some data was not correctly inputted. Program stopped.')
    } else {
        // check if the parent is in the database, if not, that means there is a node 
        // which doensn't have a parent which means the program stops
        let parent_in_data = await check_if_parent_exists(cleaned_data, ids);
        if (!parent_in_data) {
            console.log("Parent not in database problem. Program Stopped. ")
        } else {
            await insert(cleaned_data);
            console.log("made it throughhhhhhhhhh")
        }
    }
}

module.exports = mainFunction;
