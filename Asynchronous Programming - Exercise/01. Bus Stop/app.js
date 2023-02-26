function getInfo() {
    let id = document.querySelector("#stopId").value; 
    
    let url = `http://localhost:3030/jsonstore/bus/businfo/${id}`;
    const stopName = document.querySelector("#stopName"); 
    const ul = document.querySelector("#buses");

    clear();
    fetch(url, {
        method: "GET", 
    })
        .then(response => response.json())
        .then(data => responseHendler(data))
        .catch(error => {
            showError();
        })

    function responseHendler(rowData){
        
        if(typeof rowData != "object" ||
           typeof rowData.name != "string" ||
           typeof rowData.buses != "object"){
            showError();
            return; 
           }
        
        
        let name = rowData.name; 
        let buses = rowData.buses;

        stopName.textContent = name; 

        for(let busId in buses){
            const li = document.createElement("li"); 
            li.textContent = `Bus ${busId} arrives in ${buses[busId]} minutes`;
            ul.appendChild(li);
        }

    }

    function showError(){
        document.querySelector("#stopName").textContent = "Error";
    }

    function clear(){
        stopName.textContent = "";
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
          }
    }
}
