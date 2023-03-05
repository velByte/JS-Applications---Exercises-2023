function attachEvents() {
  const textArea = document.getElementById("messages");
  const refreshBtn = document.getElementById("refresh");
  const sendBtn = document.getElementById("submit");

  const url = "http://localhost:3030/jsonstore/messenger";

  refreshBtn.addEventListener("click", refreshHandler);
  sendBtn.addEventListener("click", sendHandler);

  async function refreshHandler(evenet) {
    textArea.value = "";
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error();
      const data = await res.json();

      let responseArr = [];

      Object.entries(data).forEach(([key, value]) => {
        responseArr.push(`${value.author}: ${value.content}`);
      });
      textArea.value = responseArr.join("\n");
    } catch (error) {
      console.log(error);
    }
  }

  async function sendHandler(event) {
    try {
      const authorInput = document.querySelector('input[name="author"]').value;
      const contentInput = document.querySelector('input[name="content"]').value;

      const data = {
        author: authorInput,
        content: contentInput,
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
    } catch (error) {}
  }
}

attachEvents();

// {
//     author: authorName,
//     content: msgText,
//   }
