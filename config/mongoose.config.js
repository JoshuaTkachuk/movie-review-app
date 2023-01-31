const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('established a connection to the databse'))
    .catch(err => console.log('something went wrong' , err))