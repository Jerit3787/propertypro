document.addEventListener('DOMContentLoaded', () => {
    var id = localStorage.getItem('userId');
    generateAgentListingTable(id);
    M.AutoInit();
    initUser();
})