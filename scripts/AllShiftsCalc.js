const ResultField = document.getElementById("AllShiftsResult");

document.addEventListener('DOMContentLoaded', () => {
    const inputContainer = document.getElementById('input-container');
    const addButton = document.getElementById('add-button');
    const finishButton = document.getElementById('finish-button');

    addButton.addEventListener('click', () => {
        const newDateInput = document.createElement('input');
        newDateInput.type = 'text';
        newDateInput.className = 'input-field';
        newDateInput.id = 'first';
        newDateInput.placeholder = 'Date';

        const newAdressInput = document.createElement('input');
        newAdressInput.type = 'text';
        newAdressInput.className = 'input-field';
        newAdressInput.placeholder = 'Adress';

        const newHoursInput = document.createElement('input');
        newHoursInput.type = 'number';
        newHoursInput.className = 'input-field';
        newHoursInput.placeholder = 'Hours';

        const newIncomeInput = document.createElement('input');
        newIncomeInput.type = 'text';
        newIncomeInput.className = 'input-field';
        newIncomeInput.id = 'last';
        newIncomeInput.placeholder = 'Tržba';

        inputContainer.appendChild(newDateInput);
        inputContainer.appendChild(newAdressInput);
        inputContainer.appendChild(newHoursInput);
        inputContainer.appendChild(newIncomeInput);
    });

    finishButton.addEventListener('click', () => {
        const inputFields = document.querySelectorAll('.input-field');
        const data = [];
        let HoursTotal = 0;

        if (inputFields.length % 4 !== 0) {
            console.error('Некорректное количество полей ввода.');
            return;
        }

        for (let i = 0; i < inputFields.length; i += 4) {
            const dateValue = inputFields[i].value.trim();
            const adressValue = inputFields[i + 1].value.trim();
            const hoursValue = inputFields[i + 2].value.trim();
            const incomeValue = inputFields[i + 3].value.trim();

            if (dateValue !== '' && adressValue !== '' && hoursValue !== '' && incomeValue !== '') {
                data.push(`${dateValue}: ${adressValue}, Hours: ${hoursValue}, Tržba: ${incomeValue}`);
                HoursTotal += parseFloat(hoursValue); // Суммируем значения из поля "Hours"
            }
        }

        ResultField.textContent = data.join('\n') + `\n\n Total Hours: ${HoursTotal} (${HoursTotal * 140}Kč)`;
        ResultField.style.display = "block";
    });
});
