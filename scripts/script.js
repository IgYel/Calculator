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

        if (Shop === "H20" || Shop === "H-18") {
            hrs = 11.5;
        } else if (Shop === "2smena" || Shop === "2 smena") {
            hrs = 8;
        } else {
            hrs = 12.5;
        }

        // Формирование сообщения
        let resultMessage = "";

        if (Shop !== "2smena") {
            resultMessage = `
${todayDate}:
hodiny: ${hrs},
Shop: ${Shop},
Tržba: ${Trzba}.
____________
Hezky večer!
            `;
        } else {
            resultMessage = `
${todayDate}:
hodiny: ${hrs},
Shop: ${Shop},
____________
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
        let hrs = End - Start;

        // Формирование сообщения
        let resultMessage = `
${todayDate}:
hodiny: ${hrs}, (${Start} - ${End}),
Shop: ${Shop},
Tržba: ${Trzba},
____________
Hezky večer!
        `;

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

            if (AllShifts[i].shop === '2smena') {
                bonus = 0;
            } else if (AllShifts[i].shop === 'Ha20') {
                if (hrs >= 11.5) {
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
                } else {
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
            CurrentDay = `
${AllShifts[i].date}:
${AllShifts[i].shop},
hours: ${hrs},
trzba: ${Trzba},

Bonus: ${bonus}.
`;

            totalHours += hrs;
            totalBonus += bonus;
            finalMessage += CurrentDay;
        }

        finalMessage += `
Total hours: ${totalHours}h, (${totalHours * 140}kč).
bonus: ${totalBonus}kč.

Summary: ${(totalHours * 140) + totalBonus}KČ.
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
    localStorage.removeItem('shiftsOfMonth');
}