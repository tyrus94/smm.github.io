const apiKey = '2328eda490744012f1f3e57bc7b29314';
const apiUrl = 'https://reallikes24.com/api/v2';

// Fetch the services from the API and display them
function fetchServices() {
    fetch(apiUrl, {
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
        const serviceList = document.getElementById('services');
        services.forEach(service => {
            const li = document.createElement('li');
            li.textContent = `${service.name} - $${service.rate}`;
            li.addEventListener('click', () => {
                document.getElementById('serviceId').value = service.service;
                document.getElementById('order-form').style.display = 'block';
            });
            serviceList.appendChild(li);
        });
    });
}

// Handle the order form submission
document.getElementById('orderForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const serviceId = document.getElementById('serviceId').value;
    const quantity = document.getElementById('quantity').value;
    const link = document.getElementById('link').value;

    fetch(apiUrl, {
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
    .then(data => {
        document.getElementById('order-form').style.display = 'none';
        document.getElementById('order-status').style.display = 'block';
        document.getElementById('status-message').textContent = `Order created successfully. Order ID: ${data.order}`;
    });
});

// Initialize and fetch services when the page loads
document.addEventListener('DOMContentLoaded', fetchServices);
