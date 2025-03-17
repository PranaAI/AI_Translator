 document.addEventListener("DOMContentLoaded", async () => {
        const instructionsContainer = document.getElementById("instructionsContainer");
        const addNewButton = document.getElementById("addNewButton");
        const newInstructionFormDiv = document.getElementById("newInstructionForm");
        const addInstructionForm = document.getElementById("addInstructionForm");

        // Function to fetch all instructions
        async function fetchInstructions() {
            try {
                const response = await fetch("/instructions_details");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const instructions = await response.json();
                console.log("Instructions from API:", instructions);
                return instructions;
            } catch (error) {
                console.error("Error fetching instructions:", error);
                alert("Failed to load instructions. Check the console for details.");
                return [];
            }
        }

        // Function to create an edit form for an instruction
        function createInstructionForm(instruction, key) {
            const form = document.createElement("form");
            form.classList.add("instruction-form"); // Add a class for styling

            const instructionIdInput = document.createElement("input");
            instructionIdInput.type = "hidden";
            instructionIdInput.value = key;
            form.appendChild(instructionIdInput);

            const languageLabel = document.createElement("label");
            languageLabel.textContent = "Language:";
            const textInput = document.createElement("input");
            textInput.type = "text";
            textInput.name = "text";
            textInput.value = instruction.text;
            form.appendChild(languageLabel);
            form.appendChild(textInput);

            const systemInstructionLabel = document.createElement("label");
            systemInstructionLabel.textContent = "System Instruction:";
            const descriptionTextarea = document.createElement("textarea");
            descriptionTextarea.name = "description";
            descriptionTextarea.rows = 4;
            descriptionTextarea.cols = 50;
            descriptionTextarea.value = instruction.description;
            form.appendChild(systemInstructionLabel);
            form.appendChild(descriptionTextarea);

            const updateButton = document.createElement("button");
            updateButton.type = "submit";
            updateButton.textContent = "Update";
            form.appendChild(updateButton);

             const deleteButton = document.createElement("button");
            deleteButton.type = "button"; // Prevent form submission
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("delete-button"); // Add a class for styling
            form.appendChild(deleteButton);

              deleteButton.addEventListener("click", async () => {
                if (confirm("Are you sure you want to delete this instruction?")) {
                    try {
                        const response = await fetch(`/instructions/${key}`, {
                            method: "DELETE"
                        });

                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }

                        const result = await response.json();
                        alert(result.message); // Show success message

                        // Reload the instructions after deleting
                        loadInstructions();
                    } catch (error) {
                        console.error("Error deleting instruction:", error);
                        alert("Failed to delete instruction. Check the console for details.");
                    }
                }
            });

            // Function to handle form submission
            form.addEventListener("submit", async (event) => {
                event.preventDefault(); // Prevent the default form submission

                const updatedInstruction = {
                    text: textInput.value,
                    description: descriptionTextarea.value
                };

                try {
                    const response = await fetch(`/instructions/${key}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(updatedInstruction)
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    const result = await response.json();
                    alert(result.message); // Show success message
                } catch (error) {
                    console.error("Error updating instruction:", error);
                    alert("Failed to update instruction. Check the console for details.");
                }
            });

            return form;
        }

        // Load and display the instructions
        async function loadInstructions() {
            const instructions = await fetchInstructions();

            if (!instructions || Object.keys(instructions).length === 0) {
                instructionsContainer.textContent = "No instructions found.";
                return;
            }

            Object.keys(instructions).forEach(key => {
                const instruction = instructions[key];
                const form = createInstructionForm(instruction, key);
                instructionsContainer.appendChild(form);
            });
        }

        loadInstructions();

        // Add event listener to the "Add New" button
        addNewButton.addEventListener("click", () => {
            newInstructionFormDiv.style.display = "block"; // Show the new instruction form
        });

        // Add event listener to the new instruction form submission
        addInstructionForm.addEventListener("submit", async (event) => {
            event.preventDefault(); // Prevent the default form submission

            const newText = document.getElementById("newText").value;
            const newDescription = document.getElementById("newDescription").value;

            const newInstruction = {
                text: newText,
                description: newDescription
            };

            try {
                const response = await fetch("/instructions/create-new", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newInstruction)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                alert(result.message); // Show success message

                // Reload the instructions after creating a new one
                newInstructionFormDiv.style.display = "none"; // Hide the form
                loadInstructions();

            } catch (error) {
                console.error("Error creating instruction:", error);
                alert("Failed to create instruction. Check the console for details.");
            }
        });
    });
