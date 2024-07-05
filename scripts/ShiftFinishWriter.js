const SubmitShift = document.querySelector("#SubmitShift");
let ShiftResult = document.getElementById("ShiftTotalResult");
let Switch = document.getElementById("Switch");
let TwoP = document.getElementById("TwoPerson");
let OneP = document.getElementById("OnePerson");
const WasCash = document.getElementById("CashBeforeMe");
const WasCard = document.getElementById("CardBeforeMe");

SubmitShift.onclick = () => {
    const startHour = Number(document.querySelector("#StartHrs").value);
    const endHour = Number(document.querySelector("#EndHrs").value);

    const CashTotal = Number(document.querySelector("#CashTotal").value);
    const CardTotal = Number(document.querySelector("#CardTotal").value);
    const CashBeforeMe = Number(document.querySelector("#CashBeforeMe").value);
    const CardBeforeMe = Number(document.querySelector("#CardBeforeMe").value);
    const Adress = document.querySelector("#Adress").value;
    
    let Hours;
    if (endHour <= startHour) Hours = endHour + 12 - startHour;
    else Hours = endHour - startHour;
    let Money = 0;
    if (CashBeforeMe == 0) {
        Money = `${CashTotal + CardTotal}kč`;
    } else if(CashBeforeMe == CashTotal){
        Money = `${CashTotal + CardTotal}kč, spolu`;
    } else {
        Money = `Total: ${CashTotal + CardTotal}kč Ja: ${(CashTotal + CardTotal) - CashBeforeMe - CardBeforeMe}kč, spolu`;
    }
    let MessageResult = `Igor. Adress: ${Adress}. Hodiny: ${Hours}h (${startHour} - ${endHour}). Tržba: ${Money}. Hezky večer!`;
    ShiftResult.textContent = MessageResult;
    ShiftResult.style.display = "block";
}

TwoP.onclick= () =>{ // OFF
    OneP.style.display = "block";
    TwoP.style.display = "none";
    WasCash.style.display = 'none';
    WasCard.style.display = 'none';
}
OneP.onclick= () =>{ // ON
    TwoP.style.display = "block";
    OneP.style.display = "none";
    WasCard.style.display = 'block';
    WasCash.style.display = 'block';
}