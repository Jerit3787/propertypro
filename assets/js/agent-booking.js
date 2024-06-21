document.addEventListener('DOMContentLoaded', () => {
    var id = localStorage.getItem('userId');
    run(id);
    M.AutoInit();
    initUser();
})