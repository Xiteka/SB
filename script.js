const controlButton = document.getElementById("controlButton");
const studentStatus = document.getElementById("studentStatus");

// When you click Kontroll
controlButton.addEventListener("click", function () {

    // Remove pulse first
    // This makes it possible to restart the animation
    studentStatus.classList.remove("pulse");

    // Force the browser to reset the animation
    void studentStatus.offsetWidth;

    // Start the pulse animation
    studentStatus.classList.add("pulse");
});

// When the 3 pulses are finished
studentStatus.addEventListener("animationend", function () {

    // Remove the pulse class
    // The card goes back to normal light green
    studentStatus.classList.remove("pulse");
});


// Updates the time at the bottom
function updateTime() {

    const now = new Date();

    const date = now.toLocaleDateString("no-NO");

    const time = now.toLocaleTimeString("no-NO", {
        hour: "2-digit",
        minute: "2-digit"
    });

    document.getElementById("updatedTime").textContent =
        `${date} kl. ${time} (CEST)`;
}

updateTime();

setInterval(updateTime, 30000);

if ("serviceWorker" in navigator) {

    navigator.serviceWorker
        .register("./sw.js")
        .then(() => {
            console.log("Service worker registered");
        })
        .catch(error => {
            console.log("Service worker error:", error);
        });

}