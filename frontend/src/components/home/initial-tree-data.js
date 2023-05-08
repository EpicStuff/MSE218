

const colour_dict = {
    "blue": "#00bbf9",
    "green": "#99d98c",
    "purple": "#c77dff",
    "red": "#ef233c",
    "orange": "#f79d65",
    "pink": "#ff7096"
}

const thedata = {
    "uniqueID": "function0",
    "name": "function",
    "shape": "set",
    "colour": "red",
    "children": [
        {
            "name": "polynomial",
            "colour": "#fae588",
            "shape": "set",
            "uniqueID": "polynomial0",
            "children": [
                {
                    "name": "linear function",
                    "colour": "#99d98c",
                    "shape": "set",
                    "uniqueID": "linfunction0",
                    "children": []
                }
            ]
        },
        {
            "name": "rational",
            "colour": "#00bbf9",
            "shape": "set",
            "uniqueID": "rational0",
            "children": [
                {
                    "name": "concept A1",
                    "colour": "#cfbaf0",
                    "shape": "set",
                    "uniqueID": "concepta1",
                    "children": [
                        {
                            "name": "Writing a longer Concept to see",
                            "colour": "#ffbf69",
                            "shape": "set",
                            "uniqueID": "conceptb1",
                            "children": [
                                {
                                    "name": "concept C1",
                                    "colour": "#f79d65",
                                    "shape": "aset",
                                    "uniqueID": "conceptc1",
                                    "children": []
                                },
                                {
                                    "name": "concept C2",
                                    "colour": "#f79d65",
                                    "shape": "else",
                                    "uniqueID": "conceptc2",
                                    "children": []
                                }
                            ]
                        },
                        {
                            "name": "concept B2",
                            "colour": "#ef233c",
                            "shape": "set",
                            "uniqueID": "conceptb2",
                            "children": []
                        },
                        {
                            "name": "concept B3",
                            "colour": "#ff7096",
                            "shape": "set",
                            "uniqueID": "conceptb3",
                            "children": []
                        }
                    ]
                },
                {
                    "name": "concept A2",
                    "colour": colour_dict.blue,
                    "shape": "aset",
                    "uniqueID": "concepta2",
                    "children": []
                },
                {
                    "name": "concept A3",
                    "colour": colour_dict.red,
                    "shape": "set",
                    "uniqueID": "concepta3",
                    "children": []
                }
            ]
        }
    ]
  };


export {thedata, colour_dict};