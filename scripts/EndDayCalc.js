const Submit = document.querySelector("#SubmitButton");
let resultOfDay = document.getElementById("resultOfDay");

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
    let ResultMessage1 = `Celkem: ${TotalKrones} Kč HOTOVE. Tržba v hotove celkem: +${Trzba}, Koruny: +${KronesResult}, Euro: +${EurosResult} (${EurosConverted} v Kč), Dollars: ${DollarsResult}.`;

    let Leave = +prompt(`You have ${TotalKrones}. How many leave for tomorrow?`);
    let ForNik = Math.round((TotalKrones - Leave) / 100) * 100;
    const ResultMessage2 = ` Pro Niki: ${ForNik}, KASA na ZITRA: ${TotalKrones - ForNik}. Euro a Dolary si vyber sam.`
    resultOfDay.textContent = ResultMessage1 + ResultMessage2;
    // Count all and give to Niki
    resultOfDay.style.display = "block";
};