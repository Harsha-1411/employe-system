document.getElementById('employeeForm').addEventListener('submit', addEmployee);

function addEmployee(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const date = document.getElementById('date').value;

    // Create a new row in the employee table
    const table = document.getElementById('employeeTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td>${name}</td>
        <td>${role}</td>
        <td>${date}</td>
        <td><button class="delete" onclick="deleteEmployee(this)">Delete</button></td>
    `;

    // Clear the form
    document.getElementById('employeeForm').reset();
}

function deleteEmployee(button) {
    // Remove the row of the clicked delete button
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}
