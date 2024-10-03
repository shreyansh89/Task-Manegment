const express = require('express'); 

port = 5000;
const app = express();

const dotenv = require('dotenv');

const db = require('./config/mongoose');


const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');
// const categoryRoutes = require('./routes/user-rol-catego');

dotenv.config();

// const User = require("./models/category");
// const User = require("./models/role");
// const User = require("./models/user");
// const User = require("./models/task");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
// app.use('/api/user', categoryRoutes);


app.listen(port, (err)=>{
  (err) ? console.error("server is not connected") : console.log("server is connect in " + port);
})