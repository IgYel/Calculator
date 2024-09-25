const NormalDay = document.querySelector('#NormalDay');
const CustomDay = document.querySelector('#CustomDay');

const CustomDayInfo = document.querySelector('.CustomDayInfo');
const NormalDayInfo = document.querySelector('.NormalDayInfo');

const SubmitShift = document.querySelector('#SubmitShift');

//* Inputs
const StartHrs = document.querySelector('#StartHrs');
const EndHrs = document.querySelector('#EndHrs');
const Adress = document.querySelector('#Adress');
const MoneyTotal = document.querySelector('#MoneyTotal');

//* normal day inputs
const normalDayShop = document.querySelector('#normalDayShop');
const normalDayMoney = document.querySelector('#normalDayMoney');

CustomDayInfo.classList.add('Hidden');
NormalDay.classList.add('Hidden');

NormalDay.onclick = () =>{
    normalMode()
}
CustomDay.onclick = () =>{
    CustomMode()
}
//* DATE code

const today = new Date();
const month = today.getMonth() + 1;
const day = today.getDate();

const formattedDate = `${month}.${String(day).padStart(2, '0')}`;
const todayDate = formattedDate;

//! Functions

normalMode()

// Массив для хранения данных о сменах
const shiftsOfMonth = JSON.parse(localStorage.getItem("shiftsOfMonth")) || [];

// Функция для обновления localStorage
function saveShiftsToLocalStorage() {
    localStorage.setItem("shiftsOfMonth", JSON.stringify(shiftsOfMonth));
}

function clearForm (){
    StartHrs.value = "";
    EndHrs.value = "";
    Adress.value = "";
    MoneyTotal.value = "";
    normalDayShop.value = "";
    normalDayMoney.value = "";
}

function normalMode() {
    CustomDayInfo.classList.add('Hidden');
    NormalDayInfo.classList.remove('Hidden');

    NormalDay.classList.add('Hidden');
    CustomDay.classList.remove('Hidden');

    SubmitShift.onclick = () => {
        let Shop = normalDayShop.value;
        let Trzba = normalDayMoney.value;
        let hrs = 0;

        if (Shop === "Ha20" || Shop === "Ha18") {
            hrs = 10.5;
        } else if (Shop === "2smena" || Shop === "2 smena") {
            hrs = 8;
        } else {
            hrs = 12.5;
        }

        // Формирование сообщения
        let resultMessage = "";

        if (Shop !== "2smena") {
            resultMessage = 
`${todayDate}:
hodiny: ${hrs},
Shop: ${Shop},
____________
Tržba: ${Trzba}.
Hezky večer!`;
        } else {
            resultMessage = `
${todayDate}:
hodiny: ${hrs},
____________
Shop: ${Shop},
Hezky večer!
            `;
        }

        // Добавляем смену в массив shiftsOfMonth
        shiftsOfMonth.push({
            date: todayDate,
            shop: Shop,
            hrs: hrs,
            money: Trzba
        });

        // Сохраняем обновленный массив в localStorage
        saveShiftsToLocalStorage();

        // Выводим в консоль
        console.log(resultMessage);

        // Копируем результат в буфер обмена
        navigator.clipboard.writeText(resultMessage).then(() => {
            console.log("Result copied to clipboard");
        }).catch(err => {
            console.error("Failed to copy text: ", err);
        });
        clearForm ()
    };
}

function CustomMode() {
    NormalDayInfo.classList.add('Hidden');
    CustomDayInfo.classList.remove('Hidden');

    NormalDay.classList.remove('Hidden');
    CustomDay.classList.add('Hidden');

    SubmitShift.onclick = () => {
        let Shop = Adress.value;
        let Trzba = MoneyTotal.value;
        let Start = parseFloat(StartHrs.value);
        let End = parseFloat(EndHrs.value);
        let StartHourConverted = ''
        let EndHourConverted = '';

        if(Start == 9.5){
            StartHourConverted = '9:30';
        } else if(Start == 8.75){
            StartHourConverted = '8:45';
        } else{
            StartHourConverted = Start;
        }

        if(End == 21.25){
            EndHourConverted = '21:15';
        } else{
            EndHourConverted = End;
        }

        if (End < Start){
            End += 12;
        }
        let hrs = End - Start;

        // Формирование сообщения
        let resultMessage = 
`${todayDate}:
hodiny: ${hrs}, (${StartHourConverted} - ${EndHourConverted}),
Shop: ${Shop},
____________
Tržba: ${Trzba},
Hezky večer!`;

        // Добавляем смену в массив shiftsOfMonth
        shiftsOfMonth.push({
            date: todayDate,
            shop: Shop,
            hrs: hrs,
            money: Trzba
        });

        // Сохраняем обновленный массив в localStorage
        saveShiftsToLocalStorage();

        // Выводим в консоль
        console.log(resultMessage);

        // Копируем результат в буфер обмена
        navigator.clipboard.writeText(resultMessage).then(() => {
            console.log("Result copied to clipboard");
        }).catch(err => {
            console.error("Failed to copy text: ", err);
        });
        clearForm ()
    };
}

const finishButton = document.querySelector('#finishButton');

