export default function clock(){
    // 24-hour analog/digital clock with changing background
    // declare clock vars
    let seconds, minutes, hours, hue = 0, degreesSeconds, degreesMinutes, degreesHours;
    const clock = document.querySelector('.clock'),
            secondsHtml = document.querySelector('.digital__seconds'),
            minutesHtml = document.querySelector('.digital__minutes'),
            hoursHtml = document.querySelector('.digital__hours'),
            secondsHand = document.querySelector('.analog__hand--seconds'),
            minutesHand = document.querySelector('.analog__hand--minutes'),
            hoursHand = document.querySelector('.analog__hand--hours');


    // declare function setting current time
    function setCurrentTime(){
        const now = new Date();
        seconds = now.getSeconds();
        minutes = now.getMinutes();
        hours = now.getHours();
        // set current time for analog clock
        degreesSeconds = (seconds * 6)-90;
        degreesMinutes = (minutes * 6)-90;
        degreesHours = (hours * 30)-90;

    }

    // declare function inserting current time to HTML (adding 0's to digits < 10)
    function insertTimeToHtml(){
        secondsHtml.innerHTML = seconds.toString().padStart(2, '0');
        minutesHtml.innerHTML = `${minutes.toString().padStart(2, '0')}:`;
        hoursHtml.innerHTML = `${hours.toString().padStart(2, '0')}:`;
        // insert time for analog clock
        secondsHand.style.transform = `rotate(${degreesSeconds}deg)`;
        minutesHand.style.transform = `rotate(${degreesMinutes}deg)`;
        hoursHand.style.transform = `rotate(${degreesHours}deg)`;
    }

    function moveSecondsHand(value) {
        secondsHand.style.transform = `rotate(${value}deg)`;
    }

    function moveMinutesHand(value) {
        minutesHand.style.transform = `rotate(${value}deg)`;
    }

    function moveHoursHand(value) {
        hoursHand.style.transform = `rotate(${value}deg)`;
    }

    // a small bonus to make the clock a bit nicer: change background
    function changeBg(){
        hue += 10;
        clock.style.backgroundColor = `hsl(${hue}, 20%, 20%)`;
    }

    // setup seconds generator
    function* secondsFunc(){
        while(true){
            yield seconds++;
        }
    }

    // setup minutes generator
    function* minutesFunc(){
        while(true){
            yield minutes++;
        }
    }

    // setup hours generator
    function* hoursFunc(){
        while(true){
            yield hours++;
        }
    }

    // set current time and add it to HTML
    setCurrentTime();
    insertTimeToHtml();

    // create generator objects for seconds, minutes, hours
    const secondsGenerator = secondsFunc();
    const minutesGenerator = minutesFunc();
    const hoursGenerator = hoursFunc();

    // update current time
    setInterval(()=>{
        secondsGenerator.next();
        degreesSeconds += 6;
        moveSecondsHand(degreesSeconds);
        changeBg();
        if (seconds === 60) {
            minutesGenerator.next();
            seconds = 0;
            degreesSeconds = -90;
            degreesMinutes += 6;
            degreesHours += 0.5;
            moveMinutesHand(degreesMinutes);
            moveHoursHand(degreesHours);

            if (minutes === 60) {
                hoursGenerator.next();
                minutes = 0;
                degreesMinutes = -90;
                degreesHours += 0.5;
                moveHoursHand(degreesHours);
            }

            if (hours === 24) {
                hours = 0;
                degreesHours = -90;

            }
        }
        insertTimeToHtml();
    }, 1000);
};