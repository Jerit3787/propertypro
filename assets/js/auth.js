document.addEventListener("DOMContentLoaded", () => {
    var createAccountButton = document.querySelector('#create-button');
    var signInButton = document.querySelector("#login-button");
    var nameBack = document.querySelector('#create-name-back');
    var nameNext = document.querySelector('#create-name-next');
    var emailBack = document.querySelector('#create-email-back');
    var emailNext = document.querySelector('#create-email-next');
    var personalizeBack = document.querySelector('#create-personalize-back');
    var personalizeNext = document.querySelector('#create-personalize-next');
    var termsBack = document.querySelector('#create-terms-back');
    var termsNext = document.querySelector('#create-terms-next');

    createAccountButton.addEventListener('click', () => {
        createAccount();
    })

    signInButton.addEventListener('click', () => {
        signIn();
    })

    nameBack.addEventListener('click', () => {
        nameBackFunction();
    })

    nameNext.addEventListener('click', () => {
        nameNextFunction();
    })

    emailBack.addEventListener('click', () => {
        emailBackFunction();
    })

    emailNext.addEventListener('click', () => {
        emailNextFuntion();
    })

    personalizeBack.addEventListener('click', () => {
        personalizeBackFunction();
    })

    personalizeNext.addEventListener('click', () => {
        personalizeNextFunction();
    })

    termsBack.addEventListener('click', () => {
        termsBackFunction();
    })

    termsNext.addEventListener('click', () => {
        termsNextFunction();
    })

    const queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var action = urlParams.get('action');

    if (action == "register") {
        createAccount();
    }

})

function createAccount() {
    document.querySelector("#sign-in-content").style.display = "none";
    document.querySelector('#sign-in-action').style.display = "none";
    document.querySelector("#create-name-content").style.display = "flex";
    document.querySelector('#create-name-action').style.display = "flex";
}

function signIn() {
    fetchUserViaEmail(document.querySelector('#email').value).then((user) => {
        console.log("user found");
        if (user.password == document.querySelector('#password').value) {
            console.log("password match");
            localStorage.setItem("userId", user.id);
            localStorage.setItem("userRole", user.role)
            const queryString = window.location.search;
            var urlParams = new URLSearchParams(queryString);
            var action = urlParams.get('redirect');
            if (action) {
                window.location.href = action;
            } else {
                window.location.href = `${window.location.origin}`
            }
        } else {
            console.log("password does not match");
        }
    }).catch(() => {
        console.log("user not found");
    })
}

function nameBackFunction() {
    document.querySelector("#sign-in-content").style.display = "flex";
    document.querySelector('#sign-in-action').style.display = "flex";
    document.querySelector("#create-name-content").style.display = "none";
    document.querySelector('#create-name-action').style.display = "none";
}

function nameNextFunction() {
    document.querySelector("#create-email-content").style.display = "flex";
    document.querySelector('#create-email-action').style.display = "flex";
    document.querySelector("#create-name-content").style.display = "none";
    document.querySelector('#create-name-action').style.display = "none";
}

function emailBackFunction() {
    document.querySelector("#create-email-content").style.display = "none";
    document.querySelector('#create-email-action').style.display = "none";
    document.querySelector("#create-name-content").style.display = "flex";
    document.querySelector('#create-name-action').style.display = "flex";
}

function emailNextFunction() {
    document.querySelector("#create-email-content").style.display = "none";
    document.querySelector('#create-email-action').style.display = "none";
    document.querySelector("#create-personalize-content").style.display = "flex";
    document.querySelector('#create-personalize-action').style.display = "flex";
}

function personalizeBackFunction() {
    document.querySelector("#create-email-content").style.display = "flex";
    document.querySelector('#create-email-action').style.display = "flex";
    document.querySelector("#create-personalize-content").style.display = "none";
    document.querySelector('#create-personalize-action').style.display = "none";
}

function personalizeNextFunction() {
    document.querySelector("#create-terms-content").style.display = "flex";
    document.querySelector('#create-terms-action').style.display = "flex";
    document.querySelector("#create-personalize-content").style.display = "none";
    document.querySelector('#create-personalize-action').style.display = "none";
}

function termsBackFunction() {
    document.querySelector("#create-terms-content").style.display = "none";
    document.querySelector('#create-terms-action').style.display = "none";
    document.querySelector("#create-personalize-content").style.display = "flex";
    document.querySelector('#create-personalize-action').style.display = "flex";
}

function termsNextFunction() {
    // save name and reload to homepage
    localStorage.setItem('name', document.querySelector('#first_name').value);
    window.location.href = '../'
}

function flip(obj) {
    obj.classList.toggle("blue");
    obj.classList.toggle("darken-4");
    obj.classList.toggle("white-text");
}