"use strict";

// Sử dụng document.getElementById để lấy ra Dom element:
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
const healthyBtn = document.getElementById("healthy-btn");

// tạo mảng petArr
let healthyCheck = false;

let petArrStorage = JSON.parse(getFromStorage("key"));
if (petArrStorage === null) petArrStorage = [];
let petArr = petArrStorage;

let healthyPetArr = [];

// Tạo clearInput:
const clearText = function (...inputVarName) {
  for (let i of inputVarName) {
    i.value = "";
  }
};

const clearInput = function () {
  clearText(idInput, nameInput, ageInput, weightInput, lengthInput);
  colorInput.value = "#000000";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
  typeInput.value = "Select Type";
  breedInput.value = "Select Breed";
};

// Kiểm tra giá trị được nhập:
function checkValue(inputData, proper, min, max) {
  if (inputData[proper] < min || inputData[proper] > max) {
    alert(`${proper} must be between ${min} and ${max}`);
    return false;
  } else {
    return true;
  }
}

// Thêm dấu tích cho pet:
const checkText = (booleanText) => {
  if (booleanText) {
    return "bi bi-check-circle-fill";
  } else {
    return "bi bi-x-circle-fill";
  }
};
console.log(petArr);
// Render data từ localStorage
renderTableData(petArr);

// Thêm Event khi nhấn nút submit:
submitBtn.addEventListener("click", function (e) {
  // Lấy dữ liệu từ các Input Form:
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: ageInput.value,
    type: typeInput.value,
    weight: weightInput.value,
    petLength: lengthInput.value,
    color: colorInput.value,

    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };
  console.log(data);
  const validate = validateData(data);

  if (validate) {
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].id === data.id) {
        petArr[i] = data;
      }
    }
    clearInput();
    renderTableData(petArr);
    console.log(petArr);
    saveToStorage("key", JSON.stringify(petArr));
  }
});

function validateData(inputData) {
  // Sử dụng Object.keys để lấy mảng gồm các tên biến của data
  const keys = Object.keys(inputData);
  // Tạo thông báo khi không nhập liệu vào các ô
  for (let i = 0; i < keys.length; i++) {
    if (inputData[keys[i]] === "") {
      alert(`Please input for ${keys[i]}`);
      return false;
    } else if (
      inputData[keys[i]] === "Select Breed" ||
      inputData[keys[i]] === "Select Type"
    ) {
      alert(`Please select ${keys[i]}!`);
      return false;
    }
  }

  // Tạo thông báo khi nhập dữ liệu không hợp lệ
  if (
    !checkValue(inputData, "age", 1, 15) ||
    !checkValue(inputData, "weight", 1, 15) ||
    !checkValue(inputData, "length", 1, 100)
  )
    return false;

  // Chuyển qua bước tiếp theo nếu các giá trị nhập đều chính xác và đầy đủ:
  return true;
}

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
      <td>
      <button class="btn btn-warning" onclick="startEditPet('${i}')">Edit</button>
      </td>`;
    tableBodyEl.appendChild(row);
  }
}
// Edit Pet
const startEditPet = (i) => {
  let petArr = JSON.parse(getFromStorage("key"));

  let pet = petArr[i];
  console.log(pet);
  idInput.value = pet.id;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  weightInput.value = pet.weight;
  lengthInput.value = pet.petLength;
  colorInput.value = pet.color;
  renderBreed(pet.type);
  breedInput.value = pet.breed;
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilized;
};

// Cập nhật bảng:
const updateTable = () => {
  if (healthyCheck) {
    renderTableData(healthyPetArr);
  } else {
    renderTableData(petArr);
  }
};

// Assignment 02:

// Lấy DOM element cho sidebar:
const sideBar = document.getElementById("sidebar");

// Thêm animation cho Sidebar
// sideBar.addEventListener("click", function () {
//   this.classList.toggle("active");
// });

// Lưu storage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

function getFromStorage(key) {
  return localStorage.getItem(key);
}

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
