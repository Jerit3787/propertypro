const API_PATH = `${window.location.origin}/api`;

function createCard(id, imageSrc, titleText, priceText, locationText, roomText) {
    // Create main card div
    var card = document.createElement('div');
    card.className = 'card col s3 procard hoverable';

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
        createCard(property.id, `${API_PATH}${property.image}`, property.title, property.priceStr, `${property.city}, ${property.state}`, `${property.numOfBed} Bedroom`);
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
    return new Promise((resolve, reject) => {
        var location = document.querySelector('#location-search').value;
        var type = document.querySelector('#residential-type').textContent;
        var room = document.querySelector('#room-configuration').textContent;
        var priceRange = document.querySelector('#price-range').textContent;

        var filterLocation, filterType, filterRoom, filterPriceLow, filterPriceHigh;

        console.log(location);
        filterLocation = location;

        console.log(type);
        switch (type) {
            case "All Residential":
                filterType = "all";
                break;

            case "Apartment/Flat":
                filterType = "apartment";
                break;

            case "Condo/Serviced Residence":
                filterType = "condo";
                break;

            case "Terrance/Link/Townhouse":
                filterType = "terrance";
                break;

            case "Semi-D/Bungalow":
                filterType = "semid";
                break;
            default:
                console.log("error: property type not found");
                break;
        }

        console.log(room);
        switch (room) {
            case "All Configuration":
                filterRoom = "all";
                break;
            case "Studio Configuration":
                filterRoom = "studio";
                break;
            case "1 Bedroom":
                filterRoom = "1";
                break;
            case "2 Bedroom":
                filterRoom = "2";
                break;
            case "3 Bedroom":
                filterRoom = "3";
                break;
            case "4 Bedroom":
                filterRoom = "4";
                break;
            case "+5 Bedroom":
                filterRoom = "5";
                break;
            default:
                console.log("error: room configuration not found");
                break;
        }

        console.log(priceRange);
        switch (priceRange) {
            case "Less Than 300k":
                filterPriceLow = 0;
                filterPriceHigh = 300000;
                break;
            case "300k - 500k":
                filterPriceLow = 300000;
                filterPriceHigh = 500000;
                break;
            case "500k - 700k":
                filterPriceLow = 500000;
                filterPriceHigh = 700000;
                break;
            case "700k - 900k":
                filterPriceLow = 700000;
                filterPriceHigh = 900000;
                break;
            case "More Than 900k":
                filterPriceLow = 900000;
                filterPriceHigh = 999999999;
                break;
            default:
                console.log("error: price range not found");
                break;
        }

        console.log(filterPriceLow);
        console.log(filterPriceHigh);

        searchProperties(filterLocation, filterType, filterRoom, filterPriceLow, filterPriceHigh).then((searchResultsData) => {
            console.log(searchResultsData);
            resolve(searchResultsData);
        })
    })
}

function sortPropertiesByPrice(properties) {
    return new Promise((resolve, reject) => {
        resolve(properties.sort(function (a, b) {
            return a.price - b.price;
        }));
    })
}

// Function to search properties based on the given metrics
async function searchProperties(location, residentialType, bedrooms, priceRangeLow, priceRangeHigh) {
    var properties = await fetchJSON(`${API_PATH}/listing/index.json`);
    return properties.filter(function (property) {
        var matchesLocation = property.filterLocation.includes(location);
        var matchesResidentialType = residentialType === 'all' || property.filterType === residentialType;
        var matchesBedrooms = bedrooms === 'all' || property.numOfBed === bedrooms;
        var matchesPriceRange = property.price >= priceRangeLow && property.price <= priceRangeHigh;

        return matchesLocation && matchesResidentialType && matchesBedrooms && matchesPriceRange;
    });
}

async function fetchId(id) {
    return new Promise((resolve, reject) => {
        fetchJSON(`${API_PATH}/listing/index.json`).then((data) => {
            data.forEach((listing) => {
                if (listing.id == id) {
                    resolve(listing);
                }
            });
        })
    })
}

async function load_data(max, id) {
    var index = 0;
    var listCards = [];
    fetchJSON(`${API_PATH}/listing/index.json`).then((data) => {
        data.forEach(element => {
            if (index < max) {
                if (!id) {
                    if (element.id != id)
                        listCards[index] = element;
                } else {
                    listCards[index] = element;
                }
            }
            console.log(index)
            index++;
        });
        createCardsFromJSON(listCards);
    })
}

