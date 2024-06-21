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
    var role = localStorage.getItem('userRole');
    if (id) {
        var dropdownElemsObj = document.querySelector('#login_button');
        dropdownElemsObj.classList.add("dropdown-trigger");
        if (role == "customer") {
            dropdownElemsObj.setAttribute("data-target", "userDropdown")
        } else {
            dropdownElemsObj.setAttribute("data-target", "agentDropdown")
        }
        var dropdownInstances = M.Dropdown.init(dropdownElemsObj, {
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
        fetchJSON(`${API_PATH}/listing/index.json`).then((properties) => {
            resolve(properties);
        })
    })
}

function loadBooking() {
    return new Promise((resolve, reject) => {
        fetchJSON(`${API_PATH}/booking/index.json`).then((bookings) => {
            resolve(bookings);
        })
    })
}

function fetchBooking(id) {
    return new Promise((resolve, reject) => {
        loadBooking().then((bookings) => {
            bookings.forEach((booking) => {
                if (booking.bookingId == id) {
                    resolve(booking);
                }
            })
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

            resolve(propertyBooking);
        })
    })
}

function getAgentProperty(id) {
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

function createDates() {
    return new Promise((resolve, reject) => {
        const bookingDates = [];
        const startDate = new Date(); // Use the current date as the starting point
        startDate.setHours(8, 0, 0, 0); // Set the start time to 8am

        var count = 0;

        for (var i = 1; i <= 7; i++) {
            while (startDate.getHours() < 17 || (startDate.getHours() === 17 && startDate.getMinutes() <= 30)) {
                count++;
                // Exclude 12pm to 2.30pm
                if (!(startDate.getHours() === 12 && startDate.getMinutes() >= 0) && !(startDate.getHours() === 14 && startDate.getMinutes() >= 30)) {
                    bookingDates.push(new Date(startDate));
                }
                startDate.setMinutes(startDate.getMinutes() + 30);
                console.log(startDate.toISOString());
            }
            startDate.setDate(startDate.getDate() + 1);
            startDate.setHours(8, 0, 0, 0);
            console.log(count);
        }

        resolve(bookingDates);
    })
}

function loadDates(propertyId) {
    return new Promise((resolve, reject) => {
        loadBookingsByProperty(propertyId).then((bookings) => {
            var bookedDates = [];
            bookings.forEach((booking) => {
                bookedDates.push(new Date(booking.bookingDate));
            });
            createDates().then((scheduleDates) => {
                var availableDates = removeBookedDates(scheduleDates, bookedDates);
                resolve(availableDates);
            })
        })
    })
}

function removeBookedDates(arr1, arr2) {
    return arr1.filter(el => !arr2.includes(el));
}

function extractDate(dates) {
    return new Promise((resolve, reject) => {
        var dateArray = [];
        dates.forEach((date) => {
            var format = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
            if (!dateArray.includes(format)) {
                dateArray.push(format);
            }
        })

        resolve(dateArray);
    })
}

function addBeforeZero(data) {
    if (data < 10) {
        return `0${data}`;
    } else {
        return data;
    }
}

function extractSpecificDay(dates, formattedDate) {
    return new Promise((resolve, reject) => {
        var timeArray = [];
        dates.forEach((date) => {
            var format = `${addBeforeZero(date.getDate())}-${addBeforeZero(date.getMonth())}-${addBeforeZero(date.getFullYear())}`
            if (format == formattedDate) {
                timeArray.push(date);
            }
        })

        resolve(timeArray);
    })
}

function extractTime(dates) {
    return new Promise((resolve, reject) => {
        var timeArray = [];
        dates.forEach((date) => {
            var format = `${addBeforeZero(date.getHours())}:${addBeforeZero(date.getMinutes())}`;
            timeArray.push(format);
        })

        resolve(timeArray);
    })
}

function generateOptions(array, root) {
    return new Promise((resolve, reject) => {
        var rootObj = document.querySelector(root);
        while (rootObj.lastElementChild) {
            rootObj.removeChild(rootObj.lastElementChild);
        }

        var defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.setAttribute("disabled", "");
        defaultOption.setAttribute("selected", "");
        defaultOption.textContent = "Choose your time";

        rootObj.appendChild(defaultOption);

        array.forEach((data) => {
            var options = document.createElement('option');
            options.value = data;
            options.textContent = data;

            rootObj.appendChild(options);
        })

        resolve();
    })
}

function loadBookingTime(id) {
    return new Promise((resolve, reject) => {
        loadDates(id).then((availableArray) => {
            extractSpecificDay(availableArray, document.querySelector('#date-select').value).then((dayArray) => {
                extractTime(dayArray).then((optionsArray) => {
                    generateOptions(optionsArray, "#time-select").then(() => {
                        resolve();
                    })
                })
            })
        })
    })
}

function loadBookingDate(id) {
    return new Promise((resolve, reject) => {
        loadDates(id).then((availableArray) => {
            extractDate(availableArray).then((dateArray) => {
                generateOptions(dateArray, "#date-select").then(() => {
                    resolve();
                });
            })
        })
    })
}

function generateAgentListingTable(id) {
    getAgentProperty(id).then((properties) => {
        properties.forEach((property) => {
            var tableRow = document.createElement('tr');
            var idProperty = document.createElement('td');
            idProperty.textContent = property.id;
            var title = document.createElement('td');
            title.textContent = property.title;
            var location = document.createElement('td');
            location.textContent = property.filterLocation;
            var price = document.createElement('td');
            price.textContent = property.priceStr;
            var room = document.createElement('td');
            room.textContent = `${property.numOfBed} Bedrooms, ${property.numOfBath} Bathrooms`;
            tableRow.appendChild(idProperty);
            tableRow.appendChild(title);
            tableRow.appendChild(location);
            tableRow.appendChild(price);
            tableRow.appendChild(room);
            tableRow.addEventListener('click', () => {
                showPropertyInfo(`${property.id}`);
            })
            tableRow.setAttribute("id", `property-${property.id}`);
            document.querySelector('#tableList').appendChild(tableRow)
        })
    })
}

function run(id) {
    generateBookingListingTable(id);
}

function generateBookingListingTable(id) {
    getAgentProperty(id).then((properties) => {
        properties.forEach((property) => {
            loadBookingsByProperty(property.id).then((bookings) => {
                bookings.forEach((booking) => {
                    fetchId(booking.propertyId).then((property) => {
                        fetchUserViaId(booking.userId).then((user) => {
                            var tableRow = document.createElement('tr');
                            var idBooking = document.createElement('td');
                            idBooking.textContent = booking.bookingId;
                            var title = document.createElement('td');
                            title.textContent = property.title;
                            var name = document.createElement('td');
                            name.textContent = user.displayName;
                            var email = document.createElement('td');
                            email.textContent = user.email;
                            var dateObj = new Date(booking.bookingDate);
                            var date = document.createElement('td');
                            date.textContent = `${addBeforeZero(dateObj.getDate())}-${addBeforeZero(dateObj.getMonth())}-${addBeforeZero(dateObj.getFullYear())}`;
                            var time = document.createElement('td');
                            time.textContent = `${addBeforeZero(dateObj.getHours())}:${addBeforeZero(dateObj.getMinutes())}`;

                            tableRow.appendChild(idBooking);
                            tableRow.appendChild(title);
                            tableRow.appendChild(name);
                            tableRow.appendChild(email);
                            tableRow.appendChild(date);
                            tableRow.appendChild(time);

                            tableRow.addEventListener('click', () => {
                                showBookingInfo(`${booking.bookingId}`);
                            })
                            tableRow.setAttribute("id", `booking-${booking.bookingId}`);
                            document.querySelector('#tableList').appendChild(tableRow);
                        })
                    })
                })
            });
        });
    })
}

function showBookingInfo(id) {
    console.log("running:" + id)
    fetchBooking(id).then((booking) => {
        fetchId(booking.propertyId).then((property) => {
            searchBroker(property.developer).then((broker) => {
                fetchUserViaId(booking.userId).then((user) => {
                    console.log(user);
                    document.querySelector('#developer-image').src = `${API_PATH}${broker.developerPicture}`;
                    document.querySelector('#customer-name').textContent = user.displayName;
                    document.querySelector('#contact-button').href = `mailto:${user.email}`;
                    document.querySelector('#booking-id-table').textContent = booking.bookingId;
                    document.querySelector('#user-email-table').textContent = user.email;
                    document.querySelector('#property-name-table').textContent = property.title;
                    document.querySelector('#property-price-table').textContent = property.priceStr;
                    document.querySelector('#property-rooms-table').textContent = `${property.numOfBed} Bedrooms, ${property.numOfBath} Bathrooms`;
                    var dateObj = new Date(booking.bookingDate);
                    document.querySelector('#date-table').textContent = `${addBeforeZero(dateObj.getDate())}-${addBeforeZero(dateObj.getMonth())}-${addBeforeZero(dateObj.getFullYear())}`;
                    document.querySelector('#time-table').textContent = `${addBeforeZero(dateObj.getHours())}:${addBeforeZero(dateObj.getMinutes())}`;
                    document.querySelector('#delete-button').addEventListener('click', () => {
                        document.querySelector(`#booking-${booking.bookingId}`).style.display = "none";
                    })

                    var elems = document.querySelector('#manageModal');
                    var instances = M.Modal.init(elems, {
                        // specify options here
                    });

                    instances.open();
                })
            })
        })
    })
}

function showPropertyInfo(id) {
    fetchId(id).then((property) => {
        searchBroker(property.developer).then((broker) => {
            document.querySelector('#developer-image').src = `${API_PATH}${broker.developerPicture}`;
            document.querySelector('#property-title').textContent = property.title;
            document.querySelector('#property-id-table').textContent = property.id;
            document.querySelector('#property-title-table').textContent = property.title;
            document.querySelector('#property-subtitle-table').textContent = property.subtitle;
            document.querySelector('#property-price-table').textContent = property.priceStr;
            document.querySelector('#property-rooms-table').textContent = `${property.numOfBed} Bedrooms, ${property.numOfBath} Bathrooms`;
            document.querySelector('#property-type-table').textContent = property.propertyType;
            document.querySelector('#tenure-table').textContent = property.tenure;
            document.querySelector('#view-button').addEventListener('click', () => {
                window.location.href = `${window.location.origin}/view/?id=${property.id}`;
            })
            document.querySelector('#edit-button').addEventListener('click', () => {
                window.location.href = `${window.location.origin}/agent/listing/manage/?id=${property.id}`;
            })
            document.querySelector('#delete-button').addEventListener('click', () => {
                document.querySelector(`#property-${property.id}`).style.display = "none";
            })

            var elems = document.querySelector('#manageModal');
            var instances = M.Modal.init(elems, {
                // specify options here
            });

            instances.open();

        })
    })
}

function loadListingForm(id) {
    fetchId(id).then((property) => {
        console.log(property);
        document.querySelector('#property-title').value = property.title;
        document.querySelector('#property-subtitle').value = property.subtitle;
        document.querySelector('#property-price').value = property.priceStr;
        document.querySelector('#property-rooms').value = property.numOfBed;
        document.querySelector('#property-bathrooms').value = property.numOfBath;
        document.querySelector('#property-size').value = property.builtUp;
        document.querySelector('#property-land').value = property.landArea;
        document.querySelector('#property-land2').value = property.landArea;
        document.querySelector('#property-land3').value = property.landArea;
        document.querySelector('#property-location').value = property.filterLocation;
    })
}