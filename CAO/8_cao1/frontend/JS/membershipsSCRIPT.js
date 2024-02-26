const section1 = document.getElementById('section1');

const represent = (services) => {
  services.forEach((service) => {
    const cardContainer = document.createElement('div');
    const cardHeader = document.createElement('div');
    const cardHeaderP1 = document.createElement('p');
    const cardHeaderP2 = document.createElement('p');
    const cardFooter = document.createElement('div');
    const cardDelete = document.createElement('button');

    cardHeaderP1.textContent = `$${service.price} ${service.name}`;
    cardHeaderP2.textContent = `${service.description}`;
    cardDelete.textContent = `Delete`;

    cardHeader.append(cardHeaderP1, cardHeaderP2);
    cardFooter.append(cardDelete);
    cardContainer.append(cardHeader, cardFooter);
    section1.append(cardContainer);

    section1.style.display = 'flex';
    cardContainer.style.border = '1px solid black';
    cardContainer.style.width = '16rem';
    cardContainer.style.textAlign = 'center';

    cardDelete.addEventListener('click', async () => {
      try {
        const deleteResponse = await fetch(
          `http://localhost:3000/services/${service._id}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (deleteResponse.ok) {
          cardContainer.remove(); // Remove the card from the DOM
          console.log('Card deleted successfully');
        } else {
          console.error('Failed to delete card');
        }
      } catch (error) {
        console.error('Error deleting card:', error);
      }
    });
  });
};

fetch('http://localhost:3000/services')
  .then((resp) => resp.json())
  .then((response) => {
    console.log(response);
    represent(response);
  })
  .catch((error) => console.error(error));
