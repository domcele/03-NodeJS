const htmlForm = document.getElementById('membForm');
const htmlMembName = document.getElementById('membName');
const htmlMembPrice = document.getElementById('membPrice');
const htmlMembDesc = document.getElementById('membDescription');

htmlForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const body = {
    name: htmlMembName.value,
    price: String(htmlMembPrice.value),
    description: htmlMembDesc.value,
  };

  fetch('http://localhost:3000/services', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then((response) => {
      console.log(response);
      htmlMembName.value = '';
      htmlMembPrice.value = '';
      htmlMembDesc.value = '';
    })
    .catch((error) => console.error(error));
});
