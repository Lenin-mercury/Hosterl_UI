//====== Local MongoDb Connect================================

const mongoose = require('mongoose');

require('dotenv').config();
const db = process.env.DATABASE;
mongoose.Promise = global.Promise;

const connectDB = async () =>{
    try {
    await mongoose.connect(db, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    });
    console.log('Local MongoDB connected...');
    } catch (e) {
        console.error(e.message);
        process.exit(1);
    }
}
module.exports = connectDB;



//================Atlas db connect================================

// const mongoose = require('mongoose');
// const config = require('config');

// const db = config.get('mongoURI');


// const connectDB = async () =>{
//     try {
//     await mongoose.connect(db, {
//         useNewUrlParser:true,
//         useUnifiedTopology:true
//     });
//     console.log('Atlas MongoDB connected...');
//     } catch (e) {
//         console.error(e.message);
//         process.exit(1);
//     }
// }

// module.exports = connectDB;

//========================================================================