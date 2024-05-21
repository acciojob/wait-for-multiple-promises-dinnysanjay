//your JS code here. If required.
// Function to create a Promise that resolves after a random time between min and max seconds
function createRandomPromise(min, max) {
    const randomTime = Math.random() * (max - min) + min;
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(randomTime);
        }, randomTime * 1000); // Convert seconds to milliseconds
    });
}

// Array to store the promises
const promises = [];

// Create 3 promises with random resolving times between 1 and 3 seconds
for (let i = 0; i < 3; i++) {
    promises.push(createRandomPromise(1, 3));
}

// Add a row with Loading... text to the table initially
const loadingRow = document.createElement('tr');
const loadingCell = document.createElement('td');
loadingCell.setAttribute('colspan', '2');
loadingCell.textContent = 'Loading...';
loadingRow.appendChild(loadingCell);
document.getElementById('result-table-body').appendChild(loadingRow);

// Wait for all promises to resolve using Promise.all
Promise.all(promises)
    .then(times => {
        // Remove the loading text row
        loadingRow.remove();

        // Populate the table with the results
        const resultTableBody = document.getElementById('result-table-body');

        // Populate each promise's resolving time
        for (let i = 0; i < times.length; i++) {
            const row = document.createElement('tr');
            const promiseCell = document.createElement('td');
            const timeCell = document.createElement('td');
            promiseCell.textContent = `Promise ${i + 1}`;
            timeCell.textContent = times[i].toFixed(3); // Display time with 3 decimal places
            row.appendChild(promiseCell);
            row.appendChild(timeCell);
            resultTableBody.appendChild(row);
        }

        // Calculate and display the total resolving time
        const totalRow = document.createElement('tr');
        const totalCell = document.createElement('td');
        const totalTimeCell = document.createElement('td');
        totalCell.textContent = 'Total';
        const totalTime = times.reduce((acc, curr) => acc + curr, 0);
        totalTimeCell.textContent = totalTime.toFixed(3);
        totalRow.appendChild(totalCell);
        totalRow.appendChild(totalTimeCell);
        resultTableBody.appendChild(totalRow);
    })
    .catch(error => {
        console.error('An error occurred:', error);
    });
