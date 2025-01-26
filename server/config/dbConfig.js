const mongoose = require('mongoose');
const { dbUri } = require('./envConfig');


(async () => {
    await mongoose.connect(dbUri)
    .then(()=>console.log('Database is online'))
    .catch((err)=>console.log(err))
})();

module.exports = mongoose;