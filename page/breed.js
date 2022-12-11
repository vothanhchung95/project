"use strict";

// Sử dụng document.getElementById để lấy ra Dom element:
const submitBtn = document.getElementById("submit-btn");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const tableBodyEl = document.getElementById("tbody");

// tạo mảng breedArr

let breedArrStorage = JSON.parse(getFromStorage("key"));
let breedArr = breedArrStorage;
if (breedArrStorage === null) breedArrStorage = [];

// Tạo clearInput:
const clearText = function (...inputVarName) {
  for (let i of inputVarName) {
    i.value = "";
  }
};

const clearInput = function () {
  typeInput.value = "Select Type";
  breedInput.value = "Select Breed";
};

// Render data từ localStorage
renderTableData(breedArr);

// Thêm Event khi nhấn nút submit:
submitBtn.addEventListener("click", function (e) {
  // Lấy dữ liệu từ các Input Form:
  const data = {
    type: typeInput.value,
    breed: breedInput.value,
  };
  const validate = validateData(data);
  if (validate) {
    breedArr.push(data);
    clearInput();
    renderTableData(breedArr);
    console.log(breedArr);
    saveToStorage("key", JSON.stringify(breedArr));
  }
});

// Validate
function validateData(inputData) {
  // Sử dụng Object.keys để lấy mảng gồm các tên biến của data
  const keys = Object.keys(inputData);
  // Tạo thông báo khi không nhập liệu vào các ô
  for (let i = 0; i < keys.length; i++) {
    if (
      inputData[keys[i]] === "Select Breed" ||
      inputData[keys[i]] === "Select Type"
    ) {
      alert(`Please select ${keys[i]}!`);
      return false;
    }
  }

  // Chuyển qua bước tiếp theo nếu các giá trị nhập đều chính xác và đầy đủ:
  return true;
}

// Hiển thị danh sách thú cưng:
function renderTableData(breedArr) {
  // Xóa nội dung ban đầu trên bảng:
  tableBodyEl.innerHTML = "";

  // Tạo bảng với danh sách thú cưng:
  for (let i = 0; i < breedArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `<th scope="row">${i + 1}</th>
      <td>${breedArr[i].breed}</td>
      <td>${breedArr[i].type}</td>  
      <td>
      <button class="btn btn-danger" onclick="deletePet('${i}')">Delete</button>
      </td>`;
    tableBodyEl.appendChild(row);
  }
}

//Xóa 1 thú cưng:
const deletePet = (i) => {
  //Xác nhận trước khi xóa
  if (confirm("Are you sure?")) {
    breedArr.splice(i, 1);
    saveToStorage("key", JSON.stringify(breedArr));
  }
  renderTableData(breedArr);
};

// Lưu storage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

function getFromStorage(key) {
  return localStorage.getItem(key);
}

console.log(breedArr);
