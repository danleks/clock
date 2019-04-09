export default function clock(){
    // 24-hour clock with changing background
    // declare clock vars
    let seconds, minutes, hours, hue = 0;
    const secondsHtml = document.querySelector('.clock__seconds'), minutesHtml = document.querySelector('.clock__minutes'), hoursHtml = document.querySelector('.clock__hours'),  body = document.querySelector('body');

    // setup function getting current time
    function setCurrentTime(){
        const now = new Date();
        seconds = now.getSeconds();
        minutes = now.getMinutes();
        hours = now.getHours();
    }

    // setup function inserting current time to HTML (adding 0's to digits < 10)
    function insertTimeToHtml(){
        secondsHtml.innerHTML = seconds.toString().padStart(2, '0');
        minutesHtml.innerHTML = `${minutes.toString().padStart(2, '0')}:`;
        hoursHtml.innerHTML = `${hours.toString().padStart(2, '0')}:`;
    }
    // a small bonus to make the clock a bit nicer: change background
    function changeBg(){
        hue += 10;
        body.style.backgroundColor = `hsl(${hue}, 20%, 20%)`;
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
        changeBg();
        if (seconds === 60) {
            minutesGenerator.next()
            seconds = 0;

            if (minutes === 60) {
                hoursGenerator.next();
                minutes = 0;
            }

            if (hours === 24) {
                hours = 0;
            }
        }
        insertTimeToHtml();
    }, 1000);
};