finishButton.onclick = () => {
    // Проверяем, есть ли данные в localStorage и если нет, то создаем пустой массив
    const AllShifts = JSON.parse(localStorage.getItem("shiftsOfMonth")) || [];

    let finalMessage = "";

    if (AllShifts.length === 0) {
        // Если нет смен в текущем месяце, создаем сообщение об отсутствии данных
        finalMessage = "no shifts in this month yet";
    } else {
        let totalHours = 0;
        let totalBonus = 0;
        let CurrentDay = "";
        let bonus = 0;

        for (let i = 0; i < AllShifts.length; i++) {
            // Преобразуем значение Trzba и hrs в число для корректных расчетов
            let Trzba = parseFloat(AllShifts[i].money) || 0;
            let hrs = parseFloat(AllShifts[i].hrs) || 0;
            bonus = 0;

            if (AllShifts[i].shop === '2smena') {
                bonus = 0;
            } else if (AllShifts[i].shop === 'Ha20') {
                if (hrs >= 10) {
                    if (Trzba >= 12000) {
                        bonus = Trzba * 0.025;
                    }
                    if (Trzba >= 15000) {
                        bonus = Trzba * 0.03;
                    }
                    if (Trzba >= 20000) {
                        bonus = Trzba * 0.04;
                    }
                    if (Trzba >= 25000) {
                        bonus = Trzba * 0.045;
                    }
                    if (Trzba >= 32000) {
                        bonus = Trzba * 0.05;
                    }
                    if (Trzba >= 40000) {
                        bonus = Trzba * 0.055;
                    }
                } else if (hrs < 10){
                    if (Trzba >= 6000) {
                        bonus = Trzba * 0.025;
                    }
                }
            } else if (AllShifts[i].shop === 'Ha18') {
                if (Trzba >= 9000) {
                    bonus = Trzba * 0.03;
                }
                if (Trzba >= 14000) {
                    bonus = Trzba * 0.045;
                }
                if (Trzba >= 22000) {
                    bonus = Trzba * 0.05;
                }
                if (Trzba >= 30000) {
                    bonus = Trzba * 0.055;
                }
            } else if (AllShifts[i].shop === 'MAJ') {
                if (Trzba >= 13000) {
                    bonus = Trzba * 0.01;
                }
            }

            // Формируем информацию о текущем дне
if(Trzba === 0){

CurrentDay =
`${AllShifts[i].date}:
${AllShifts[i].shop},
hours: ${hrs},

`;

} else {

if(bonus == 0){

CurrentDay =
`${AllShifts[i].date}:
${AllShifts[i].shop},
hours: ${hrs},
trzba: ${Trzba},

`;

} else{
CurrentDay =
`${AllShifts[i].date}:
${AllShifts[i].shop},
hours: ${hrs},
trzba: ${Trzba},
________________
Bonus: ${bonus}.

`;

}

}
    totalHours += hrs;
    totalBonus += bonus;
    finalMessage += CurrentDay;
}

        finalMessage += `
Total hours: ${totalHours}h, (${totalHours * 140}kč).
bonus: ${totalBonus}kč.

Summary: ${Math.round((totalHours * 140) + totalBonus)}KČ.
`;
}

    // Копируем результат в буфер обмена
    navigator.clipboard.writeText(finalMessage).then(() => {
        console.log("Result copied to clipboard");
    }).catch(err => {
        // Если не удалось скопировать данные, выводим сообщение "no shifts in this month yet"
        const fallbackMessage = "no shifts in this month yet";
        navigator.clipboard.writeText(fallbackMessage).then(() => {
            console.log("Fallback message copied to clipboard");
        }).catch(err => {
            console.error("Failed to copy fallback message: ", err);
        });
    });

    console.log(finalMessage);
};

const clearLocalStorage = document.querySelector('#clearLocalStorage');
clearLocalStorage.onclick = () =>{
    let conf = confirm("Do you want to clear all shifts?");

    if(conf){
        localStorage.removeItem('shiftsOfMonth');
    }
}

const currentmonthfix = [
    {
        date: "9.6",
        hrs: 8,
        money: 0,
        shop: "2smena",
    },
    {
        date: "9.7",
        hrs: 8,
        money: 0,
        shop: "2smena",
    },
    {
        date: "9.9",
        hrs: 12.5,
        money: 7564,
        shop: "MAJ",
    },
    {
        date: "9.10",
        hrs: 12.5,
        money: 6560,
        shop: "MAJ",
    },
    {
        date: "9.13",
        hrs: 8,
        money: 0,
        shop: "2smena",
    },
    {
        date: "9.14",
        hrs: 8,
        money: 0,
        shop: "2smena",
    },
    {
        date: "9.15",
        hrs: 12.5,
        money: 7634,
        shop: "MAJ",
    },
    {
        date: "9.16",
        hrs: 12.5,
        money: 5973,
        shop: "MAJ",
    },
    {
        date: "9.20",
        hrs: 11.5,
        money: 6772,
        shop: "Ha18",
    },
    {
        date: "9.21",
        hrs: 8,
        money: 0,
        shop: "2smena",
    },
    {
        date: "9.23",
        hrs: 11.5,
        money: 19072,
        shop: "Ha20",
    },
    {
        date: "9.24",
        hrs: 11.5,
        money: 10871,
        shop: "Ha20",
    },
    {
        date: "9.25",
        hrs: 6,
        money: 7761,
        shop: "Ha20",
    },
]

localStorage.setItem("shiftsOfMonth", JSON.stringify(currentmonthfix));