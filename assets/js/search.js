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
    const queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    document.querySelector('#location-search').value = urlParams.get("location");
    document.querySelector('#residential-type').textContent = urlParams.get("type");
    document.querySelector('#residential-type-icon').textContent = urlParams.get("type-icon");
    document.querySelector('#room-configuration').textContent = urlParams.get("room");
    document.querySelector('#price-range').textContent = urlParams.get("price");

    const node = document.querySelector("#location-search");
    node.addEventListener("keyup", function (event) {
        console.log("test")
        if (event.key == "Enter") {
            const queryString = window.location.search;
            var urlParams = new URLSearchParams(queryString);
            urlParams.set("location", node.value);
            window.location.search = urlParams.toString()
        }
    });

    document.querySelector('#login_button').addEventListener('click', () => {
        window.location.href = "../auth/"
    })
    var name = localStorage.getItem('name');
    if (name) {
        document.querySelector('#user_name').textContent = name;
    }

    document.querySelector('#view_property').addEventListener('click', () => {
        window.location.href = "../view/"
    })
})

function updateResidential(data, icon) {
    document.querySelector('#residential-type').textContent = data;
    const queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    urlParams.set("type", data);
    urlParams.set("type-icon", icon);
    console.log(`${window.location.href}?${urlParams.toString()}`);
    window.location.search = urlParams.toString();
}

function updateRoom(data, icon) {
    document.querySelector('#room-configuration').textContent = data;
    const queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    urlParams.set("room", data);
    urlParams.set("room-icon", icon);
    console.log(`${window.location.href}?${urlParams.toString()}`);
    window.location.search = urlParams.toString();
}

function updatePrice(data) {
    document.querySelector('#price-range').textContent = data;
    const queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    urlParams.set("price", data);
    console.log(`${window.location.href}?${urlParams.toString()}`);
    window.location.search = urlParams.toString();
}