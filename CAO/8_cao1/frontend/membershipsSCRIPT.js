const section1 = document.getElementById('section1');

// const cardFooter = document.createElement('div');

// cardHeader.textContent = 'asdnalsdnl';

// section1.append(cardContainer);
// cardContainer.append(cardHeader, cardFooter);

const represent = (services) => {
  services.forEach((service) => {
    const cardContainer = document.createElement('div');
    const cardHeader = document.createElement('div');

    cardHeader.textContent = `$${service.price} ${service.name}`;
    cardContainer.append(cardHeader);
    section1.append(cardContainer);

    cardContainer.style.border = '1px solid black';
  });
};

fetch('http://localhost:3000/services')
  .then((resp) => resp.json())
  .then((response) => {
    console.log(response);
    represent(response);
  })
  .catch((error) => console.error(error));
