function solution() {
    const mainSection = document.getElementById("main");
    const baseUrl = "http://localhost:3030/jsonstore/advanced/articles/list";


    getArticles();

    async function getArticles() {
        const response = await fetch(baseUrl);
        const data = await response.json();

        Object.values(data).forEach(createArticle);
    }

    function createArticle(article) {
        const divAccordion = document.createElement("div");
        divAccordion.classList.add("accordion");

        const divHead = document.createElement("div");
        divHead.classList.add("head");

        const span = document.createElement("span");
        span.textContent = article.title;

        const button = document.createElement("button");
        button.classList.add("button");
        button.id = article._id;
        button.textContent = "More";

        button.addEventListener("click", btnClick);

        const divExtra = document.createElement("div");
        divExtra.classList.add("extra");

        const p = document.createElement("p");

        divHead.appendChild(span);
        divHead.appendChild(button);

        divExtra.appendChild(p);

        divAccordion.appendChild(divHead);
        divAccordion.appendChild(divExtra);
        mainSection.appendChild(divAccordion);

        async function btnClick() {
            const url = `http://localhost:3030/jsonstore/advanced/articles/details/${this.id}`;
            const response = await fetch(url);
            const data = await response.json();

            p.textContent = data.content;
            divExtra.style.display = "block";
            button.textContent = "Less";
            button.removeEventListener("click", btnClick);
            button.addEventListener("click", btnClickLess);
        };

        function btnClickLess() {
            p.textContent = "";
            button.textContent = "More";
            divExtra.style.display = "none";
            button.removeEventListener("click", btnClickLess);
            button.addEventListener("click", btnClick);
        }

    }

    

}

solution();