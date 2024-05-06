document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('countdown-form');
    const responseBox = document.getElementById('response-box');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const holidayInput = document.getElementById('holiday');
        const holiday = holidayInput.value.trim();

        if (holiday !== '') {
            fetchHolidayCountdown(holiday);
        } else {
            displayError('Please enter a holiday.');
        }
    });

    function fetchHolidayCountdown(holiday) {
        // Customize API endpoint URLs as needed
        const apiEndpoints = [
            'https://api.holidaycountdowns.xyz/api/countdown.php?holiday=',
            'https://anotherapi.com/countdown?holiday='
            // Add more API endpoints here if needed
        ];

        // Fetch data from each API endpoint asynchronously
        Promise.all(apiEndpoints.map(endpoint => fetch(endpoint + holiday)))
            .then(responses => Promise.all(responses.map(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data from the API.');
                }
                return response.json();
            })))
            .then(data => {
                displayCountdown(data);
            })
            .catch(error => {
                displayError(error.message); // Display the error message
            });
    }

    function displayCountdown(data) {
        // Clear previous responses
        responseBox.innerHTML = '';

        data.forEach(apiResponse => {
            const paragraph = document.createElement('p');
            paragraph.textContent = `Days until ${apiResponse.holiday}: ${apiResponse.days_until}`;
            responseBox.appendChild(paragraph);
        });
    }
});

function displayError(message) {
    var errorBox = document.getElementById("error-box");
    var errorMessage = document.getElementById("error-message");

    errorMessage.textContent = message;
    errorBox.style.display = "block";
}

function closeErrorBox() {
    var errorBox = document.getElementById("error-box");
    errorBox.style.display = "none";
}
