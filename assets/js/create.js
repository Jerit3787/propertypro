function createCard(imageSrc, titleText, priceText, locationText, roomText) {
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

    // Append the main card div to the body or another container element
    document.body.appendChild(card); // or another container element like document.getElementById('container').appendChild(card);
}

// Call the function with custom content
createCard('../assets/img/card-photo.jpg', 'Eco Majestic - Banglo', 'RM XXX,XXX', 'Semenyih, Selangor', '3 Bedroom, 3 Bathroom');