const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let ticketdata = require('./data');

// GET all tickets
app.get('/tickets', (req, res) => {
  res.send(ticketdata);
});

app.get('/tickets/:id', (req, res) => {
  const id = +req.params.id;
  const filteredId = ticketdata.find((ticket) => ticket.id === id);
  res.send(filteredId);
});

app.post('/tickets', (req, res) => {
  let randomRow = Math.floor(Math.random() * 10) + 1;
  let randomSeat = Math.floor(Math.random() * 20) + 1;

  const newTicket = {
    id: ticketdata.length + 1,
    row: randomRow,
    seat: randomSeat,
  };

  const sameSpots = ticketdata.find((ticket) => ticket.row === newTicket.row && ticket.seat === newTicket.seat);

  if (sameSpots) {
    res.status(400).send(`seat ticket row:${newTicket.row}, seat: ${newTicket.seat} exists`);
  } else {
    ticketdata.push(newTicket);
    res.send(ticketdata);
  }
});

app.listen(port, () => {
  console.log(`App is listening on the port ${port}`);
});
