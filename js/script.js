function openPopup() {
    document.getElementById('popup').style.display = 'block';
    // document.getElementById('overlay').style.display = 'block';
}

function closePopup() {

    document.getElementById('popup').style.display = 'none';

    // Clear the seat rows and update total price and grand total
    var seatContainer = document.getElementById('seatContainer');
    seatContainer.innerHTML = ''; 

    var totalPriceSpan = document.getElementById('totalPrice');
    totalPriceSpan.textContent = "Total 0.00";

    var grandTotalSpan = document.getElementById('grandTotal');
    grandTotalSpan.textContent = "BTD 0.00";
}

var buyTicketsBtn = document.getElementById('buyTicketsBtn');

buyTicketsBtn.addEventListener('click', function() {
    // Scroll to the main section
    document.getElementById('mainSection').scrollIntoView({ behavior: 'smooth' });

    // Unhide the main section if it's hidden
    var mainSection = document.getElementById('buyTickets');
    if (mainSection.classList.contains('hidden')) {
        mainSection.classList.remove('hidden');
    }
});


var totalPrice = 0;
var discount = 0;
var selectedSeats = 0;

function changeColor(element) {
    var btn = element;
    var seatName = btn.textContent;

    //can selects maximum 4 seats
    if (!btn.classList.contains('clicked') && selectedSeats === 4) {
        alert('You can only select up to 4 seats.');
        return; //exits
    }

    if (btn.classList.contains('clicked')) {
        btn.classList.remove('clicked');
        selectedSeats--;
        var totalSeatsSpan = document.getElementById('totalSeats');
        var totalSeats = parseInt(totalSeatsSpan.textContent);
        totalSeatsSpan.textContent = totalSeats + 1;
        totalPrice -= 550;

        var seatRow = document.getElementById('seatRow_' + seatName);
        if (seatRow) {
            seatRow.parentNode.removeChild(seatRow);
        }

        // Remove the line break if it follows the removed seat row
        var lineBreak = btn.nextElementSibling;
        if (lineBreak && lineBreak.tagName === 'BR') {
            lineBreak.parentNode.removeChild(lineBreak);
        }
    } else {
        btn.classList.add('clicked');
        selectedSeats++;
        var totalSeatsSpan = document.getElementById('totalSeats');
        var totalSeats = parseInt(totalSeatsSpan.textContent);
        totalSeatsSpan.textContent = totalSeats - 1;
        totalPrice += 550;

        // Create a new row for the seat, class, and price
        var newRow = document.createElement('div');
        newRow.classList.add('row');
        newRow.id = 'seatRow_' + seatName;

        var seatSpan = document.createElement('span');
        seatSpan.textContent = seatName + "   ";
        newRow.appendChild(seatSpan);

        var classSpan = document.createElement('span');
        classSpan.textContent = "Economy ";
        newRow.appendChild(classSpan);

        var priceSpan = document.createElement('span');
        priceSpan.textContent = "550";
        newRow.appendChild(priceSpan);

        var seatContainer = document.getElementById('seatContainer');
        seatContainer.appendChild(newRow);

        seatContainer.appendChild(document.createElement('br'));

        seatSpan.style.marginLeft = "20px";
        seatSpan.style.marginRight = "90px";
        classSpan.style.marginRight = "90px";
    }

    // Update the seat count
    var seatCountSpan = document.getElementById('seatCount').querySelector('span');
    seatCountSpan.textContent = selectedSeats;

    // Update the total price display
    var totalPriceSpan = document.getElementById('totalPrice');
    totalPriceSpan.textContent = "BTD " + totalPrice;

    // Enable apply button if 4 or more seats are selected
    var applyBtn = document.getElementById('applyBtn');
    applyBtn.disabled = selectedSeats < 4;

    // Calculate grand total
    var grandTotalSpan = document.getElementById('grandTotal');
    var grandTotal = totalPrice - discount;
    grandTotalSpan.textContent = "BTD " + grandTotal.toFixed(2);
}


// Apply coupon
var applyBtn = document.getElementById('applyBtn');

applyBtn.addEventListener('click', function () {
    var couponInput = document.getElementById('coupon').value;
    if (couponInput === "COUPLE 20") {
        discount = totalPrice * 0.20;
    } else if (couponInput === "NEW15") {
        discount = totalPrice * 0.15;
    } else {
        discount = 0;
    }

    // Update grand total
    var grandTotalSpan = document.getElementById('grandTotal');
    var grandTotal = totalPrice - discount;
    grandTotalSpan.textContent = "BTD " + grandTotal.toFixed(2);

    // Update discount price
    var discountContainer = document.getElementById('discountContainer');
    var discountSpan = document.createElement('span');
    discountSpan.textContent = "Discount: BTD " + discount.toFixed(2);
    discountSpan.style.marginLeft = "80px"; 

    discountContainer.innerHTML = '';
    
    // Append the discount price span to the container
    discountContainer.appendChild(discountSpan);

    if (discount > 0) {
        var couponField = document.getElementById('couponDisable');
        couponField.style.display = 'none';
    }
});




// Get the phone number input field and the Next button
const phoneNumberInput = document.getElementById('phoneNumberInput');
const nextBtn = document.getElementById('nextBtn');

phoneNumberInput.addEventListener('input', function() {
    const phoneNumberValue = phoneNumberInput.value.trim();
    var isSeatSelected = document.getElementsByClassName('.btn.clicked') !== null;

    // Check if the phone number consists only of numbers and is not empty
    if (/^\d+$/.test(phoneNumberValue) && phoneNumberValue.length > 0 && isSeatSelected) {
        // Enable the Next button
        nextBtn.removeAttribute('disabled');
    } else {
        // Disable the Next button
        nextBtn.setAttribute('disabled', 'disabled');
    }
});

// Get the current seat count
function getSeatCount() {
    var seatCountSpan = document.getElementById('seatCount');
    var currentCount = parseInt(seatCountSpan.textContent);
    currentCount++; // Increment the count
    seatCountSpan.textContent = currentCount; // Update the count displayed
    return currentCount; // Return the updated count
}
