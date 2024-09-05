const { DataTypes } = require('sequelize');
const sequelize = require("../config/db.config");
const Article = sequelize.define('Article', {
  // id: {
  //   type: DataTypes.INTEGER,
  //   primaryKey: true,
  //   autoIncrement: true,
  // },
  title: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  video: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  audio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gif: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = { Article };