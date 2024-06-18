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
        document.querySelector("#sign-in-content").style.display = "none";
        document.querySelector('#sign-in-action').style.display = "none";
        document.querySelector("#create-name-content").style.display = "flex";
        document.querySelector('#create-name-action').style.display = "flex";
    })

    signInButton.addEventListener('click', () => {
        // Do nothing
    })

    nameBack.addEventListener('click', () => {
        document.querySelector("#sign-in-content").style.display = "flex";
        document.querySelector('#sign-in-action').style.display = "flex";
        document.querySelector("#create-name-content").style.display = "none";
        document.querySelector('#create-name-action').style.display = "none";
    })

    nameNext.addEventListener('click', () => {
        document.querySelector("#create-email-content").style.display = "flex";
        document.querySelector('#create-email-action').style.display = "flex";
        document.querySelector("#create-name-content").style.display = "none";
        document.querySelector('#create-name-action').style.display = "none";
    })

    emailBack.addEventListener('click', () => {
        document.querySelector("#create-email-content").style.display = "none";
        document.querySelector('#create-email-action').style.display = "none";
        document.querySelector("#create-name-content").style.display = "flex";
        document.querySelector('#create-name-action').style.display = "flex";
    })

    emailNext.addEventListener('click', () => {
        document.querySelector("#create-email-content").style.display = "none";
        document.querySelector('#create-email-action').style.display = "none";
        document.querySelector("#create-personalize-content").style.display = "flex";
        document.querySelector('#create-personalize-action').style.display = "flex";
    })

    personalizeBack.addEventListener('click', () => {
        document.querySelector("#create-email-content").style.display = "flex";
        document.querySelector('#create-email-action').style.display = "flex";
        document.querySelector("#create-personalize-content").style.display = "none";
        document.querySelector('#create-personalize-action').style.display = "none";
    })

    personalizeNext.addEventListener('click', () => {
        document.querySelector("#create-terms-content").style.display = "flex";
        document.querySelector('#create-terms-action').style.display = "flex";
        document.querySelector("#create-personalize-content").style.display = "none";
        document.querySelector('#create-personalize-action').style.display = "none";
    })

    termsBack.addEventListener('click', () => {
        document.querySelector("#create-terms-content").style.display = "none";
        document.querySelector('#create-terms-action').style.display = "none";
        document.querySelector("#create-personalize-content").style.display = "flex";
        document.querySelector('#create-personalize-action').style.display = "flex";
    })

    termsNext.addEventListener('click', () => {
        // save name and reload to homepage
        localStorage.setItem('name', document.querySelector('#first_name').value);
        window.location.href = '../'
    })

    const queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var action = urlParams.get('action');

    if (action == "register") {
        document.querySelector("#sign-in-content").style.display = "none";
        document.querySelector('#sign-in-action').style.display = "none";
        document.querySelector("#create-name-content").style.display = "flex";
        document.querySelector('#create-name-action').style.display = "flex";
    }

})

function flip(obj) {
    obj.classList.toggle("blue");
    obj.classList.toggle("darken-4");
    obj.classList.toggle("white-text");
}