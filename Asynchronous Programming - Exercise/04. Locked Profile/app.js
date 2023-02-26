function lockedProfile() {
    const url = "http://localhost:3030/jsonstore/advanced/profiles";
    const main = document.getElementById("main");
    
    const profileClassTamplate = document.querySelector(".profile");
    fetch(url)
    .then(response => response.json())
    .then(data => {
        Object.values(data).forEach((profile, index) => {
            const currentProfileClass = profileClassTamplate.cloneNode(true);
            const allInputs = currentProfileClass.querySelectorAll("input");
            const [radioBtn1, radioBtn2, userNameInput, userEmailInput, userAgeInput] = allInputs;
            const div = currentProfileClass.querySelector("div");
            const btn = currentProfileClass.querySelector("button");

            div.id = `user${index + 1}HiddenFields`;

            radioBtn1.name = `user${index + 1}Locked`;
            radioBtn2.name = `user${index + 1}Locked`;
            userNameInput.name = `user${index + 1}Username`;
            userEmailInput.name = `user${index + 1}Email`;
            userAgeInput.name = `user${index + 1}Age`;

            radioBtn1.checked = true;

            userNameInput.value = profile.username;
            userEmailInput.value = profile.email;
            userAgeInput.value = profile.age;
            userAgeInput.type = "email";

            
            btn.addEventListener("click", () => {
                if (radioBtn1.checked) {
                    return;
                }
                if (div.style.display === "block") {
                    div.style.display = "none";
                    btn.textContent = "Show more";
                } else {
                    div.style.display = "block";
                    btn.textContent = "Hide it";
                }
            });

            main.appendChild(currentProfileClass);
        });
        profileClassTamplate.remove();
    })
    .catch(error => console.log(error));
}