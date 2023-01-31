const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const path = require('node:path');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
require('./config/mongoose.config');
require('./routes/movie.routes')(app);
    
app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

app.listen(process.env.PORT || port, () => console.log(`Listening on port: ${port}`) );