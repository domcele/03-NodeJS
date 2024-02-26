const htmlForm = document.getElementById('userForm');
const htmlUserName = document.getElementById('userName');
const htmlUserSurname = document.getElementById('userSurname');
const htmlUserEmail = document.getElementById('userEmail');
const htmlMembSelect = document.getElementById('userMemb');

let serviceIds = [];
let serviceNames = [];

htmlForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const selectedServiceName = htmlMembSelect.value;
  const selectedIndex = serviceNames.indexOf(selectedServiceName);

  if (selectedIndex !== -1) {
    const body = {
      name: htmlUserName.value,
      surname: htmlUserSurname.value,
      email: htmlUserEmail.value,
      service_id: serviceIds[selectedIndex],
    };

    fetch('http://localhost:3000/users', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((response) => {
        console.log(response);
        htmlUserName.value = '';
        htmlUserSurname.value = '';
        htmlUserEmail.value = '';
      })
      .catch((error) => console.error(error));
  }
});

const selectOption = (services) => {
  services.forEach((service) => {
    const htmlMembOpt = document.createElement('option');
    htmlMembOpt.textContent = service.name;

    serviceIds.push(service._id);
    serviceNames.push(service.name);

    htmlMembSelect.append(htmlMembOpt);
  });
};

fetch('http://localhost:3000/services')
  .then((resp) => resp.json())
  .then((response) => {
    console.log(response);
    selectOption(response);
  })
  .catch((error) => console.error(error));
