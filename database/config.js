const mongoose = require('mongoose');
const dbConnection = async () => {
    try {
        mongoose.set('strictQuery', true);
        mongoose.connect(process.env.DATABASE_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB Online!');
    } catch (error) {
        throw new Error('error in database', error);
    }
};

module.exports = {
    dbConnection
};
