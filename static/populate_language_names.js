
const selectElement = document.getElementById("systemInstructionList");

async function populateLanguageNames() {
    const url = `${serverURL}/instructions`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });

        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(err.detail);
            });
        }

        const instructions = await response.json();
        console.log(instructions)
        // Clear any existing options
        selectElement.innerHTML = "";

        // Create a default placeholder option
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.disabled = true;
        defaultOption.textContent = "Select Language";
        selectElement.appendChild(defaultOption);

        // Create options for each system instruction
        instructions.forEach((instruction, index) => { // Added index
            const option = document.createElement("option");
            option.value = instruction.value;
            option.textContent = instruction.text;
            selectElement.appendChild(option);

            if (index === 0) { // Select the first language
                selectElement.value = instruction.value;
            }
        });


    } catch (error) {
        outputText.value = "Error: Could not load languages.";
        selectElement.innerHTML = "";
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.textContent = "Error";
        selectElement.appendChild(defaultOption);
        console.error(`Error fetching languages: ${error.message}`);
    }
}

populateLanguageNames();




