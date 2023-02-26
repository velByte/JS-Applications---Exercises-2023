function solve() {

    const departBtn = document.querySelector("#depart");
    const arriveBtn = document.querySelector("#arrive");
    const infoSpan = document.querySelector(".info");

    let name; 
    let next = "depot"; 

    function depart() {
        fetch(`http://localhost:3030/jsonstore/bus/schedule/${next}`)
        .then(response => response.json())
        .then(data => {
             name = data.name; 
             next = data.next; 
            infoSpan.textContent = `Next stop ${name}`;
            departBtn.disabled = true;
            arriveBtn.disabled = false;

        })
        .catch(error => console.log(err));

    }

    function arrive() {
        departBtn.disabled = false;
        arriveBtn.disabled = true;
        infoSpan.textContent = `Arriving at ${name}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();




// {
//     "name": "Depot",
//     "next": "0361"
// }