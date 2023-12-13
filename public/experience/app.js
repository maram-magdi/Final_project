// let socket = io();

let drinkBttn = document.getElementById('drink');
let wantToDrink = false;
let mug1 = document.getElementById('mug1');
// let mug2 = document.getElementById('mug2');
// let mug3 = document.getElementById('mug3');

let moveOutBttn = document.getElementById('move-out');

let feetBttn = document.getElementById('feet');
// let feetBttnClickStat = false;
let feetDownImg = document.getElementById('feet-down-img');
let feetUpImg = document.getElementById('feet-up-img');
let feetDown = false;

let tableImg = document.getElementById('table-img');
let sceneImg = document.getElementById('scene-img');
let scene = document.getElementById('scene');

let nightBttnClickStat = false;
let nightBttn = document.getElementById('night-button');
let dayBttn = document.getElementById('day-button');
let day = true;
let areLightsOn = false;
let lightsBttn = document.getElementById('lights-button');

let tableTalksSec = document.getElementById('table-talks');
let chatsSect = document.getElementById('chats-sect');


let manual = document.getElementById('manual');

let eventCounter = 0;
let residentsCounter;

let residentsObjArray;

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
        img.src = "media/manual_2.png";
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
            let audio = new Audio ('media/music.mp4');
            audio.loop = true;
            audio.play();
        });


        socket.on('residentsIn', (data) => {
            // console.log(data);
    
            residentsObjArray = Object.keys(data);
            console.log(residentsObjArray);
            let notify = document.createElement('p');
    
            if (residentsObjArray.length == 1) {
                notify.innerHTML = "There is " + residentsObjArray.length + " resident in the living room!";
            } else {
                notify.innerHTML = "There are " + residentsObjArray.length + " residents in the living room!";
            };
            notify.classList.add('count');
            chatsSect.appendChild(notify);
    
        });

        socket.on('nightBttnDataE', (data) => {
            
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
        
                    lightsBttn.addEventListener('click', turnOnLights);
        
        
                } else if (day == false){
                    nightBttn.src="media/night-button.png"
                    sceneImg.src="media/day_scene.png";
                    tableImg.src="media/table.png";
                    day = true;
                    areLightsOn = false;
                    lightsBttn.innerHTML="Turn on lights";
                    lightsBttn.classList.remove('button-active');
                    lightsBttn.style.visibility = "hidden";
        
                    lightsBttn.removeEventListener('click', turnOnLights);
        
                };
            };
        });

        socket.on('liveDataE', (data) => {
            console.log(data);

            //extracting info data into variables
            let feetDownLive = data.feetBttnClickStat;
            console.log(feetDownLive);
            // feetDown = feetDownLive;
            let wantToDrinkLive = data.drinkBttnClickStat;
            wantToDrink = wantToDrinkLive;
            let areLightsOnLive = data.areLightsOn;
            areLightsOn = areLightsOnLive;

            if (feetDownLive == true){
                feetDown = false;
                feetDownImg.style.visibility = "hidden";
                feetUpImg.style.visibility = "visible";
                feetBttn.innerHTML = "Remove feet from table";
                feetBttn.classList.add('button-active');

            } else if (feetDownLive == false){
                feetDown = true;
                feetDownImg.style.visibility = "visible";
                feetUpImg.style.visibility = "hidden";
                feetBttn.innerHTML = "Rest feet on table";
                feetBttn.classList.remove('button-active');

            };

            
            if(wantToDrinkLive == true){
                wantToDrink = false;

                mug1.style.visibility = "visible";

                drinkBttn.innerHTML = "Remove coffee/tea mugs";
                drinkBttn.classList.add('button-active');

            } else if (wantToDrinkLive == false){
                wantToDrink = true;

                mug1.style.visibility = "hidden";

                drinkBttn.innerHTML = "Drink coffee/tea";
                drinkBttn.classList.remove('button-active');
            };

            if(areLightsOn == false && day == false){
                sceneImg.src="media/lights_scene.png";
                tableImg.src="media/lights-table.png";
                lightsBttn.innerHTML="Turn off lights";
                lightsBttn.classList.add('button-active');
                areLightsOn = true;
            } else if (areLightsOn == true && day == false){
                areLightsOn = false;
                sceneImg.src="media/night_scene.png";
                tableImg.src="media/night-table.png";
                lightsBttn.innerHTML="Turn on lights";
                lightsBttn.classList.remove('button-active');
            };
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
            feetBttn.classList.add('button-active');
            let message = document.createElement('p');
            message.innerHTML = "HEY! I am made of harmful substances that may lead to cancer, so please handle me with CARE!";
            // chatsSect.appendChild(message);
            message.classList.add('messages');
            let profile = document.createElement('img');
            profile.src="media/profile.png";
            let messageLine = document.createElement('section');
            messageLine.appendChild(profile);
            messageLine.appendChild(message);
            profile.classList.add('profile-img');
            messageLine.classList.add('message-line');
            chatsSect.appendChild(messageLine);
        } else {
            feetDown = true;
            feetDownImg.style.visibility = "visible";
            feetUpImg.style.visibility = "hidden";
            feetBttn.innerHTML = "Rest feet on table";
            feetBttn.classList.remove('button-active');
            let message = document.createElement('p');
            message.innerHTML = "Thank you!";
            // chatsSect.appendChild(message);
            message.classList.add('messages');
            let profile = document.createElement('img');
            profile.src="media/profile.png";
            let messageLine = document.createElement('section');
            messageLine.appendChild(profile);
            messageLine.appendChild(message);
            profile.classList.add('profile-img');
            messageLine.classList.add('message-line');
            chatsSect.appendChild(messageLine);
        };
        // if(feetBttnClickStat == true){
            
        // };
        chatsSect.scrollTop = chatsSect.scrollHeight;
    });


    ///////////////////// table image button ///////////////////////////////
    tableImg.addEventListener('click', () => {
        console.log("table is clicked!");

        let message = document.createElement('p');
        message.innerHTML = "Hey! I'm Freya! I am DUAL CARE's newest humanized furniture. Please treat me with love and respect.";
        message.classList.add('messages');
        let profile = document.createElement('img');
        profile.src="media/profile.png";
        let messageLine = document.createElement('section');
        messageLine.appendChild(profile);
        messageLine.appendChild(message);
        profile.classList.add('profile-img');
        messageLine.classList.add('message-line');
        chatsSect.appendChild(messageLine);
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
                // chatsSect.appendChild(message1);
                message1.classList.add('messages');
                let profile = document.createElement('img');
                profile.src="media/profile.png";
                let messageLine = document.createElement('section');
                messageLine.appendChild(profile);
                messageLine.appendChild(message1);
                profile.classList.add('profile-img');
                messageLine.classList.add('message-line');
                chatsSect.appendChild(messageLine);
    
            } else if (day == false){
                nightBttn.src="media/night-button.png"
                sceneImg.src="media/day_scene.png";
                tableImg.src="media/table.png";
                day = true;
                areLightsOn = false;
                lightsBttn.innerHTML="Turn on lights";
                lightsBttn.classList.remove('button-active');
                lightsBttn.style.visibility = "hidden";
                let message = document.createElement('p');
                message.innerHTML = "Yay, the sun is up!";
                // chatsSect.appendChild(message);
                message.classList.add('messages');
                let profile = document.createElement('img');
                profile.src="media/profile.png";
                let messageLine = document.createElement('section');
                messageLine.appendChild(profile);
                messageLine.appendChild(message);
                profile.classList.add('profile-img');
                messageLine.classList.add('message-line');
                chatsSect.appendChild(messageLine);
                // lightsBttn.removeEventListener('click', turnOffLights);
    
                lightsBttn.removeEventListener('click', turnOnLights);
    
            };
        };
        chatsSect.scrollTop = chatsSect.scrollHeight;
        
    });


    socket.on('lightBttnClick', (data) => {
        // console.log("receiving data");
        areLightsOn = data;

        if(areLightsOn == false && day == false){
            sceneImg.src="media/lights_scene.png";
            tableImg.src="media/lights-table.png";
            lightsBttn.innerHTML="Turn off lights";
            lightsBttn.classList.add('button-active');
            let message = document.createElement('p');
            message.innerHTML = "Thank you!";
            // chatsSect.appendChild(message);
            message.classList.add('messages');
            let profile = document.createElement('img');
            profile.src="media/profile.png";
            let messageLine = document.createElement('section');
            messageLine.appendChild(profile);
            messageLine.appendChild(message);
            profile.classList.add('profile-img');
            messageLine.classList.add('message-line');
            chatsSect.appendChild(messageLine);
            areLightsOn = true;
        } else if (areLightsOn == true && day == false){
            areLightsOn = false;
            sceneImg.src="media/night_scene.png";
            tableImg.src="media/night-table.png";
            lightsBttn.innerHTML="Turn on lights";
            lightsBttn.classList.remove('button-active');
            let message = document.createElement('p');
            message.innerHTML = "Please put me where there is light! I also like the warmth of the light rays on my body.";
            // chatsSect.appendChild(message);
            message.classList.add('messages');
            let profile = document.createElement('img');
            profile.src="media/profile.png";
            let messageLine = document.createElement('section');
            messageLine.appendChild(profile);
            messageLine.appendChild(message);
            profile.classList.add('profile-img');
            messageLine.classList.add('message-line');
            chatsSect.appendChild(messageLine);
        };
        chatsSect.scrollTop = chatsSect.scrollHeight;
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


            drinkBttn.innerHTML = "Remove coffee/tea mugs";
            drinkBttn.classList.add('button-active');
            let message = document.createElement('p');
            message.innerHTML = "Don't leave mugs on me for too long. My skin will blemish and stain!";
            // chatsSect.appendChild(message);
            message.classList.add('messages');
            let profile = document.createElement('img');
            profile.src="media/profile.png";
            let messageLine = document.createElement('section');
            messageLine.appendChild(profile);
            messageLine.appendChild(message);
            profile.classList.add('profile-img');
            messageLine.classList.add('message-line');
            chatsSect.appendChild(messageLine);

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
            
            drinkBttn.innerHTML = "Drink coffee/tea";
            drinkBttn.classList.remove('button-active');
            let message = document.createElement('p');
            message.innerHTML = "Thanks for decluttering me!";
            // chatsSect.appendChild(message);
            message.classList.add('messages');
            let profile = document.createElement('img');
            profile.src="media/profile.png";
            let messageLine = document.createElement('section');
            messageLine.appendChild(profile);
            messageLine.appendChild(message);
            profile.classList.add('profile-img');
            messageLine.classList.add('message-line');
            chatsSect.appendChild(messageLine);
        };
        chatsSect.scrollTop = chatsSect.scrollHeight;
    });

    ////////////////////// dirt feature /////////////////////////////
    function dirtShows () {
        let spillsImg = document.createElement('img');
        spillsImg.src="media/spills.png";
        spillsImg.classList.add('spills-img');
    };




    // let cursor = document.querySelector('.cursor');

    document.addEventListener('mousemove', (event) => {
        // const {
        //   clientX,
        //   clientY
        // } = event

        let x = event.clientX;
        let y = event.clientY;

        let mousePos = {
            x: x,
            y: y
        };

        // console.log(x, y);

        // cursor.style.left = -10 + x +'px';
        // cursor.style.top = -10 + y + 'px';

        socket.emit('mousemove', mousePos);
    });

    let cursorsContainer = document.getElementById('cursors-container');

    socket.on('residentsLive', (data) => {
        // let residentsCounter = data;
        let residentsLive = data;

        // console.log(residentsCounter);
        // console.log(residentsLive);

        let residentsObjArray = Object.values(residentsLive);
        // console.log(residentsObjArray);
        // residentsCounter = residentsObjArray.length + 1;

        cursorsContainer.innerHTML = '';

        for(let i = 0; i < residentsObjArray.length; i++){
            // console.log(residentsObjArray[i]);
            let residentCursor = document.createElement('div');
            residentCursor.classList.add('cursor');

            let r = Math.floor(Math.random() * 255);
            let g = Math.floor(Math.random() * 255);
            let b = Math.floor(Math.random() * 255);

            residentCursor.style.backgroundColor = "rgb(" + r + ", " + g + ", " + b +" )";
            // scene.removeChild(scene.lastChild);
            // residentCursor.classList.add('resident-cursor-' + i);

            // scene.appendChild(residentCursor);
            residentCursor.style.left = -10 + residentsObjArray[i].x +'px';
            residentCursor.style.top = -10 + residentsObjArray[i].y + 'px';

            let residentNo = document.createElement('p');
            let br = document.createElement('br');
            residentNo.innerHTML = "Resident" + (i+1);

            // residentNo.classList.add('resident-no');
            residentCursor.appendChild(br);
            residentCursor.appendChild(residentNo);

            cursorsContainer.appendChild(residentCursor);
        };
    });

    // socket.on('residentJoined', (data) => {
    //     let notify = document.createElement('p');
    //     notify.innerHTML = "Resident " + data + " has joined the living room!";
    //     chatsSect.appendChild(notify);
    // })
    

    // chatsSect.innerHTML = "";
})