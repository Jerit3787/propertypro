// Generate User IDs (8 to 12)
const userIDs = Array.from({ length: 5 }, (_, i) => i + 8);

// Generate Property IDs (1 to 18)
const propertyIDs = Array.from({ length: 18 }, (_, i) => i + 1);

// Generate Booking Dates (every 30 minutes)
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

// Generate Received Dates (1 week before booking dates)
const receivedDates = bookingDates.map((bookingDate) => {
    const receivedDate = new Date(bookingDate);
    receivedDate.setDate(receivedDate.getDate() - 7);
    return receivedDate.toISOString(); // Convert to ISO string
});

// Create bookings (bookingId, userId, propertyId, bookingDate, receivedDate)
const bookings = [];
let bookingId = 1;

for (const userId of userIDs) {
    for (const propertyId of propertyIDs) {
        if (bookingDates.length === 0) {
            console.log('Not enough booking slots available.');
            break;
        }

        const booking = {
            bookingId,
            userId,
            propertyId,
            bookingDate: bookingDates.shift().toISOString(),
            receivedDate: receivedDates.shift(),
        };
        bookings.push(booking);
        bookingId++;
    }
}

// Sort by booking ID
bookings.sort((a, b) => a.bookingId - b.bookingId);

// Print the JSON data
console.log(JSON.stringify(bookings, null, 2));