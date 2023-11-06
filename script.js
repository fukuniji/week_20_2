const requestOption = document.getElementById("request-options");
const idInput = document.getElementById("request-id");
const searchBtn = document.getElementById("searchBtn");

const resultElem = document.getElementById("result");
const errorElem = document.getElementById("error");

// async function getInfo() {
//     const requestOptionValue = requestOption.value;
//     const idInputValue = idInput.value;
//     errorElem.textContent = "";
//     try {
//         const response = await fetch(
//             `https://swapi.dev/api/${requestOptionValue}/${idInputValue}/`
//         );
//         if (!response.ok) {
//             if (response.status == 404) {
//                 throw new Error(`Data not found`);
//             } else if (response.status >= 500 && response.status < 600) {
//                 throw new Error(`Server's not responding`);
//             } else {
//                 throw new Error(`Error: ${response.status}`);
//             }
//         }
//         const data = await response.json();

//         if (idInputValue === "") {
//             resultElem.textContent = "Enter a number from 1 to 10";
//         } else if (requestOptionValue === "films") {
//             resultElem.textContent = `Film: ${data.title}`;
//         } else if (requestOptionValue === "species") {
//             resultElem.textContent = `Species: ${data.name}`;
//         } else {
//             resultElem.textContent = `Name: ${data.name}`;
//         }
//     } catch (error) {
//         resultElem.textContent = "";
//         errorElem.textContent = error;
//     } finally {
//         console.log("A request to the API was made");
//     }
// }

// searchBtn.addEventListener("click", getInfo);

/// Added loader:

searchBtn.addEventListener("click", async () => {
    const requestOptionValue = requestOption.value;
    const idInputValue = idInput.value;
    errorElem.textContent = "";

    document.getElementById("loader").style.display = "block";
    resultElem.style.display = "none";

    try {
        const response = await fetch(
            `https://swapi.dev/api/${requestOptionValue}/${idInputValue}/`
        );
        if (!response.ok) {
            if (response.status == 404) {
                throw new Error(`Data not found`);
            } else if (response.status >= 500 && response.status < 600) {
                throw new Error(`Server's not responding`);
            } else {
                throw new Error(`Error: ${response.status}`);
            }
        }
        const data = await response.json();

        if (idInputValue === "") {
            resultElem.textContent = "Enter a number from 1 to 10";
        } else if (requestOptionValue === "films") {
            resultElem.textContent = `Film: ${data.title}`;
        } else if (requestOptionValue === "species" && data.name == "Droid") {
            resultElem.innerHTML = `Species: ${data.name}<br><small><em>These aren't the <mark>droids</mark> you're looking for.</em></small>`;
        } else if (requestOptionValue === "species") {
            resultElem.textContent = `Species: ${data.name}`;
        } else {
            resultElem.textContent = `Name: ${data.name}`;
        }

        resultElem.style.display = "block";
        document.getElementById("loader").style.display = "none";
    } catch (error) {
        document.getElementById("loader").style.display = "none";
        resultElem.textContent = "";
        errorElem.textContent = error;
    } finally {
        console.log("A request to the API was made");
    }
});
