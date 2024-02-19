const htmlBody = document.getElementById('body');
const htmlSelect = document.getElementById('uni');
const htmlForm = document.getElementById('form');
const htmlBut = document.getElementById('button');
const htmlFirstName = document.getElementById('firstName');
const htmlLastName = document.getElementById('lastName');
const htmlJob = document.getElementById('job');
const htmlAge = document.getElementById('age');

const selectUni = (teachersUnis) => {
  const uniqueUnis = [];

  teachersUnis.forEach((teachersUni) => {
    if (!uniqueUnis.includes(teachersUni.uni)) {
      uniqueUnis.push(teachersUni.uni);
    }
  });

  while (htmlSelect.firstChild) {
    htmlSelect.removeChild(htmlSelect.firstChild);
  }

  uniqueUnis.forEach((uniName) => {
    const option = document.createElement('option');
    option.textContent = uniName;
    htmlSelect.appendChild(option);
  });
};

fetch('http://localhost:3000/teachers')
  .then((resp) => resp.json())
  .then((response) => {
    console.log(response);
    selectUni(response);
  })
  .catch((error) => console.error(error));

htmlForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const body = {
    name: htmlFirstName.value,
    surname: htmlLastName.value,
    job: htmlJob.value,
    uni: htmlSelect.value,
    age: String(htmlAge.value),
  };

  fetch('http://localhost:3000/teachers', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then((response) => {
      console.log(response);
      // renderTeacherList(response);
      // htmlFirstName.value = '';
      // htmlLastName.value = '';
      // htmlJob.value = '';
      // htmlAge.value = '';
    })
    .catch((error) => console.error(error));
});
