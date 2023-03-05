const url = "http://localhost:3030/jsonstore/collections/books";
const form = document.querySelector("form");
const loadAllBooksBtn = document.getElementById("loadBooks");
const formBtn = document.querySelector("form > button");

formBtn.addEventListener("click", formButtonEventHandler);

loadAllBooksBtn.addEventListener("click", (event) => {
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error();
      } else {
        console.log("Fetch succsessfull");
      }
      return res.json();
    })
    .then((data) => {
      const tbody = document.querySelector("table tbody");
      tbody.innerHTML = "";

      Object.entries(data).forEach(([key, value]) => {
        const author = value.author;
        const title = value.title;
        const id = key;

        const newRow = document.createElement("tr");

        const titleCell = document.createElement("td");
        titleCell.textContent = title;

        const authorCell = document.createElement("td");
        authorCell.textContent = author;

        const editCell = document.createElement("td");
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        editBtn.addEventListener("click", async (event) => {
          console.log("Edit clicked");
          document.querySelector("form h3").textContent = "Edit FORM";
          document.querySelector(
            "body > form > input[type=text]:nth-child(3)"
          ).value = title;
          document.querySelector(
            "body > form > input[type=text]:nth-child(5)"
          ).value = author;
          document.querySelector("body > form > button").textContent = "Save";
          document.querySelector("body > form > button").id = id;
        });

        editCell.appendChild(editBtn);

        const deleteCell = document.createElement("td");
        const deleteBtn = document.createElement("button");
        deleteBtn.addEventListener("click", async (event) => {
          console.log("Delete clicked");
          fetch(`${url}/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(res => {
            if(!res.ok) throw new Error(); 
            console.log("Delete succsessfull!");
          })
          .catch(err => {
            console.log(err);
          })
        });
        deleteBtn.textContent = "Delete";
        deleteCell.appendChild(deleteBtn);

        newRow.appendChild(titleCell);
        newRow.appendChild(authorCell);
        newRow.appendChild(editCell);
        newRow.appendChild(deleteCell);

        newRow.id = id;

        tbody.appendChild(newRow);
      });
    });
});

async function formButtonEventHandler(e) {

  const formData = new FormData(form);
  const author = formData.get("author");
  const title = formData.get("title");

  const data = {
    author,
    title,
  };

  const button = e.target;
  const buttonText = button.textContent;

  switch (buttonText) {
    case "Submit":
      console.log("");
      fetch(`${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (!res.ok) throw new Error();
        })
        .catch((err) => console.error(err));
      break;
    case "Save":
      const id = e.target.id;
      fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (!res.ok) throw new Error();
        })
        .catch((err) => console.error(err));
      break;
    default:
      break;
  }
}
