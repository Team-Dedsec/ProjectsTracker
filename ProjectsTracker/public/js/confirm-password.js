let passInput = document.getElementById("tb-password"),
    confirmPasswordInput = document.getElementById("tb-confirm");

function validatePassword() {
    if (passInput.value.length < 6) {
        passInput.setCustomValidity("Your password must be at least 6 characters long!");
    } else if (!passInput.value.match(/^[A-Za-z0-9_.!@#$%^&*(){}:"<>?~|]+$/)) {
        passInput.setCustomValidity("Your password can only contain alphabetical characters, numerics and the characters _.!@#$%^&*(){}:\"<>?~|]!");
    } else {
        passInput.setCustomValidity("");
    }

    if (passInput.value === confirmPasswordInput.value) {
        confirmPasswordInput.setCustomValidity("");
    } else {
        confirmPasswordInput.setCustomValidity("Passwords don't match");
    }
}

passInput.onchange = validatePassword;
confirmPasswordInput.onkeyup = validatePassword;