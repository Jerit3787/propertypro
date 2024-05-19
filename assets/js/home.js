document.addEventListener("DOMContentLoaded", () => {
    M.AutoInit();
    var elemsAutoComplete = document.querySelectorAll('.autocomplete');
    var instances = M.Autocomplete.init(elemsAutoComplete, {
        // specify options here
        minLength: 0, // shows instantly
        data: [
            { id: 12, text: "Shah Alam, Selangor" },
            { id: 13, text: "Johor Bharu, Johor" },
            { id: 42, text: "Semenyih, Selangor" }
        ]
    });

    const node = document.querySelector("#location-search");
    node.addEventListener("keyup", function (event) {
        console.log("test")
        if (event.key == "Enter") {
            const queryString = window.location.search;
            var urlParams = new URLSearchParams(queryString);
            urlParams.set("location", node.value);
            urlParams.set("type", document.querySelector('#residential-type').textContent);
            urlParams.set("type-icon", document.querySelector('#residential-type-icon').textContent);
            urlParams.set("room", document.querySelector('#room-configuration').textContent);
            var linkRedirect = "https://www.danplace.tech/smarthousing/search/?" + urlParams.toString();
            window.location.href = linkRedirect
        }
    });

    document.querySelector('#login_button').addEventListener('click', () => {
        window.location.href = "./auth/"
    })

    var name = localStorage.getItem('name');
    if (name) {
        document.querySelector('#user_name').textContent = name;
    }
})

function updateResidential(data, icon) {
    document.querySelector('#residential-type').textContent = data;
    document.querySelector('#residential-type-icon').textContent = icon;
}

function updateRoom(data, icon) {
    document.querySelector('#room-configuration').textContent = data;
}

function updatePrice(data) {
    document.querySelector('#price-range').textContent = data;
}