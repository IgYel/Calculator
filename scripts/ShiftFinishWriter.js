const SubmitShift = document.querySelector("#SubmitShift");
let ShiftResult = document.getElementById("ShiftTotalResult");
let TwoP = document.getElementById("TwoPerson");
let OneP = document.getElementById("OnePerson");
const WasMoney = document.getElementById("MoneyBeforeMe");

// !
import { getTodayDate } from './GetDate.js';
// !

SubmitShift.onclick = () => {
    const startHour = Number(document.querySelector("#StartHrs").value);
    const endHour = Number(document.querySelector("#EndHrs").value);

    const MoneyTotal = Number(document.querySelector("#MoneyTotal").value);
    const MoneyBeforeMe = Number(document.querySelector("#MoneyBeforeMe").value);
    const Adress = document.querySelector("#Adress").value;
    
    let Hours;
    if (endHour <= startHour) Hours = endHour + 12 - startHour;
    else Hours = endHour - startHour;
    let Money = 0;
    if (MoneyBeforeMe == 0) {
        Money = `Tržba: ${MoneyTotal}kč`;
    } else {
        Money = `Tržba: Total na ${endHour}: ${MoneyTotal}Kč. Spolu: ${MoneyTotal - MoneyBeforeMe}Kč`;
    }
    
    let DateText = document.getElementById("DayDate");
    let ShiftText = document.getElementById("Shift");
    let HoursText = document.getElementById("Hours");
    let MoneyText = document.getElementById("Money");
    
    DateText.textContent = getTodayDate();
    ShiftText.textContent = Adress;
    HoursText.textContent = `Hodiny: ${Hours}h (${startHour} - ${endHour})`;
    MoneyText.textContent = Money;

    ShiftResult.style.display = "block";
}

TwoP.onclick= () =>{ // OFF
    OneP.style.display = "block";
    TwoP.style.display = "none";
    WasMoney.style.display = "none";
}
OneP.onclick= () =>{ // ON
    TwoP.style.display = "block";
    OneP.style.display = "none";
    WasMoney.style.display = "block";
}