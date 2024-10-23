const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const TestResult = sequelize.define('TestResult', {
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  color_blind_test: DataTypes.BOOLEAN,
  long_sighted_test: DataTypes.BOOLEAN,
  astigmatism_test: DataTypes.BOOLEAN,
  response_time_test: DataTypes.BOOLEAN,
  physical_test_pass: DataTypes.BOOLEAN,
  traffic_sign_score: DataTypes.INTEGER,
  road_marking_score: DataTypes.INTEGER,
  right_of_way_score: DataTypes.INTEGER,
  theory_test_pass: DataTypes.BOOLEAN,
  practical_test_pass: DataTypes.BOOLEAN,
  license_test_status: DataTypes.STRING,

  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
});

module.exports = TestResult;
