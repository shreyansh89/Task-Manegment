const express = require('express');
const router = express.Router();
const Role = require('../models/role');
const User = require("../models/task");

async function createRoles() {
    const adminRole = new Role({
      name: 'Admin',
      permissions: ['create', 'read', 'update', 'delete']
    });
  
    const userRole = new Role({
      name: 'User',
      permissions: ['read', 'update']
    });
  
    await adminRole.save();
    await userRole.save();
  
    console.log('Roles created');
  }
  
  async function createUsers() {
    const adminRole = await Role.findOne({ name: 'Admin' });
    const userRole = await Role.findOne({ name: 'User' });
  
    const adminUser = new User({
      username: 'admin',
      email: 'admin@example.com',
      password: 'adminpassword',
      role: adminRole._id
    });
  
    const regularUser = new User({
      username: 'user',
      email: 'user1@example.com',
      password: 'userpassword',
      role: userRole._id
    });
  
    await adminUser.save();
    await regularUser.save();
  
    console.log('Users created');
  }
  
  createRoles();
  createUsers();
  
  module.exports = router;
