function attachEvents() {
  const url = "http://localhost:3030/jsonstore/phonebook";

  const loadBtn = document.getElementById("btnLoad");
  const createBtn = document.getElementById("btnCreate");

  loadBtn.addEventListener("click", loadHendler);
  createBtn.addEventListener("click", createHendler);

  async function createHendler(e) {
    try {
      const personeInput = document.getElementById("person").value;
      const phoneInput = document.getElementById("phone").value;
      document.getElementById("person").value = "";
      document.getElementById("phone").value = "";

      //TODO: Add the Fetch

      const data = {
        person: personeInput,
        phone: phoneInput,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if(!response.ok) throw new Error(); 
      else console.log("Send successful");
      loadBtn.dispatchEvent(new Event("click"));

    } catch (error) {
        console.log(error);
    }
  }

  async function loadHendler(e) {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const data = await res.json();
      const phonebook = document.getElementById("phonebook");
      phonebook.innerHTML = "";

      Object.entries(data).forEach(([key, value]) => {
        const person = value.person;
        const phone = value.phone;
        const id = value._id;

        const li = document.createElement("li");
        const deleteBtn = document.createElement("button");

        deleteBtn.addEventListener("click",async () => {
            try {
                const response = await fetch(`${url}/${key}`, {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                    }
                  });
                  if(!response.ok) throw new Error(); 
                  else console.log("Delete successful");
                 
            } catch (error) {
                console.log(error);
            }
        });

        deleteBtn.textContent = "Delete";
        li.textContent = `${person}: ${phone}`;
        li.id = id;
        li.appendChild(deleteBtn);
        phonebook.appendChild(li);
      });
    } catch (error) {}
    
  }
}

attachEvents();
