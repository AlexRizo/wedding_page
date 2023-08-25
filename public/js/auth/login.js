const url = window.location.hostname.includes("localhost")
    ? "http://localhost:3000"
    : "https://alowee.twc.com";

const token = localStorage.getItem("tkn") || null;

if (token && token.length > 10) {
    window.location = url;
}

const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const btn = document.querySelector("button");

const formData = {};

// Fetch all the forms we want to apply custom Bootstrap validation styles to
const forms = document.querySelectorAll(".needs-validation");

form.addEventListener("submit", ev => {
    ev.preventDefault();

    for (const input of inputs) {
        formData[input.name] = input.value;
    }
    console.log(formData);

    if (!form.checkValidity()) {
        ev.stopPropagation();
        form.classList.add("was-validated");
        return false;
    } else {
        form.classList.add("was-validated");
    }
    
    fetch(`${url}/auth/login`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
    })
        .then((response) => response.json())
        .then(({ error, tkn, uid, ur }) => {
            if (error) {
                sendNotification("Usuario no encontrado", error);
                return console.error(error);
            } else {
                localStorage.setItem("tkn", tkn);
                localStorage.setItem("uid", uid);
                localStorage.setItem("ur", ur);
                location.reload();
            }
        })
        .catch(console.error());
}, false);
