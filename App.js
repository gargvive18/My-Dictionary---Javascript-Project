const bodyElement = document.querySelector("body");
const textElement = document.querySelector(".text");

function display() {
    const searchText = document.getElementById('search').value;
    
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchText}`)
    .then((res) => res.json())
    .then((output) => {
        for(let data of output) {
            const definition = (data["meanings"][0]["definitions"][0]["definition"]);
            
            const textData = {
                key : searchText,
                value : definition,
            };

            let existingData = JSON.parse(localStorage.getItem("words"));
            if(existingData == null) existingData = [];
            localStorage.setItem("words", JSON.stringify(textData));
            // Save allEntries back to local storage
            existingData.push(textData);
            localStorage.setItem("words", JSON.stringify(existingData));

            // const localData = JSON.parse(localStorage.getItem("words"));
            // if(localData && localData.length > 0) {
            //     localData.push(textData);
            //     localStorage.setItem("words", JSON.stringify(localData));
            // }
            // else{
            //     localStorage.setItem("words", JSON.stringify(textData));
            // }
            console.log(localStorage);
            textElement.textContent = definition;
        }
    })  
}

function displayHistory() {
    // alert("hello");
    textElement.textContent = "";
    let historyElement = document.querySelector(".history");
    console.log("historyElement = "+historyElement);
    console.log(historyElement);

    // let paraElement = document.createElement("p");
    // const node = document.createTextNode("This is a paragraph.");
    // paraElement.appendChild(node);
    // historyElement.appendChild(paraElement);



    const localData = JSON.parse(localStorage.getItem("words"));
    console.log("Parsed local data")
    console.log(localData);
    if(localData && localData.length > 0) {
        for(let data of localData) {
            console.log("I am in");
            let paraElement = document.createElement("p");
            const node = document.createTextNode(`${data["key"]} : ${data["value"]}`);
            //paraElement.textContent = `${data["key"]} : ${data["value"]}`;
            paraElement.appendChild(node);
            historyElement.appendChild(paraElement);
        
        }
    }
}

function deleteHistory(){
    localStorage.setItem("words", JSON.stringify([]));
    let historyElement = document.querySelector(".history");
    historyElement.removeChild();
}