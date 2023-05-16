const colours = {
    blue: "#00bbf9",
    green: "#99d98c",
    purple: "#c77dff",
    red: "#ef233c",
    orange: "#f79d65",
    pink: "#ff7096"
}

const subset = {
    name: 'Function', 
    colour: '', 
    shape: 'set', 
    parent: [], 
    children: [
        {name: 'Root', colour: colours.orange, shape: 'set', parent: 'A', children: []}, 
        {name: 'Rational',  colour: colours.orange, shape: 'set', parent: 'A', children: []}, 
        {name: 'Polynomial',  colour: colours.orange, shape: 'set', parent: 'A', children: [
            {name: 'Linear',  colour: colours.orange, shape: 'set', parent: 'D', children: []}, 
            {name: 'Quadratic',  colour: colours.orange, shape: 'set', parent: 'D', children: []}, 
            {name: 'Cubic',  colour: colours.orange, shape: 'set', parent: 'D', children: []}
        ]}
    ]
};

const constitution = {
    name: 'Atoms', 
    colour: '', 
    shape: 'set', 
    parent: [], 
    children: [
        {name: 'Nucleus', colour: colours.red, shape: 'set', parent: 'A', children: [
            {name: 'Protons', colour: colours.red, shape: 'set', parent: 'A', children: []},
            {name: 'Neurons', colour: colours.red, shape: 'set', parent: 'A', children: []}
        ]}, 
        {name: 'Electrons', colour: colours.red, shape: 'set', parent: 'A', children: []}
    ]
};

const theorem = {
    name: 'Phase Diagrams', 
    colour: '', 
    shape: 'set', 
    parent: [], 
    children: [
        {name: 'Lever Rule', colour: colours.blue, shape: 'set', parent: 'A', children: []}, 
        {name: 'Gibbs Phase Rule', colour: colours.blue, shape: 'set', parent: 'A', children: []}
    ]
};

const derive = {
    name: 'Phase Diagrams', 
    colour: '', 
    shape: 'set', 
    parent: [], 
    children: [
        {name: 'Lever Rule', colour: colours.pink, shape: 'set', parent: 'A', children: []}, 
        {name: 'Gibbs Phase Rule', colour: colours.pink, shape: 'set', parent: 'A', children: []}
    ]
};

const characterize = {
    name: 'Person', 
    colour: '', 
    shape: 'set', 
    parent: [], 
    children: [
        {name: 'Eye Colour', colour: colours.purple, shape: 'aset', parent: 'A', children: [
            {name: 'Blue', colour: colours.orange, shape: 'set', parent: 'A', children: []},
            {name: 'Green', colour: colours.orange, shape: 'set', parent: 'A', children: []},
            {name: 'Brown', colour: colours.orange, shape: 'set', parent: 'A', children: []},
            {name: 'Hazel', colour: colours.orange, shape: 'set', parent: 'A', children: []}
        ]}, 
        {name: 'Height', colour: colours.purple, shape: 'aset', parent: 'A', children: []}
    ]
};

const subtopic = {
    name: 'Calculus', 
    colour: '', 
    shape: 'set', 
    parent: [], 
    children: [
       
            {name: 'Integration', colour: colours.green, shape: 'set', parent: 'A', children: [
                {name: 'Reimann Summs', colour: colours.green, shape: 'set', parent: 'A', children: []},
                {name: 'Integrals', colour: colours.green, shape: 'set', parent: 'A', children: []},
                {name: 'Domains of Integration', colour: colours.green, shape: 'set', parent: 'A', children: []},
                {name: 'Techniques of Integration', colour: colours.green, shape: 'set', parent: 'A', children: []}
            ]},
            {name: 'Differentiation', colour: colours.green, shape: 'set', parent: 'A', children: []}
        ], 
        
    
};

export {subset, constitution, theorem, subtopic, characterize, derive};

