// let socket = io();

let drinkBttn = document.getElementById('drink');
let wantToDrink = false;
let mug1 = document.getElementById('mug1');

let moveOutBttn = document.getElementById('move-out');

let feetBttn = document.getElementById('feet');
// let feetBttnClickStat = false;
let feetDownImg = document.getElementById('feet-down-img');
let feetUpImg = document.getElementById('feet-up-img');
let feetDown = false;

let tableImg = document.getElementById('table-img');
let sceneImg = document.getElementById('scene-img');

let nightBttnClickStat = false;
let nightBttn = document.getElementById('night-button');
let dayBttn = document.getElementById('day-button');
let day = true;
let areLightsOn = false;
let lightsBttn = document.getElementById('lights-button');

let tableTalksSec = document.getElementById('table-talks');
let chatsSect = document.getElementById('chats-sect');

let manual = document.getElementById('manual');

let counter = 0;


window.addEventListener('load', (event) => {
    
    console.log('Page loaded!');

    let socket = io();


    socket.on('connect', () => {
        console.log('client connected!');
    
        // counter++;
        // console.log(counter);
    
        // socket.on('disconnect', () => {
        //     counter--;
        //     console.log(counter);
        // })

        manual.style.visibility = "visible";
        let img = document.createElement('img');
        img.src = "media/manual.jpg";
        img.classList.add('manual-img');
        let close = document.createElement('img');
        close.src = "media/close.png";
        close.classList.add('close-img');
        manual.appendChild(img);
        manual.appendChild(close);

        close.addEventListener('click', () => {
            manual.style.visibility = "hidden";
            img.style.visibility = "hidden";
            close.style.visibility = "hidden";
        });

    });

    
    
    

    ////////////////////// feet feature ///////////////////////////////////

    //when feet button is clicked
    feetBttn.addEventListener('click', () => {
        // console.log("feetBttn clicked!");
        // let feetBttnClick = true;

        socket.emit('feetBttnClick', feetDown);
        // feetBttnClickStat = true;
    });

    //receiving live info about feet button
    socket.on('feetBttnClick', (data) => {
        // console.log(data);
        feetDown = data;
        if (feetDown == true){
            // feetBttnClickStat = true;
            // console.log(feetBttnClickStat);
            feetDown = false;
            feetDownImg.style.visibility = "hidden";
            feetUpImg.style.visibility = "visible";
            feetBttn.innerHTML = "Remove feet from table"
            let message = document.createElement('p');
            message.innerHTML = "HEY! I am made of harmful substances that may lead to cancer, so please handle me with CARE!";
            chatsSect.appendChild(message);
            message.classList.add('messages');
        } else {
            feetDown = true;
            feetDownImg.style.visibility = "visible";
            feetUpImg.style.visibility = "hidden";
            feetBttn.innerHTML = "Rest feet on table"
            let message = document.createElement('p');
            message.innerHTML = "Thank you!";
            chatsSect.appendChild(message);
            message.classList.add('messages');
        };
        // if(feetBttnClickStat == true){
            
        // };
    });


    ///////////////////// table image button ///////////////////////////////
    tableImg.addEventListener('click', () => {
        console.log("table is clicked!");
    })


    ///////////////////// day & night feature /////////////////////////////

    function turnOnLights() {
        socket.emit('lightBttnClick', areLightsOn);
    }

    // function turnOffLights() {
    //     sceneImg.src="media/night_scene.png";
    // }


    //when night button is clicked
    nightBttn.addEventListener('click', () => {
        // nightBttn.style.visibility = "hidden";
        // dayBttn.style.visibility = "visible";
        
        let data = {
            click: true, 
            dayState: day
        };

        socket.emit('nightBttnClick', data);
    });

    //receiving live info about night button
    socket.on('nightBttnClick', (data) => {
        // console.log(data);

        if (data){
            nightBttnClickStat = data.click;
            day = data.day;
        };

        // console.log(day);
        if (nightBttnClickStat){
            if (day == true){
                day = false;
                nightBttn.src="media/day-button.png"
                sceneImg.src="media/night_scene.png";
                tableImg.src="media/night-table.png";
                lightsBttn.style.visibility = "visible";
                
                // if(mug1.style.visibility == "visible"){
                //     mug1.src="media/night_mug.png";
                // };

                //add convo speech from table
                // let tableConvo1 = document.createElement('p');
                // tableConvo1.innerHTML = "Please put me where there is light! I also like the warmth of the light rays on my body.";
                // tableTalksSec.appendChild(tableConvo1);
                // tableConvo1.classList.add('bubble-talk');
    
    
    
                lightsBttn.addEventListener('click', turnOnLights);
    
                
    
                let messagesSect = document.createElement('section');
                let message1 = document.createElement('p');
    
                message1.innerHTML = "Please put me where there is light! I also like the warmth of the light rays on my body.";
                chatsSect.appendChild(message1);
                message1.classList.add('messages');
    
            } else if (day == false){
                nightBttn.src="media/night-button.png"
                sceneImg.src="media/day_scene.png";
                tableImg.src="media/table.png";
                day = true;
                lightsBttn.style.visibility = "hidden";
                let message = document.createElement('p');
                message.innerHTML = "Yay, the sun is up!";
                chatsSect.appendChild(message);
                message.classList.add('messages');
                // lightsBttn.removeEventListener('click', turnOffLights);
    
                lightsBttn.removeEventListener('click', turnOnLights);
    
            };
        };
        
    });


    socket.on('lightBttnClick', (data) => {
        // console.log("receiving data");
        areLightsOn = data;

        if(areLightsOn == false && day == false){
            sceneImg.src="media/lights_scene.png";
            tableImg.src="media/lights-table.png";
            lightsBttn.innerHTML="Turn off lights";
            let message = document.createElement('p');
            message.innerHTML = "Thank you!";
            chatsSect.appendChild(message);
            message.classList.add('messages');
            areLightsOn = true;
        } else if (areLightsOn == true && day == false){
            areLightsOn = false;
            sceneImg.src="media/night_scene.png";
            tableImg.src="media/night-table.png";
            lightsBttn.innerHTML="Turn on lights";
            let message = document.createElement('p');
            message.innerHTML = "Please put me where there is light! I also like the warmth of the light rays on my body.";
            chatsSect.appendChild(message);
            message.classList.add('messages');
        };
    });

    /////////////////// drink feature ////////////////////////////
    drinkBttn.addEventListener('click', () => {
        socket.emit('drinkBttnClick', wantToDrink);
        // console.log(wantToDrink);
    });

    socket.on('drinkBttnClick', (data) => {
        // console.log(data);
        wantToDrink = data;

        if(wantToDrink == true){
            wantToDrink = false;

            mug1.style.visibility = "visible";
            let message = document.createElement('p');
            message.innerHTML = "Don't leave mugs on me for too long. My skin will blemish and stain!";
            chatsSect.appendChild(message);
            message.classList.add('messages');

            // if (day == true){
            //     mug1.src="media/day_mug.png";
            //     mug1.style.visibility = "visible";
            // } else if (day == false && areLightsOn == true){
            //     mug1.src="media/night_mug.png";
            //     mug1.style.visibility = "visible";

            // } else if (day == false && areLightsOn == false){
            //     mug1.src="media/lights_mug.png";
            //     mug1.style.visibility = "visible";

            // };

        } else if (wantToDrink == false){
            wantToDrink = true;
            mug1.style.visibility = "hidden";
            let message = document.createElement('p');
            message.innerHTML = "Thanks for decluttering me!";
            chatsSect.appendChild(message);
            message.classList.add('messages');
        };
    });






    let cursor = document.querySelector('.cursor');

    document.addEventListener('mousemove', (event) => {
        // const {
        //   clientX,
        //   clientY
        // } = event

        let x = event.clientX;
        let y = event.clientY;

        // console.log(x, y);

        cursor.style.left = -10 + x +'px';
        cursor.style.top = -10 + y + 'px';
    });

    // chatsSect.innerHTML = "";
})