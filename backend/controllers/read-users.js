const mongoose = require('mongoose');
const User = require('../model/User');


//const findUser = async (req, res) => {
    //const {user, pswd} = req.body;
    //const currentuser = await User.find({username: user}).exec();

    //console.log(currentuser);
//};

const run = async () => {
    try {
    const selected = await User.find({number: 3});
    //console.log(selected);
    //console.log(selected.length);
    //console.log(selected[0]);
    for (i=0; i<selected.length; i++) {
        console.log(selected[i].username);
    }

    
    } catch(err){
        console.log('there is an error')
        console.log(err)
    }
}

module.exports = run;