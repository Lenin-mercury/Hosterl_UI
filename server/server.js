const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const connectDB = require('../config/db');


app.get('/', (req,res)=> res.send('API running'));
connectDB();
const PORT = process.env.PORT || 5000;

//init middleware
app.use(express.json({extended: false}));
app.use(cookieParser());

// const auth = ;

//define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));



//Port Listening
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
