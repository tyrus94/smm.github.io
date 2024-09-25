// Declare your API key here
const apiKey = '2328eda490744012f1f3e57bc7b29314'; // Your API key
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = 'https://reallikes24.com/api/v2'; // SMM panel API URL

// Fetch services from the API
fetch(proxyUrl + apiUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        key: apiKey,
        action: 'services'
    })
})
.then(response => response.json())
.then(services => {
    console.log(services); // Log services to the console
    const serviceList = document.getElementById('services');
    serviceList.innerHTML = ''; // Clear existing services

    // Populate the service list in the DOM
    services.forEach(service => {
        const li = document.createElement('li');
        li.textContent = `${service.name} - $${service.rate}`;
        
        // Click event to display order form
        li.addEventListener('click', () => {
            document.getElementById('serviceId').value = service.service;
            document.getElementById('order-form').style.display = 'block';
        });
        
        serviceList.appendChild(li);
    });
})
.catch(error => {
    console.error('Error:', error); // Log any errors
});

// Function to handle order submission
document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const serviceId = document.getElementById('serviceId').value;
    const link = document.getElementById('link').value;
    const quantity = document.getElementById('quantity').value;

    // Add order using the API
    fetch(proxyUrl + apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            key: apiKey,
            action: 'add',
            service: serviceId,
            link: link,
            quantity: quantity
        })
    })
    .then(response => response.json())
    .then(orderResponse => {
        console.log('Order Response:', orderResponse); // Log order response
        alert(`Order placed! Order ID: ${orderResponse.order}`);
    })
    .catch(error => {
        console.error('Error placing order:', error); // Log any errors
    });
});
