document.addEventListener("DOMContentLoaded", () => {
    M.AutoInit();
    var elemsAutoComplete = document.querySelectorAll('.autocomplete');
    var instances = M.Autocomplete.init(elemsAutoComplete, {
        // specify options here
        minLength: 0, // shows instantly
        data: [
            { id: 12, text: "Shah Alam, Selangor" },
        ],
        onAutocomplete: () => {
            var data = [
                "Shah Alam, Selangor",
                "Johor Bharu, Johor",
                "Semenyih, Selangor"
            ]
            const node = document.querySelector("#location-search");
            if (data.indexOf(node.value) != -1)
                search();
        }
    });
    const queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    document.querySelector('#location-search').value = urlParams.get("location");
    document.querySelector('#residential-type').textContent = urlParams.get("type");
    document.querySelector('#residential-type-icon').textContent = urlParams.get("type-icon");
    document.querySelector('#room-configuration').textContent = urlParams.get("room");
    document.querySelector('#price-range').textContent = urlParams.get("price");
    document.querySelector('#search-term').textContent = urlParams.get("location")

    const node = document.querySelector("#location-search");
    node.addEventListener("keyup", function(event) {
        console.log("test")
        if (event.key == "Enter") {
            search();
        }
    });

    initUser();

    load_data_search();
})

function search() {
    const node = document.querySelector("#location-search");
    const queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    urlParams.set("location", node.value);
    urlParams.set("type", document.querySelector('#residential-type').textContent);
    urlParams.set("type-icon", document.querySelector('#residential-type-icon').textContent);
    urlParams.set("room", document.querySelector('#room-configuration').textContent);
    urlParams.set("price", document.querySelector('#price-range').textContent)
    var linkRedirect = window.location.origin + "/search/?" + urlParams.toString();
    window.location.href = linkRedirect
}

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