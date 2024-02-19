// Initialize sortAscending variable to track the current sorting order
let sortAscending = true;

// Create table element
const table = document.createElement('table');

// Apply CSS to add borders to cells and collapse borders
table.style.borderCollapse = 'collapse';

// Array of table headers
const headers = ['Name', 'Surname', 'Job', 'Uni', 'Age(asc)'];

// Create table header row
const headerRow = document.createElement('tr');

// Create and append header cells
headers.forEach((headerText, index) => {
  const headerCell = document.createElement('th');
  headerCell.textContent = headerText;
  headerCell.style.border = '1px solid black'; // Apply border style to header cells

  // If the header is 'Age(asc)', add a click event listener for sorting
  if (headerText === 'Age(asc)') {
    headerCell.addEventListener('click', handleClickOnAgeHeader);
    headerCell.style.cursor = 'pointer'; // Change cursor to pointer to indicate it's clickable
  }

  headerRow.appendChild(headerCell);
});

// Append header row to the table
table.appendChild(headerRow);

// Append the table to the document body
document.body.appendChild(table);

// Function to handle click on "Age(asc)" header
function handleClickOnAgeHeader() {
  // Toggle sorting order
  sortAscending = !sortAscending;

  // Send sorting order to backend
  const sortOrder = sortAscending ? 'asc' : 'dsc';
  sortDataByAge(sortOrder);

  // Update the text of the "Age" header
  const ageHeader = table.querySelector('th:nth-child(5)'); // Assuming "Age(asc)" is the 5th header
  ageHeader.textContent = `Age(${sortAscending ? 'asc' : 'dsc'})`;
}

// Function to sort the data by 'Age' property
function sortDataByAge(sortOrder) {
  // Fetch data from the server with sorting order
  fetch(`http://localhost:3000/teachers/ages/${sortOrder}`)
    .then((resp) => resp.json())
    .then((teachersData) => {
      // Populate the table with the sorted data
      populateTable(teachersData.data);
    })
    .catch((error) => console.error(error));
}

// Function to populate the table with data
function populateTable(data) {
  // Clear existing rows
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  // Loop through the fetched data and create rows and cells
  data.forEach((teacher) => {
    const row = document.createElement('tr');

    // Loop to create cells for each teacher, skipping the first column
    Object.entries(teacher)
      .slice(1)
      .forEach(([key, value]) => {
        const cell = document.createElement('td');
        cell.textContent = value;
        cell.style.border = '1px solid black'; // Apply border style to cells
        row.appendChild(cell);
      });

    // Append the row to the table
    table.appendChild(row);
  });
}

// Fetch data from the server and populate the table
fetch('http://localhost:3000/teachers')
  .then((resp) => resp.json())
  .then((teachersData) => {
    populateTable(teachersData);
  })
  .catch((error) => console.error(error));
