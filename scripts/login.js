const emptyFields = document.getElementById("emptyFields");
const incorrectPassword = document.getElementById("incorrectPassword");
const captchaUnsolved = document.getElementById("captchaUnsolved");

const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", async function(){
    emptyFields.style.display = "none";
    incorrectPassword.style.display = "none";
    captchaUnsolved.style.display = "none";

    const usernameLog = document.getElementById("usernameLog").value.trim();
    const passwordLog = document.getElementById("passwordLog").value.trim();

    if(usernameLog === "" || passwordLog === "") {
        emptyFields.style.display = "flex";
        return;
    }
    if(getVerified() === false) {
        captchaUnsolved.style.display = "flex";
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({ 
                username: usernameLog, 
                password: passwordLog 
            })
        });

        const result = await response.json(); 
        console.log("Response:", result);

        if (!response.ok) {
            incorrectPassword.style.display = "flex";
        } else {
            window.location.href = "../html/home.html";
        }
    } catch (error) {
        console.error(error);
    }
});