async function load_data_search() {
    extractSearchData().then((data) => {
        sortPropertiesByPrice(data).then((dataSorted) => {
            if (dataSorted.length > 0) {
                createCardsFromJSON(dataSorted);
            } else {
                document.querySelector('.container-empty-state').style.display = "flex";
            }
        })
    })
}

async function searchBroker(developer) {
    console.log(`requested: ${developer}`);
    return new Promise((resolve, reject) => {
        fetchJSON(`${API_PATH}/user/index.json`).then((data) => {
            data.forEach((user) => {
                if (user.developer == developer) {
                    resolve(user);
                    console.log(user);
                }
            })
        })
    })
}

async function fetchUserViaEmail(email) {
    console.log(`requested: ${email}`)
    var userData;
    return new Promise((resolve, reject) => {
        fetchJSON(`${API_PATH}/user/index.json`).then((data) => {
            data.forEach((user) => {
                if (user.email == email) {
                    userData = user;
                }
            })
            console.log(userData);

            if (userData) {
                resolve(userData);
            } else {
                reject();
            }
        })
    })
}

async function fetchUserViaId(id) {
    return new Promise((resolve, reject) => {
        var userData;
        fetchJSON(`${API_PATH}/user/index.json`).then((data) => {
            data.forEach((user) => {
                if (user.id == id) {
                    userData = user;;
                }
            })
            console.log(userData);

            if (userData) {
                resolve(userData);
            } else {
                reject();
            }
        })
    })
}

function initUser() {
    var id = localStorage.getItem('userId');
    if (id) {
        var dropdownElems = document.querySelector('#login_button');
        dropdownElems.classList.add("dropdown-trigger");
        dropdownElems.setAttribute("data-target", "userDropdown")
        var dropdownInstances = M.Dropdown.init(dropdownElems, {
            // the dropdown is aligned to left
            alignment: 'right',
            // enabled for example to be visible
            constrainWidth: false,
        });
        fetchUserViaId(id).then((user) => {
            var name = user.displayName.split(' ');
            var firstName = name[0];
            document.querySelector('#emailText').textContent = user.email;
            document.querySelector('#profileImg').src = `${window.location.origin}/api${user.profilePicture}`;
            document.querySelector('#nameText').textContent = firstName;
            //document.querySelector('#user_name').textContent = firstName;
            document.querySelector('#user_image').src = `${window.location.origin}/api${user.profilePicture}`;
            document.querySelector('#user_image').style.display = "block";
            document.querySelector('#no_user').style.display = "none";
        })
    } else {
        document.querySelector('#login_button').addEventListener('click', (e) => {
            var searchParams = new URLSearchParams();
            searchParams.set("redirect", window.location)
            window.location.href = `${window.location.origin}/auth/?${searchParams.toString()}`;
        })
    }
}

function logOutAccount() {
    localStorage.removeItem('userId');
    location.reload();
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function loadProperty() {
    return new Promise((resolve, reject) => {
        fetchJSON(`${API_PATH}/assets/listing/index.json`).then((properties) => {
            resolve(properties);
        })
    })
}

function loadBooking() {
    return new Promise((resolve, reject) => {
        fetchJSON(`${API_PATH}/assets/booking/index.json`).then((bookings) => {
            resolve(bookings);
        })
    })
}

function loadBookingsByProperty(id) {
    return new Promise((resolve, reject) => {
        loadBooking().then((bookings) => {
            var propertyBooking = [];
            bookings.forEach((booking) => {
                if (booking.propertyId == id) {
                    propertyBooking.push(booking);
                }
            })

            resolve(array);
        })
    })
}

function getAgentProperty() {
    return new Promise((resolve, reject) => {
        fetchUserViaId(id).then((user) => {
            loadProperty().then((properties) => {
                var agentProperty = [];
                properties.forEach((property) => {
                    if (user.developer == property.developer) {
                        agentProperty.push(property);
                    }
                })
                resolve(agentProperty);
            })
        })
    })
}

function loadBookingByAgent(id) {
    return new Promise((resolve, reject) => {
        getAgentProperty().then((properties) => {
            var agentBooking = [];
            properties.forEach((property) => {
                loadBookingsByProperty(property.id).then((bookings) => {
                    bookings.forEach((booking) => {
                        agentBooking.push(booking);
                    })
                })
            })

            resolve(agentBooking);
        })
    })
}

function loadBookingByCustomer(id) {
    return new Promise((resolve, reject) => {
        loadBooking().then((bookings) => {
            var userBookings = [];
            bookings.forEach((booking) => {
                if (booking.userId = id)
                    userBookings.push(booking);
            })

            resolve(userBookings);
        })
    })
}