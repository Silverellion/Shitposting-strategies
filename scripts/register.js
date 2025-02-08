const emptyFields = document.getElementById("emptyFields");
const dupeUser = document.getElementById("dupeUser");
const passwordNotMatching = document.getElementById("passwordNotMatching");
const captchaUnsolved = document.getElementById("captchaUnsolved");

const registerButton = document.getElementById("registerButton");

registerButton.addEventListener("click", async function() {
    emptyFields.style.display = "none";
    dupeUser.style.display = "none";
    passwordNotMatching.style.display = "none";
    captchaUnsolved.style.display = "none";

    const usernameReg = document.getElementById("usernameReg").value.trim();
    const emailReg = document.getElementById("emailReg").value.trim();
    const passwordReg1 = document.getElementById("passwordReg1").value.trim();
    const passwordReg2 = document.getElementById("passwordReg2").value.trim();  

    if(usernameReg === "" || emailReg === "" || passwordReg1 === "" || passwordReg2 === "") {
        emptyFields.style.display = "flex";
        return;
    }
    if(passwordReg1 != passwordReg2) {
        passwordNotMatching.style.display = "flex";
        return;
    }
    if(getVerified() === false) {
        captchaUnsolved.style.display = "flex";
        return;
    }
    
    try {
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                username: usernameReg,
                email: emailReg, 
                password: passwordReg1
            })
        });
    
        const result = await response.json();
        console.log("Response:", result);
    
        if (!response.ok) {
            if(result.error === "dupeUser") {
                dupeUser.style.display = "flex";
                return;
            }
            alert(result.error || "Registration failed");
        } else {
            window.location.href = "../html/login.html";
        }
    } catch (error) {
        console.error("Error:", error);
    }    
});