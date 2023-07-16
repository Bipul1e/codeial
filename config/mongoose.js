const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kumarbipuldh:bipul54321@cluster0.kyrydl1.mongodb.net/');
const db=mongoose.connection;
db.on('error',console.error.bind(console, 'error connecting to db'));
db.once('open',function(){
    console.log('successfully connect to the data base');
});

module.exports = db;
