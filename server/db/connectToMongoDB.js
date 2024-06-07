'use strict';
const mongoose = require('mongoose');

const uri = 'mongodb+srv://madhavdhingra11:MgiLDuXzI9tmguJa@cluster0.8snn9ew.mongodb.net/ubuntu-myspace';

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log('Error connecting to MongoDB',err.message);
    }
}

export default connectToMongoDB;

// const {Sequelize, DataTypes} = require('sequelize');
// const config = require("../config");

// const UserModel = require("./models/user.js");
// const TodoModel = require("./models/todo");
// const NoteModel = require("./models/note");
// const FileModel = require("./models/file");

// const opts = {
//     define: {
//         freezeTableName: true
//     }
// }

// const postgresConfig = config.postgres;
// let sequelize = new Sequelize(
//     postgresConfig.database, 
//     postgresConfig.username, 
//     postgresConfig.password, 
//     Object.assign({}, 
//     postgresConfig, 
//     opts
// ));

// const User = UserModel(sequelize, DataTypes);
// const Todo = TodoModel(sequelize, DataTypes);
// const Note = NoteModel(sequelize, DataTypes);
// const File = FileModel(sequelize, DataTypes);

// const dbModels = {
//     sequelize, 
//     Sequelize,
//     User,
//     Todo,
//     Note,
//     File,
// };

// Object.keys(dbModels).forEach(modelName => {
//     if (dbModels[modelName].associate) {
//       dbModels[modelName].associate(dbModels);
//     }
// });
  
  
// module.exports = dbModels;