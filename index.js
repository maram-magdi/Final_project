let express = require ('express');
let app = express();

let http = require('http');
let server= http.createServer(app);

app.use('/', express.static('public/experience'));
// app.use('/experience', express.static('public/experience'));

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

let residents = {
    //user key will be user id
    //value of key is another object - mouse position
    // "socket.id": {
    //     x: 0,
    //     y: 0
    // }
};

// let residentsIn = [];

let eventCounter = 0;
let beforeResidentsCounter = 0;
let residentsCounter = 0;

io.on('connection', (socket) => {
    console.log('Client connected: ' + socket.id);
    residentsCounter++;
    residents[socket.id] = {x: 0, y:0};
    // residentsIn.push(socket.id);
    // console.log(residents);

    console.log(residentsCounter);

    // io.to(socket.id).emit(socket.id);

    // if (counter > 1){
    //     io.to(socket.id).emit('feetBttnClick', liveData.feetBttnClickStat);
    //     io.to(socket.id).emit('nightBttnClick', nightBttnData);
    //     io.to(socket.id).emit('lightBttnClick', liveData.areLightsOn);
    //     io.to(socket.id).emit('drinkBttnClick', liveData.drinkBttnClickStat);
    // };

    // if(residentsCounter != beforeResidentsCounter){
    //     io.emit('residentsLive', residentsCounter);
    //     beforeResidentsCounter = residentsCounter;
    // };

    // if(eventCounter > 0){
        io.to(socket.id).emit('nightBttnDataE', nightBttnData);
        io.to(socket.id).emit('liveDataE', liveData);
    // };

    io.to(socket.id).emit('residentsLive', residents);
    // io.emit('residentJoined', residentsCounter);
    io.emit('residentsIn', residents);



    // io.to(socket.id).emit('nightBttnDataE', nightBttnData);
    // io.to(socket.id).emit('liveDataE', liveData);


    // io.emit('feetBttnClick', liveData.feetBttnClickStat);
    // io.emit('nightBttnClick', liveData.day);
    // io.emit('lightBttnClick', liveData.areLightsOn);

    socket.on('feetBttnClick', (data) => {
        console.log("Feet button click: " + data);
        liveData.feetBttnClickStat = data;
        eventCounter++;

        io.emit('feetBttnClick', liveData.feetBttnClickStat);
    });

    socket.on('nightBttnClick', (data) => {
        liveData.nightBttnClickStat = data.click;
        nightBttnData.click = data.click;

        liveData.day = data.day;
        nightBttnData.day = data.dayState;

        eventCounter++;

        io.emit('nightBttnClick', nightBttnData);
    });

    socket.on('lightBttnClick', (data) => {
        liveData.areLightsOn = data;
        console.log(liveData.areLightsOn);

        eventCounter++;

        io.emit('lightBttnClick', liveData.areLightsOn);
    });

    socket.on('drinkBttnClick', (data) => {
        liveData.drinkBttnClickStat = data;
        // console.log("Drink button click " + liveData.drinkBttnClickStat);

        eventCounter++;

        io.emit('drinkBttnClick', liveData.drinkBttnClickStat);
    });

    socket.on('mousemove', (mousePos) => {
        // console.log(socket.id, mousePos);

        residents[socket.id] = mousePos;

        // console.log(residents);

        io.emit('residentsLive', residents);
    })

    socket.on('disconnect', () => {
        console.log('Client ' + socket.id + " left");
        residentsCounter--;

        delete residents[socket.id];

        // if(residentsCounter != beforeResidentsCounter){
        //     io.emit('residentsLive', residentsCounter);
        //     beforeResidentsCounter = residentsCounter;
        // };
        io.emit('residentsIn', residents);
    });
})