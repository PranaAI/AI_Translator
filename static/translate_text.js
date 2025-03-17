//const inputText = document.getElementById('inputText');
//const outputText = document.getElementById('outputText');
//const translateBtn = document.getElementById('translateBtn');
//
//
//document.addEventListener("DOMContentLoaded", () => {
//    const loadingScreen = document.getElementById('loadingScreen');
//    const outputText = document.getElementById('outputText');
//    const translateBtn = document.getElementById('translateBtn');
//
//    // Function to show the loading screen
//    function showLoading() {
//        loadingScreen.style.display = 'flex';
//    }
//
//    // Function to hide the loading screen
//    function hideLoading() {
//        loadingScreen.style.display = 'none';
//    }
//
//    // Ensure loading screen is hidden when the page loads
//    hideLoading();
//
//    // Function to handle text translation
//    async function translateText() {
//        console.log("Translating text...");
//        const promptText = document.getElementById('inputText').value.trim();
//        const instruction_id = document.getElementById('systemInstructionList').value;
//        console.log(instruction_id)
//
//        if (!promptText) {
//            console.log('Please enter text to translate.');
//            return;
//        }
//
//        const payload = {
//            prompt: promptText,
//            instruction_id:  instruction_id
////            system_instruction: instructions,
//        };
//        console.log(payload)
////        const url = 'http://150.230.138.1:8100/translate'; // your FastAPI app
////        const url = 'http://127.0.0.1:8100/translate'; // your FastAPI app
//const url = `${serverURL}/translate`;
//        try {
//            showLoading(); // Show the loading screen
//
//            const response = await fetch(url, {
//                method: 'POST',
//                mode: 'cors',
//                headers: {
//                    'Content-Type': 'application/json',
//                    'Accept': 'application/json'
//                },
//                body: JSON.stringify(payload),
//            });
//
//            if (!response.ok) {
//                return response.json().then(err => {
//                    throw new Error(err.detail);
//                });
//            }
//
//            const data = await response.json();
//            hideLoading(); // Hide the loading screen before updating the output
//            outputText.value = data.translated_text;
//
//        } catch (error) {
//            hideLoading(); // Hide the loading screen in case of an error
//            outputText.value = "Error: " + error.message;
//            console.log(`Error: ${error.message}<br><br>
//                Debugging info:<br>
//                - Check if the server (${url}) is running and accessible.<br>
//                - Ensure CORS is enabled on the server.<br>
//                - Check browser console for more details.`);
//        }
//    }
//
//    // Add event listener to the Translate button
//    translateBtn.addEventListener('click', translateText);
//    // Add event listener for Shift + Enter or Ctrl + Enter key combination
//    document.addEventListener('keydown', function(event) {
//        if (event.key === 'Enter') {
//            if (event.shiftKey) {
//                translateText(); // Call the translate function when Shift + Enter is pressed
//            } else if (event.ctrlKey) {
//                translateText(); // Call the translate function when Ctrl + Enter is pressed
//            }
//        }
//    });
//
//});
//




const inputText = document.getElementById('inputText');
const translateBtn = document.getElementById('translateBtn');


document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const outputText = document.getElementById('outputText');
    const selectElement = document.getElementById("systemInstructionList");


    // Function to show the loading screen
    function showLoading() {
        loadingScreen.style.display = 'flex';
    }

    // Function to hide the loading screen
    function hideLoading() {
        loadingScreen.style.display = 'none';
    }

    // Ensure loading screen is hidden when the page loads
    hideLoading();

    // Function to handle text translation
    async function translateText() {
        console.log("Translating text...");
        const promptText = document.getElementById('inputText').value.trim();
        const instruction_id = selectElement.value;
        console.log(instruction_id)

        if (!promptText) {
            console.log('Please enter text to translate.');
            outputText.value = "Please enter text to translate."
            return;
        }
        if (!instruction_id) {
            console.log('Please select a language.');
            outputText.value = "Please select a language."
            return;
        }

        const payload = {
            prompt: promptText,
            instruction_id: instruction_id
        };
        console.log(payload)
        const url = `${serverURL}/translate`;
        try {
            showLoading(); // Show the loading screen

            const response = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                return response.json().then(err => {
                    hideLoading()
                    throw new Error(err.detail);
                });
            }

            const data = await response.json();
            hideLoading(); // Hide the loading screen before updating the output
            outputText.value = data.translated_text;

        } catch (error) {
            hideLoading(); // Hide the loading screen in case of an error
            outputText.value = "Error: " + error.message;
            console.error(`Error: ${error.message}<br><br>
                Debugging info:<br>
                - Check if the server (${url}) is running and accessible.<br>
                - Ensure CORS is enabled on the server.<br>
                - Check browser console for more details.`);
        }
    }

    // Add event listener to the Translate button
    translateBtn.addEventListener('click', translateText);
    // Add event listener for Shift + Enter or Ctrl + Enter key combination
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            if (event.shiftKey) {
                translateText(); // Call the translate function when Shift + Enter is pressed
            } else if (event.ctrlKey) {
                translateText(); // Call the translate function when Ctrl + Enter is pressed
            }
        }
    });

});