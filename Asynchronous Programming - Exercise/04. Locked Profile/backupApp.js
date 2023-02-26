function lockedProfile() {
    const url = "http://localhost:3030/jsonstore/advanced/profiles";
    const main = document.querySelector("#main");

    (async function() {
        try {
            const response = await fetch(url);
            const data = await response.json();
            
            loopData(data);

            

        } catch (error) {
            
        }
      })();
      let index = 0; 
      function loopData(data){
        for (let key in data){
            createProfileCard(data[key]);
        }
      }

      function createProfileCard(profileData){
        const {_id, username, email, age} = profileData; 
        const htmlProfileCard = createUserProfile(username, email, age);

        main.appendChild(htmlProfileCard);

    }

    function createUserProfile(username, email, age) {
        index++;
        const prifileDiv = document.createElement("div"); 
        prifileDiv.classList.add("profile");

        const imageTag = document.createElement("img"); 
        imageTag.src = "./iconProfile2.png";
        imageTag.classList.add("userIcon");
        prifileDiv.appendChild(imageTag);

        const lockLabel = document.createElement("label");
        lockLabel.textContent = "Lock"
        prifileDiv.appendChild(lockLabel);

        const inputTag1 = document.createElement("input"); 
        inputTag1.type = "radio"; 
        // inputTag1.name = "user1Locked";
        inputTag1.name = `user${index}Locked`;
        inputTag1.value = "lock"
        inputTag1.checked = true; 
        prifileDiv.appendChild(inputTag1);

        const unlockLabel = document.createElement("label");
        unlockLabel.textContent = "Unlock"
        prifileDiv.appendChild(unlockLabel);

        const inputTag2 = document.createElement("input"); 
        inputTag2.type = "radio"; 
        inputTag2.name = `user${index}Locked`;
        inputTag2.value = "unlock"
        inputTag2.checked = false; 
        prifileDiv.appendChild(inputTag2);
        prifileDiv.appendChild(document.createElement("br"))
        prifileDiv.appendChild(document.createElement("hr"))

        const userLabel = document.createElement("label");
        userLabel.textContent = "Username"
        prifileDiv.appendChild(userLabel);

        const userNameInput = document.createElement("input"); 
        userNameInput.type = "text"; 
        // userNameInput.name = "user1Username"; 
        userNameInput.name = `user${index}Username`; 
        userNameInput.value = username; 
        userNameInput.disabled = true; 
        userNameInput.readOnly = true;
        prifileDiv.appendChild(userNameInput);

        const usernameDiv = document.createElement("div"); 
        usernameDiv.id = `user${index}HiddenFields`;
        prifileDiv.appendChild(usernameDiv);

        usernameDiv.appendChild(document.createElement("hr"))

        const emailLabel = document.createElement("label")
        emailLabel.textContent = "Email:";
        usernameDiv.appendChild(emailLabel); 

        const emailInput = document.createElement("input"); 
        emailInput.type = "email"; 
        // emailInput.name = "user1Email";
        emailInput.name = `user${index}Email`;
        emailInput.value = email; 
        emailInput.disabled = true; 
        emailInput.readOnly = true;
        usernameDiv.appendChild(emailInput);

        const ageLabel = document.createElement("label")
        ageLabel.textContent = "Age:";
        usernameDiv.appendChild(ageLabel); 

        const ageInput = document.createElement("input"); 
        ageInput.type = "text"; 
        // ageInput.name = "user1Age";
        ageInput.name = `user${index}Age`;
        ageInput.value = age; 
        ageInput.disabled = true; 
        ageInput.readOnly = true;
        usernameDiv.appendChild(ageInput);

        const btn = document.createElement("button"); 
        btn.textContent = "Show more"; 
        btn.addEventListener("click", btnClickHendler);
        prifileDiv.appendChild(btn);

        function btnClickHendler(event){
            
        }
        console.log(prifileDiv);
        return prifileDiv;
      }
      
      
      
}