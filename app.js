const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = 'https://reallikes24.com/api/v2'; // The API URL stays the same

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
    console.log(services);  // You should see the service list in the console
    const serviceList = document.getElementById('services');
    serviceList.innerHTML = '';

    services.forEach(service => {
        const li = document.createElement('li');
        li.textContent = `${service.name} - $${service.rate}`;
        li.addEventListener('click', () => {
            document.getElementById('serviceId').value = service.service;
            document.getElementById('order-form').style.display = 'block';
        });
        serviceList.appendChild(li);
    });
})
.catch(error => {
    console.error('Error:', error);  // This will log any error that occurs
});
