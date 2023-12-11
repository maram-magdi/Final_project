let express = require ('express');
let app = express();

let http = require('http');
let server= http.createServer(app);

app.use('/', express.static('public/main'));
app.use('/experience', express.static('public/experience'));

let port = process.env.PORT || 3000;
server.listen(port, () => (
    console.log("Server is listening at localhost:" + port)
));

let io = require('socket.io');
io = new io.Server(server);

// let feetBttnClickStat = false;
let liveData = {
    feetBttnClickStat: false,
    nightBttnClickStat: false,
    day: true,
    areLightsOn: false,
    drinkBttnClickStat: false
};

let nightBttnData = {
    click: false,
    day: true
};

io.on('connection', (socket) => {
    console.log('Client connected: ' + socket.id);

    io.to(socket.id).emit('feetBttnClick', liveData.feetBttnClickStat);
    io.to(socket.id).emit('nightBttnClick', nightBttnData);
    io.to(socket.id).emit('lightBttnClick', liveData.areLightsOn);
    io.to(socket.id).emit('drinkBttnClick', liveData.drinkBttnClickStat);

    // io.emit('feetBttnClick', liveData.feetBttnClickStat);
    // io.emit('nightBttnClick', liveData.day);
    // io.emit('lightBttnClick', liveData.areLightsOn);

    socket.on('feetBttnClick', (data) => {
        console.log("Feet button click: " + data);
        liveData.feetBttnClickStat = data;

        io.emit('feetBttnClick', liveData.feetBttnClickStat);
    });

    socket.on('nightBttnClick', (data) => {
        liveData.nightBttnClickStat = data.click;
        nightBttnData.click = data.click;

        liveData.day = data.day;
        nightBttnData.day = data.dayState;

        io.emit('nightBttnClick', nightBttnData);
    });

    socket.on('lightBttnClick', (data) => {
        liveData.areLightsOn = data;
        console.log(liveData.areLightsOn);
        io.emit('lightBttnClick', liveData.areLightsOn);
    });

    socket.on('drinkBttnClick', (data) => {
        liveData.drinkBttnClickStat = data;
        // console.log("Drink button click " + liveData.drinkBttnClickStat);
        io.emit('drinkBttnClick', liveData.drinkBttnClickStat);
    });

    socket.on('disconnect', () => {
        console.log('Client ' + socket.id + " left");
    });
})