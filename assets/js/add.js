document.addEventListener('DOMContentLoaded', () => {
    M.AutoInit();
    document.querySelector('#login_button').addEventListener('click', () => {
        window.location.href = "./auth/"
    })

    var name = localStorage.getItem('name');
    if (name) {
        document.querySelector('#user_name').textContent = name;
    }
})