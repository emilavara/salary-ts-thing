enum contractStatus {
  "renew",
  "cancel",
}

interface Employee {
  id: number;
  name: string;
  salary: number;
  consulting: boolean;
  contractEndDate?: string;
  contractStatus?: contractStatus;
}

const employees: Employee[] = [
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

let tableContainer = document.querySelector("table")! as HTMLTableElement;

let editSalaryModal = document.querySelector('#editSalaryModal')! as HTMLDialogElement
let editSalaryModalTitle = document.querySelector('#editSalaryModalTitle')! as HTMLLegendElement

let editSalaryInput = document.querySelector('#editSalaryInput')! as HTMLInputElement
let editSalaryDoneBtn = document.querySelector('#editSalaryDoneBtn')! as HTMLButtonElement

let editContractModal = document.querySelector('#editContractModal')! as HTMLDialogElement
let editContractModalTitle = document.querySelector('#editContractModalTitle')! as HTMLLegendElement
let editContractDateInput = document.querySelector('#editContractDateInput')! as HTMLInputElement
let editContractCheckbox = document.querySelector('#editContractCheckbox')! as HTMLInputElement
let editContractDoneBtn = document.querySelector('#editContractDoneBtn')! as HTMLButtonElement


function renderTable(): void {
    let htmlToRender = `
        <tr>
            <th>Name</th>
            <th>Salary</th>
            <th>Consultant</th>
            <th>Contract Status</th>
            <th>Contract Expiry Date</th>
            <th>Edit Actions</th>
        </tr>
    `

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
        `
    })

    tableContainer.innerHTML = htmlToRender
}

function editSalary(id: number): void {
    let salaryToEdit = employees.find((emp) => {
        return emp.id === id
    })

    if (salaryToEdit) {
        editSalaryModal.showModal();
        editSalaryModalTitle.innerText = "Edit salary for " + salaryToEdit.name

        editSalaryInput.value = salaryToEdit.salary.toString()

        editSalaryDoneBtn.addEventListener('click', () => {
            salaryToEdit.salary = parseInt(editSalaryInput.value as string)
            editSalaryModal.close();

            renderTable();
        }, {once: true})
    }
}
function editContract(id: number): void {
    let contractToEdit = employees.find((emp) => {
        return emp.id === id
    })

    if (contractToEdit) {
        editContractModal.showModal();
        editContractModalTitle.innerText = "Edit contract for " + contractToEdit.name

        editContractDateInput.value = contractToEdit.contractEndDate ?? ''

        if (contractToEdit.contractStatus === contractStatus.renew) {
            editContractCheckbox.checked = true
        }

        editContractDoneBtn.addEventListener('click', () => {
            if (editContractCheckbox.checked === true) {
                contractToEdit.contractStatus = contractStatus.renew
            } else {
                contractToEdit.contractStatus = contractStatus.cancel
            }

            contractToEdit.contractEndDate = editContractDateInput.value

            editContractModal.close();
            renderTable();
        }, {once: true})
    }
}

renderTable()