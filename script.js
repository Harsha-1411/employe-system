document.addEventListener('DOMContentLoaded', () => {
    fetchEmployees();
});

document.getElementById('employeeForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const date = document.getElementById('date').value;

    const response = await fetch('http://localhost:3000/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, role, dateOfJoining: date })
    });

    const newEmployee = await response.json();
    addEmployeeToTable(newEmployee);
    document.getElementById('employeeForm').reset();
});

async function fetchEmployees() {
    const response = await fetch('http://localhost:3000/employees');
    const employees = await response.json();
    employees.forEach(addEmployeeToTable);
}

function addEmployeeToTable(employee) {
    const table = document.getElementById('employeeTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td>${employee.name}</td>
        <td>${employee.role}</td>
        <td>${new Date(employee.dateOfJoining).toLocaleDateString()}</td>
        <td><button class="delete" onclick="deleteEmployee('${employee._id}')">Delete</button></td>
    `;
}

async function deleteEmployee(id) {
    await fetch(`http://localhost:3000/employees/${id}`, { method: 'DELETE' });
    document.querySelector(`button[onclick="deleteEmployee('${id}')"]`).closest('tr').remove();
}
