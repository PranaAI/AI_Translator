//document.getElementById("copyBtn").addEventListener("click", function () {
//    // Get the outputText textarea element
//    const outputText = document.getElementById("outputText");
//
//    // Select the text inside the textarea
//    outputText.select();
//    outputText.setSelectionRange(0, 99999); // For mobile devices
//
//    // Copy the selected text to the clipboard
//    document.execCommand("copy");
//
//    // Create a notification element
//    const notification = document.createElement("div");
//    notification.innerText = "Copied to clipboard!";
//    notification.style.position = "fixed";
//    notification.style.top = "20px";
//    notification.style.right = "20px";
//    notification.style.padding = "10px";
//    notification.style.backgroundColor = "#4CAF50";
//    notification.style.color = "white";
//    notification.style.borderRadius = "5px";
//    notification.style.fontSize = "14px";
//    notification.style.zIndex = "9999";
//
//    // Append the notification to the body
//    document.body.appendChild(notification);
//
//    // Hide the notification after 2 seconds
//    setTimeout(function () {
//        notification.style.display = "none";
//    }, 2500);
//});
//
//



document.getElementById("copyBtn").addEventListener("click", function () {
    const outputText = document.getElementById("outputText");
    const textToCopy = outputText.value;

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            // Create a notification element
            const notification = document.createElement("div");
            notification.innerText = "Copied to clipboard!";
            notification.style.position = "fixed";
            notification.style.top = "20px";
            notification.style.right = "20px";
            notification.style.padding = "10px";
            notification.style.backgroundColor = "#4CAF50";
            notification.style.color = "white";
            notification.style.borderRadius = "5px";
            notification.style.fontSize = "14px";
            notification.style.zIndex = "9999";

            document.body.appendChild(notification);

            setTimeout(function () {
                notification.style.display = "none";
            }, 2500);
        })
        .catch(err => {
            console.error('Could not copy text: ', err);
            alert('Failed to copy text. Please copy manually.'); // Provide user feedback
        });
});


