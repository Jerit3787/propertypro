document.addEventListener('DOMContentLoaded', () => {
    const queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    loadListingForm(urlParams.get('id'));
    M.AutoInit();
    initUser();
})