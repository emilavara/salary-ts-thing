"use strict";
var contractStatus;
(function (contractStatus) {
    contractStatus[contractStatus["renew"] = 0] = "renew";
    contractStatus[contractStatus["cancel"] = 1] = "cancel";
})(contractStatus || (contractStatus = {}));
const employees = [
    {
        id: 1,
        name: "Emil",
        salary: 5000,
        consulting: false,
    },
    {
        id: 2,
        name: "Kaj",
        salary: 50000,
        consulting: true,
        contractEndDate: "2026-12-31",
        contractStatus: contractStatus.renew,
    },
    {
        id: 3,
        name: "Kemal",
        salary: 35000,
        consulting: true,
        contractEndDate: "2025-12-31",
        contractStatus: contractStatus.cancel,
    },
];
let tableContainer = document.querySelector("table");
let editSalaryModal = document.querySelector('#editSalaryModal');
let editSalaryModalTitle = document.querySelector('#editSalaryModalTitle');
let editSalaryInput = document.querySelector('#editSalaryInput');
let editSalaryDoneBtn = document.querySelector('#editSalaryDoneBtn');
let editContractModal = document.querySelector('#editContractModal');
let editContractModalTitle = document.querySelector('#editContractModalTitle');
let editContractDateInput = document.querySelector('#editContractDateInput');
let editContractCheckbox = document.querySelector('#editContractCheckbox');
let editContractDoneBtn = document.querySelector('#editContractDoneBtn');
function renderTable() {
    let htmlToRender = `
        <tr>
            <th>Name</th>
            <th>Salary</th>
            <th>Consultant</th>
            <th>Contract Status</th>
            <th>Contract Expiry Date</th>
            <th>Edit Actions</th>
        </tr>
    `;
    employees.forEach((emp) => {
        htmlToRender += `
            <tr>
                <td>${emp.name}</td>
                <td>${emp.salary}</td>
                <td>${emp.consulting ? 'Yes' : 'No'}</td>
                <td>${emp.contractStatus === contractStatus.renew ? 'Renew' : emp.contractStatus === contractStatus.cancel ? 'Cancel' : emp.contractStatus === undefined ? 'N / A' : ''}</td>
                <td>${emp.contractEndDate != null ? emp.contractEndDate : 'N / A'}</td>
                <td>
                    <button onclick="editSalary(${emp.id})">Salary</button>
                    <button class="${emp.consulting ? '' : 'hidden'}" onclick="editContract(${emp.id})">Contract</button>
                </td>
            </tr>
        `;
    });
    tableContainer.innerHTML = htmlToRender;
}
function editSalary(id) {
    let salaryToEdit = employees.find((emp) => {
        return emp.id === id;
    });
    if (salaryToEdit) {
        editSalaryModal.showModal();
        editSalaryModalTitle.innerText = "Edit salary for " + salaryToEdit.name;
        editSalaryInput.value = salaryToEdit.salary.toString();
        editSalaryDoneBtn.addEventListener('click', () => {
            salaryToEdit.salary = parseInt(editSalaryInput.value);
            editSalaryModal.close();
            renderTable();
        }, { once: true });
    }
}
function editContract(id) {
    var _a;
    let contractToEdit = employees.find((emp) => {
        return emp.id === id;
    });
    if (contractToEdit) {
        editContractModal.showModal();
        editContractModalTitle.innerText = "Edit contract for " + contractToEdit.name;
        editContractDateInput.value = (_a = contractToEdit.contractEndDate) !== null && _a !== void 0 ? _a : '';
        if (contractToEdit.contractStatus === contractStatus.renew) {
            editContractCheckbox.checked = true;
        }
        editContractDoneBtn.addEventListener('click', () => {
            if (editContractCheckbox.checked === true) {
                contractToEdit.contractStatus = contractStatus.renew;
            }
            else {
                contractToEdit.contractStatus = contractStatus.cancel;
            }
            contractToEdit.contractEndDate = editContractDateInput.value;
            editContractModal.close();
            renderTable();
        }, { once: true });
    }
}
renderTable();
