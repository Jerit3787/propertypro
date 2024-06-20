document.addEventListener('DOMContentLoaded', () => {
    const queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var id = urlParams.get('id');
    fetchId(id).then((listing) => {
        document.querySelector('#property-state').textContent = listing.state;
        document.querySelector('#property-city').textContent = listing.city;
        document.querySelector('#property-title-1').textContent = listing.title;
        document.querySelector('#property-image').src = `${window.location.origin}/api${listing.image}`;
        document.querySelector('#price-tag').textContent = listing.priceStr;
        document.querySelector("#property-title").textContent = listing.title;
        document.querySelector('#property-subtitle').textContent = listing.subtitle;
        document.querySelector('#property-location').textContent = `${listing.city}, ${listing.state}, ${listing.country}`;
        document.querySelector('#property-builtup').textContent = listing.builtUp;
        document.querySelector('#property-landarea').textContent = listing.landArea;
        document.querySelector('#property-bed').textContent = listing.numOfBed;
        document.querySelector('#property-bath').textContent = listing.numOfBath;
        document.querySelector('#property-listing-image').style.backgroundImage = `url('${window.location.origin}/api${listing.listingImage}')`;
        document.querySelector('#property-type').textContent = listing.propertyType;
        document.querySelector('#property-builtup-1').textContent = listing.builtUp;
        document.querySelector('#property-landarea-1').textContent = listing.landArea;
        document.querySelector('#property-tenure').textContent = listing.tenure;
        document.querySelector('#property-landarea-2').textContent = listing.landArea;
        document.querySelector('#property-documentid').textContent = listing.documentId;
        document.querySelector('#property-posted-date').textContent = listing.postedDate;
        document.querySelector('#property').textContent = listing.title;
        document.querySelector('#developer').textContent = listing.developer;
        load_data(5, listing.id);

        searchBroker(listing.developer).then((broker) => {
            document.querySelector('#agent-picture').src = `${window.location.origin}/api${broker.profilePicture}`;
            document.querySelector('#agent-name').textContent = broker.displayName;
            document.querySelector('#agent-id').textContent = broker.brokerid;
            document.querySelector('#developer-image').src = `${window.location.origin}/api${broker.developerPicture}`;

            if (localStorage.getItem('userId')) {
                document.querySelector('#agent-num').textContent = broker.numStr;
                document.querySelector('#call-button').href = `tel:${broker.num}`;
                document.querySelector('#whatsapp-button').href = `https://wa.me/${broker.num}`
                document.querySelector('#booking-button').classList.add("modal-trigger");
                document.querySelector('#booking-button').href = "#bookingModal";
            } else {
                //var elem = document.querySelector('signInModal');
                //var instance = M.Modal.getInstance(elem);
                //instance.open();
                document.querySelector('#call-button').classList.add("modal-trigger");
                document.querySelector('#call-button').href = "#signInModal";
                document.querySelector('#whatsapp-button').classList.add("modal-trigger");
                document.querySelector('#whatsapp-button').href = "#signInModal";
                document.querySelector('#booking-button').classList.add("modal-trigger");
                document.querySelector('#booking-button').href = "#signInModal";
            }
        })
    })

    var elemsTool = document.querySelectorAll('.tooltipped');
    var instancesData = M.Tooltip.init(elemsTool, {
        margin: 1, // specify options here
    });

    var elemsDate = document.querySelectorAll('.datepicker');
    var instancesDate = M.Datepicker.init(elemsDate, {
        // specify options here
        minDate: new Date(),
        maxDate: new Date().setDate(new Date().getDate() + 7)
    });

    initUser();

    loadBookingDate(id).then(() => {
        var elemsDate = document.querySelector('#date-select');
        var instancesDate = M.FormSelect.init(elemsDate, {
            // specify options here
        });
        elemsDate.addEventListener('change', () => {
            loadBookingTime(id).then(() => {
                var elemsTime = document.querySelector('#time-select');
                elemsTime.removeAttribute("disabled");
                var instancesTime = M.FormSelect.init(elemsTime, {
                    // specify options here
                });
            })
        })
        M.AutoInit();
    })
})

function launchSignIn() {
    var searchParams = new URLSearchParams();
    searchParams.set("redirect", window.location)
    window.location.href = `${window.location.origin}/auth/?${searchParams.toString()}`;
}

function launchSignUp() {
    var searchParams = new URLSearchParams();
    searchParams.set("redirect", window.location)
    searchParams.set("action", "register")
    window.location.href = `${window.location.origin}/auth/?${searchParams.toString()}`;
}