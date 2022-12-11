"use strict";

// Sử dụng document.getElementById để lấy ra Dom element:
const findBtn = document.getElementById("find-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");

// tạo mảng petArr

let breedArrStorage = JSON.parse(getFromStorage("key"));

let petArrStorage = JSON.parse(getFromStorage("key"));
if (petArrStorage === null) petArrStorage = [];
let petArr = petArrStorage;

// Thêm dấu tích cho pet:
const checkText = (booleanText) => {
  if (booleanText) {
    return "bi bi-check-circle-fill";
  } else {
    return "bi bi-x-circle-fill";
  }
};
console.log(petArr);

// Hiển thị danh sách thú cưng:
function renderTableData(petArr) {
  // Xóa nội dung ban đầu trên bảng:
  tableBodyEl.innerHTML = "";

  // Tạo bảng với danh sách thú cưng:
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `<th scope="row">${petArr[i].id}</th>
      <td>${petArr[i].name}</td>
      <td>${petArr[i].age}</td>
      <td>${petArr[i].type}</td>
      <td>${petArr[i].weight}</td>
      <td>${petArr[i].petLength}</td>
      <td>${petArr[i].breed}</td>
      <td>
        <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
      </td>
      <td><i class="${checkText(petArr[i].vaccinated)}"></i></td>
      <td><i class="${checkText(petArr[i].dewormed)}"></i></td>
      <td><i class="${checkText(petArr[i].sterilized)}"></i></td>
      <td>${petArr[i].date}</td>
      `;
    tableBodyEl.appendChild(row);
  }
}

// Search Pet
function searchPet() {
  let id = idInput.value;
  let name = nameInput.value;
  let vaccinated = vaccinatedInput.checked;
  let dewormed = dewormedInput.checked;
  let type = typeInput.value;
  let breed = breedInput.value;
  let sterilized = sterilizedInput.checked;

  let result = [];
  for (let i = 0; i < petArr.length; i++) {
    let pet = petArr[i];

    if (
      !(
        pet.id.includes(id) &&
        pet.name.includes(name) &&
        (pet.vaccinated == vaccinated || !vaccinated) &&
        (pet.dewormed == dewormed || !dewormed) &&
        (pet.sterilized == sterilized || !sterilized)
      )
    )
      continue;
    console.log("check");
    if (
      (pet.type == type || type == "Select Type") &&
      (pet.breed == breed || breed == "Select Breed")
    ) {
      result.push(pet);
    }
  }

  console.log(result);

  return result;
}

findBtn.addEventListener("click", function () {
  renderTableData(searchPet());
});

renderTableData(searchPet());

// Assignment 02:

// Lấy DOM element cho sidebar:
const sideBar = document.getElementById("sidebar");

// Thêm animation cho Sidebar
sideBar.addEventListener("click", function () {
  this.classList.toggle("active");
});

// Lưu storage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

function getFromStorage(key) {
  return localStorage.getItem(key);
}

// Khai báo breed

const breedSelection = [
  { breed: "Mixed Breed", type: "Cat" },
  { breed: "Tabby", type: "Cat" },
  { breed: "Domestic Short Hair", type: "Cat" },
  { breed: "Persian", type: "Cat" },
  { breed: "Mixed Breed", type: "Dog" },
  { breed: "Husky", type: "Dog" },
  { breed: "Doberman Pinscher", type: "Dog" },
];
console.log(breedSelection);

//Hiển thị breed
function renderBreed(inputValue) {
  const filterType = breedSelection.filter(
    (item) => item.type === `${inputValue}`
  );
  console.log(filterType);

  let selectOptions = breedInput.childNodes;
  for (let i = selectOptions.length - 1; i >= 0; i--) {
    selectOptions[i].remove();
  }

  for (let i = 0; i < filterType.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = filterType[i].breed;
    breedInput.appendChild(option);
  }
}
typeInput.addEventListener("change", function () {
  renderBreed(`${typeInput.value}`);
});

// renderBreed();
