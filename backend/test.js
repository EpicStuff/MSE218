console.log("testing");

const familyData = [
    {name: "andrea", colour: "blue", parent: "marianne"}, 
    {name: "robert", colour: "blue", parent: "marianne"},
    {name: "marianne", colour: "blue", parent: "mormor"},
    {name: "mormor", colour: "blue", parent: "none"},
    {name: "steven", colour: "blue", parent: "mormor"},
    {name: "anna", colour: "blue", parent: "steven"},
    {name: "eric", colour: "blue", parent: "mormor"}
];

const newdata = {
    name: 'mormor',
    colour: 'blue',
    children: []
}

function recursion(data, current_parent, depth, max_depth) {
    if (depth < max_depth) { 
        let childrenList = []
        for (var i=0; i<data.length; i++) {
            if (data[i].parent == current_parent) {
                let newnode = {}
                newnode.name = data[i].name;
                newnode.colour = data[i].colour;
                newnode.children = recursion(data, newnode.name, depth+1, max_depth);
                childrenList.push(newnode)
            } 
            
        }
        return childrenList
    } 
}

let text = "How, are, you, doing, today?";
const myArray = text.split(", ");
console.log(myArray);
//newdata.children = recursion(familyData, 'mormor', 0, 10);
//console.log(newdata);

//console.log(newdata.children[0].children);
//console.log(recursion());
/*
for (i=0; i<familyData.length; i++) {
    console.log(familyData[i].name);
}*/