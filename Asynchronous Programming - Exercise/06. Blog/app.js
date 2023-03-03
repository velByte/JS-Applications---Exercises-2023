function attachEvents() {
    const loadPostBtn = document.getElementById('btnLoadPosts');
    const loadViewPostBut = document.getElementById("btnViewPost");
    loadPostBtn.addEventListener("click", loadPosts); 
    loadViewPostBut.addEventListener("click", viewPost);

    const posts = [];

    async function loadPosts(){
        try {
            const url = `http://localhost:3030/jsonstore/blog/posts`;
            const response = await fetch(url); 
            if(!response.ok) throw new Error(); 
            const data = await response.json(); 
            document.getElementById("posts").innerHTML = ""; //Do not forget to clear its content beforehand.

            Object.entries(data).forEach(([key, value]) => {
                const optionElement = document.createElement("option"); 
                optionElement.value = key; 
                optionElement.textContent = value.title;
                document.getElementById("posts").appendChild(optionElement);
                posts.push({title: value.title, body: value.body})
            })

        } catch (err) {
            console.log(err);
        }
    }; 

    async function viewPost(){
        try {
            const selectElement = document.getElementById("posts"); 
            console.log(selectElement.value);
            const url = `http://localhost:3030/jsonstore/blog/comments`;
            const res = await fetch(url); 
            if(!res.ok) throw new Error(); 
            
            const data = await res.json();

            const comments  = Object.entries(data).filter(el => el[1].postId === selectElement.value); 

            document.getElementById("post-title").innerHTML = ""; 
            document.getElementById("post-title").textContent = selectElement.selectedOptions[0].textContent; 

            const po = posts.filter(p => p.title === selectElement.selectedOptions[0].textContent);
            document.getElementById("post-body").innerHTML = ""; 
            document.getElementById("post-body").textContent = po[0].body; 

            const postComments = document.getElementById("post-comments");

            comments.forEach(comment => {
                const tempLi = document.createElement("li"); 
                console.log(comment[1]);
                tempLi.id = comment[1].id;
                tempLi.textContent = comment[1].text;
                postComments.appendChild(tempLi)
            })

        } catch (err) {
            console.log(err);
        }
    };
}

attachEvents();