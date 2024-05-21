//your JS code here. If required.
// Function to create a promise that resolves after a random time between min and max seconds
function createPromise(min, max) {
    const randomTime = Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(randomTime);
        }, randomTime * 1000);
    });
}

// Array to hold the promises
const promises = [
    createPromise(1, 3),
    createPromise(1, 3),
    createPromise(1, 3)
];

// Add loading text to the table
const loadingRow = document.createElement("tr");
const loadingCell = document.createElement("td");
loadingCell.setAttribute("colspan", "2");
loadingCell.textContent = "Loading...";
loadingRow.appendChild(loadingCell);
document.getElementById("myTable").appendChild(loadingRow);

// Wait for all promises to resolve
Promise.all(promises)
    .then(results => {
        // Remove loading text
        document.getElementById("myTable").removeChild(loadingRow);
        
        // Populate the table with results
        results.forEach((time, index) => {
            const row = document.createElement("tr");
            const column1 = document.createElement("td");
            const column2 = document.createElement("td");
            column1.textContent = `Promise ${index + 1}`;
            column2.textContent = `${time}`;
            row.appendChild(column1);
            row.appendChild(column2);
            document.getElementById("myTable").appendChild(row);
        });

        // Calculate and display total time
        const totalTime = results.reduce((acc, time) => acc + time, 0);
        const totalRow = document.createElement("tr");
        const totalColumn1 = document.createElement("td");
        const totalColumn2 = document.createElement("td");
        totalColumn1.textContent = "Total";
        totalColumn2.textContent = `${totalTime.toFixed(3)}`;
        totalRow.appendChild(totalColumn1);
        totalRow.appendChild(totalColumn2);
        document.getElementById("myTable").appendChild(totalRow);
    })
    .catch(error => {
        console.error('Error occurred:', error);
    });
