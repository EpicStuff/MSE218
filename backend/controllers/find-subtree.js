const Concepts = require('../model/Concept'); // Concepts is the collection

// returns an array of objects who have the parent with uniqueID x
const findbyparent = async(x) => {
    try {
        return await Concepts.find({parent: x});  
    } catch(err) {
        console.log(err)
    }
}

// returns an array of one object, which is the object with the uniqueID of x
const findbyUniqueID = async(x) => {
    try {
        return await Concepts.find({uniqueID: x}); 
    } catch(err) {
        console.log(err)
    }
}

// recursive function which builds the nested subtree object, with the depth set to the max_depth parameter
async function recursion(current_parent, depth, max_depth) {
    if (depth < max_depth) { 
        let childrenList = []
        const data = await findbyparent(current_parent);
        for (var i=0; i<data.length; i++) {
            let newnode = {}
            newnode.name = data[i].name;
            newnode.colour = data[i].colour;
            newnode.shape = data[i].shape;
            newnode.uniqueID = data[i].uniqueID;
            newnode.children = await recursion(newnode.uniqueID, depth+1, max_depth);
            childrenList.push(newnode)
        }
        return childrenList
    } else {
        return []
    }
}

// function creates and returns the "layers" object for the given tree. The current node starts as the root node
// it recursively pushes the uniqueID for each object, while keeping track of the depth and pushing the depth into the list
function layers(curr_node, curr_depth, layer) {
    layer.push({name: curr_node.uniqueID, depth: curr_depth});
    for (var j=0; j<curr_node.children.length; j++) {
        layers(curr_node.children[j], curr_depth+1, layer);
    }
    return layer;
}

// takes in the uniqueID of the node to delete, and the parent of that node, and the root node of the tree
// searches the tree until it finds the parent node of the node to delete
// when it finds the parent, it finds the index matching the child to delete, then uses the splice method to remove that child
function remove_node(curr_node, uniqueID, parent) {
    if (curr_node.uniqueID == parent) {
        let index;
        for (var j=0; j<curr_node.children.length; j++) {
            if (curr_node.children[j].uniqueID == uniqueID) {
                index = j;
            }
        }
        curr_node.children.splice(index, 1)
    } else {
        for (var i=0; i<curr_node.children.length; i++) {
            remove_node(curr_node.children[i], uniqueID, parent)
        }
    }
}

// takes in the nested tree object, and the uniqueID of the node to be deleted
// finds the parent of that object through the database (might want to change this later??)
// calls the function remove_node with that node and its parent
async function remove_node_by_uniqeID(root, uniqueID) {
    const node = await findbyUniqueID(uniqueID);
    const nodes_parent = node[0].parent;
    return remove_node(root, uniqueID, nodes_parent);
}

// takes in the layers object, the depth which we are deleting from, and the nested subtree object
// finds the list of potential suspects to delete from that row and adds their index to a list
// randomly select one from that list, then delete it using the remove_node_by_uniqueID function
// also removes it from the layers object
async function find_node_to_trim(layers, depth, subtree) {
    let to_delete_list = [];
    for (var i=0; i<layers.length; i++) {
        if (layers[i].depth == depth){
            to_delete_list.push(i)
        }
    }
    const random_index = to_delete_list[Math.floor(Math.random() * to_delete_list.length)];
    const uniqueID_to_delete = layers[random_index].name
    layers.splice(random_index, 1)
    await remove_node_by_uniqeID(subtree, uniqueID_to_delete);
}

// this function takes in the subtree object with the max_depth and max_width of our subtree
// starting at the lowest dept, it checks if there are too many nodes in that row, if so, it calls the find_node_to_trim function 
// repeat this deletion until there are the correct number of nodes in that row
// then, it shifts up to row above, and starts deleting parents (which will also delete children, in future, put priority on deleting leaf nodes)
async function trim(subtree, max_depth, max_width) {
    const lay = layers(subtree, 0, []);
    for (var d=max_depth; d>0; d=d-1) {  
        let count = lay.filter(x => x.depth==d).length; // cound the number of nodes in the layer
        while (count > max_width) {
            await find_node_to_trim(lay, d, subtree)
            count = count - 1;
        }
    }
}

// this is the main function that is exported
async function generateSubtree(uniqueID) {
    try {
    // Parameters
    const max_depth = 4;
    const max_width = 10;

    const root = await findbyUniqueID(uniqueID);
    console.log('current root', root);
    const subtree = {
        uniqueID: root[0].uniqueID, 
        name: root[0].name, 
        shape: root[0].shape, 
        colour: root[0].colour, 
        children: []
    }
   
    subtree.children = await recursion(root[0].uniqueID, 0, max_depth);

    await trim(subtree, max_depth, max_width);

    return (
        subtree
    );


    } catch(err){
        console.log('there is an error')
        console.log(err)
    }
}

module.exports = generateSubtree;