const Submit = document.querySelector("#SubmitButton");
let resultOfDay = document.getElementById("resultOfDay");

// !
import { getTodayDate } from './GetDate.js';
// !

Submit.onclick = () => {
	const TotalKrones = document.querySelector("#Krones").value;
	const TotalEuros = document.querySelector("#Euros").value;
	const TotalDollars = document.querySelector("#Dollars").value;
	const MorningKrones = document.querySelector("#MKrones").value;
	const MorningEuros = document.querySelector("#MEuros").value;
    const MorningDollars = document.querySelector("#MDollars").value;
    // Constants

    const KronesResult = TotalKrones - MorningKrones;
    const EurosResult = TotalEuros - MorningEuros;
    // Valuate all incame money

    const EurosConverted = EurosResult * 23;
    let DollarsResult = 0;
    let DollarsConverted = 0;

    if (TotalDollars == MorningDollars) {
        DollarsResult = "Not used";
    } else {
        DollarsConverted = (TotalDollars - MorningDollars) * 22;
        DollarsResult = `+${TotalDollars - MorningDollars} (${(TotalDollars - MorningDollars) * 22} v Kč)`;
    }
    // convert Euros and Dollars

    const Trzba = KronesResult + EurosConverted + DollarsConverted;

    
    let ForNik = Math.round((TotalKrones - MorningKrones) / 100) * 100;

    let DateText = document.getElementById("Date");
    let TotalKassaText = document.getElementById("TotalKassa");
    let TrzbaText = document.getElementById("Trzba");
    let MorningText = document.getElementById("Morning");
    let TakeFromKassaText = document.getElementById("TakeFromKassa");
    let ForTomorrowText = document.getElementById("ForTomorrow");
    let ForNikiText = document.getElementById("ForNiki");

    //? Count all and give to Niki
    
    DateText.textContent = getTodayDate();

    TotalKassaText.textContent = `Total: ${TotalKrones}Kč | ${TotalEuros}€ | ${TotalDollars}$`; 

    TrzbaText.textContent = `Tržba: +${KronesResult}Kč | +${EurosResult}€ | $: ${DollarsResult}. (${Trzba} Kč Celkem) `;
    
    MorningText.textContent = `Rano: ${MorningKrones}Kč | ${MorningEuros}€ | ${MorningDollars}$`;

    TakeFromKassaText.textContent = `Z kasy: ${(TotalKrones - ForNik) - MorningKrones}Kč (- vzal | + dal)`;
    
    ForTomorrowText.textContent = `KASA na ZITRA: ${TotalKrones - ForNik}Kč.`;

    ForNikiText.textContent = `Pro Niki: ${ForNik}Kč`;


    resultOfDay.style.display = "block";
};
