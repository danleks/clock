export default function clock(){
    let seconds;
    let minutes;
    let hours;

    function setCurrentTime(){
        const now = new Date();
        seconds = now.getSeconds();
        minutes = now.getMinutes();
        hours = now.getHours();
    }

    setCurrentTime();

    console.log(seconds, minutes, hours)

    ;

}