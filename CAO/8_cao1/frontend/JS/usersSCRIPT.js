const section2 = document.getElementById('section2');
const sortBut = document.getElementById('sortbut');
let sortOrder = 'asc';

const represent = (users) => {
  section2.innerHTML = ''; // Clear previous data
  users.forEach((user) => {
    const cardContainer = document.createElement('div');
    const cardHeader = document.createElement('div');
    const cardFooter = document.createElement('div');
    const cardHeaderP1 = document.createElement('p');
    const cardFooterP1 = document.createElement('p');
    const cardFooterP2 = document.createElement('p');
    const cardFooterP3 = document.createElement('p');

    cardHeaderP1.textContent = `${user.name} ${user.surname}`;
    cardFooterP1.textContent = `${user.email}`;

    if (user.services && user.services.name) {
      cardFooterP2.textContent = `Membership: ${user.services.name}`;
    } else {
      cardFooterP2.textContent = 'Membership: Not found';
    }

    cardFooterP3.textContent = `ip: ${user.service_id}`;
    cardHeader.append(cardHeaderP1);
    cardFooter.append(cardFooterP1, cardFooterP2, cardFooterP3);
    cardContainer.append(cardHeader, cardFooter);
    section2.append(cardContainer);

    section2.style.display = 'flex';
    cardContainer.style.border = '1px solid black';
    cardContainer.style.width = '16rem';
  });
};

const toggleSort = () => {
  sortOrder = sortOrder === 'asc' ? 'dsc' : 'asc';
  sortBut.textContent = `Sorting By Name: ${sortOrder.toUpperCase()}`;
  fetchData();
};

const fetchData = () => {
  fetch(`http://localhost:3000/users/names/${sortOrder}`)
    .then((resp) => resp.json())
    .then((response) => {
      console.log(response.data);
      represent(response.data); // Use response.data since the server sends { data: [] }
    })
    .catch((error) => console.error(error));
};

sortBut.addEventListener('click', toggleSort);
fetchData(); // Initial fetch on page load
