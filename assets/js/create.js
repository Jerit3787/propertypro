function createCard(id, imageSrc, titleText, priceText, locationText, roomText) {
    // Create main card div
    var card = document.createElement('div');
    card.className = 'card col s3 procard';

    // Create card image div
    var cardImage = document.createElement('div');
    cardImage.className = 'card-image procard-image';
    var img = document.createElement('img');
    img.src = imageSrc;
    cardImage.appendChild(img);

    // Create card content div
    var cardContent = document.createElement('div');
    cardContent.className = 'card-content procard-content';

    // Add title and price paragraphs
    var title = document.createElement('p');
    title.className = 'procard-title';
    title.textContent = titleText;

    var price = document.createElement('p');
    price.className = 'procard-price';
    price.textContent = priceText;

    // Add details div
    var details = document.createElement('div');
    details.className = 'procard-details';

    // Add details for location
    var detailsDiv1 = document.createElement('div');
    detailsDiv1.className = 'procard-details-div';

    var icon1 = document.createElement('i');
    icon1.className = 'material-symbols-outlined grey-text text-darken-1';
    icon1.textContent = 'place';

    var locationP = document.createElement('p');
    locationP.textContent = locationText;

    detailsDiv1.appendChild(icon1);
    detailsDiv1.appendChild(locationP);

    // Add details for rooms
    var detailsDiv2 = document.createElement('div');
    detailsDiv2.className = 'procard-details-div';

    var icon2 = document.createElement('i');
    icon2.className = 'material-symbols-outlined grey-text text-darken-1';
    icon2.style.fontSize = '24px';
    icon2.textContent = 'bed';

    var roomP = document.createElement('p');
    roomP.style.fontSize = '12px';
    roomP.textContent = roomText;

    detailsDiv2.appendChild(icon2);
    detailsDiv2.appendChild(roomP);

    // Append all elements accordingly
    details.appendChild(detailsDiv1);
    details.appendChild(detailsDiv2);

    cardContent.appendChild(title);
    cardContent.appendChild(price);
    cardContent.appendChild(details);

    card.appendChild(cardImage);
    card.appendChild(cardContent);

    card.addEventListener('click', () => {
        window.location.href = `${window.location.origin}/view/?id=${id}`;
    })

    // Append the main card div to the body or another container element
    document.querySelector('#listing-cards').appendChild(card); // or another container element like document.getElementById('container').appendChild(card);
}

// Function to create cards from JSON data
function createCardsFromJSON(jsonArray) {
    jsonArray.forEach(function (property) {
        createCard(property.id, `${window.location.origin}/api${property.image}`, property.title, property.priceStr, `${property.city}, ${property.state}`, `${property.numOfBed} Bedroom`);
    });
}

// Function to fetch JSON data from a file and create cards
function fetchJSON(jsonFilePath) {
    return new Promise((resolve, reject) => {
        fetch(jsonFilePath)
            .then(response => response.json())
            .then(jsonData => {
                console.log(jsonData)
                resolve(jsonData);
            })
            .catch(error => {
                console.error('Error fetching JSON:', error);
            });
    })
}

function extractSearchData() {
    var location = document.querySelector('#location-search').value;
    var type = document.querySelector('#residential-type').textContent;
    var room = document.querySelector('#room-configuration').textContent;
    var priceRange = document.querySelector('#price-range').textContent;

    switch (type) {

    }
}

// Function to search properties based on the given metrics
function searchProperties(location, residentialType, bedrooms, priceRangeLow, priceRangeHigh) {
    return properties.filter(function (property) {
        return property.location.includes(location) &&
            property.residentialType.includes(residentialType) &&
            property.bedrooms === bedrooms &&
            (property.price <= priceRangeHigh && property.price >= priceRangeLow);
    });
}

// Example usage: Search for 3-bedroom condominiums in Shah Alam under RM300,000
var searchResults = searchProperties('Shah Alam, Selangor', 'Condominium', 3, 300000);
console.log(searchResults);