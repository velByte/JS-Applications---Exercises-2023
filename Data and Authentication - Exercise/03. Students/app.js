const form = document.getElementById("form");
const submitBtn = document.getElementById("submit");
const url = "http://localhost:3030/jsonstore/collections/students";

loadStudents();

submitBtn.addEventListener("click", (event) => {
//   event.preventDefault();

  const formData = new FormData(form);
  const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }

  const allKeysNotEmpty = isValidStudent(data);
  if (!allKeysNotEmpty) return;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        console.log("Data sent successfully");
      } else {
        console.error("Error sending data");
      }
    })
    .catch((err) => {
      console.error("Error:", err);
    });
});

async function loadStudents() {
  const tbody = document.querySelector("#results tbody");
  tbody.innerHTML = ""; //Remove all data 

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error();
    const data = await res.json();

    Object.entries(data).forEach(([key, value]) => {
      const firstName = value.firstName; 
      const lastName = value.lastName; 
      const facultyNumber = value.facultyNumber; 
      const grade = value.grade; 
      const id = value._id
      const newRow = document.createElement("tr");
      newRow.id = id; 
      newRow.innerHTML = `<td>${firstName}</td><td>${lastName}</td><td>${facultyNumber}</td><td>${grade}</td>`;
      tbody.appendChild(newRow);
    });
  } catch (error) {}
}

function isValidStudent(obj) {
  if (
    typeof obj.firstName !== "string" ||
    obj.firstName.trim() === "" ||
    typeof obj.lastName !== "string" ||
    obj.lastName.trim() === "" ||
    !/^\d+$/.test(obj.facultyNumber) ||
    obj.facultyNumber.trim() === "" ||
    isNaN(obj.grade) ||
    obj.grade.trim() === ""
  ) {
    return false;
  }

  return true;
}
