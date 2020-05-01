const Sequelize = require('sequelize');

const connection = new Sequelize('testDB', 'postgres', '20000926', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false, 

  pool:{
      max:5,
      min:0,
      acquire: 30000,
      idle:10000,
  }
});

const User = connection.define('user',{ // lowercase user is the name of the table in postgres
    username: {
        type: Sequelize.TEXT,
        unique: true,
        allowNull: false },

    age: {
        type:Sequelize.INTEGER
    },
    
    height: {
        type: Sequelize.INTEGER,},
    
   
});

// const Game = connection.define('game',{ // lowercase user is the name of the table in postgres
//     gamesore: Sequelize.INTEGER,
//     datetime: Sequelize.DATE,
    
//     // gender: Sequelize.TEXT,
// })

connection.sync(); // connecting with database and create table in database

// // insert data in table 
User.create({
    username: 'Joe',
    age: 55,
    height: 134,
   
   
});


// retreat data in table 

// connection.sync().then(function(){
// User.findByPk(1).then(function(user){

//    console.log(user.dataValues); 

// });
    
// });


const express = require('express');
const bodyParser = require('body-parser');

// getting schema from User.js
// const userDb = require('./views/User');

// // test db
// db.authenticate()
//     .then(() => console.log('Database Connected.'))
//     .catch(err => console.log ('error'))


const app = express();

// interpreting browser languge to server language 
app.use(bodyParser.urlencoded()); 
app.use(bodyParser.json()); 

app.set('view engine', 'ejs'); 

app.use(express.static(__dirname+'/views')); 


app.get('/index', function(req, res){ res.render('index');});


// all post route below:
app.post('/info', async (req, res) => {
    console.log('information successsful');
    console.log(req.body.name);
    console.log(req.body.age);
    console.log(req.body.height);
try {
    const aobject = new User ({
        name:req.body.name,
        age:req.body.age,
        height:req.body.height,
    
    });// put content in constructor
        await aobject.save(); // passing data to mongoDB
    } catch (error) {
    console.log(error);
}
res.render('success')
});

const PORT = process.env.PORT || 4000


app.listen(PORT,console.log ("server started on port ${PORT}"));
