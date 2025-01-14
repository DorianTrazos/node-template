const express = require('express');
const app = express();

const path = require('path');
const fs = require('fs');
const port = 3000;

app.use(express.json());

const pathFile = path.resolve(__dirname, '../data/users.json');

app.get('/read', (req, res) => {
  fs.readFile(pathFile, (error, data) => {
    if (error) {
      res.send('Error al leer el archivo');
    } else {
      const jsonData = JSON.parse(data);
      res.send(jsonData);
    }
  });
});

app.post('/create', (req, res) => {
  const newUser = req.body;

  fs.readFile(pathFile, (error, data) => {
    if (error) {
      res.send('Error al leer el archivo');
    } else {
      const jsonData = JSON.parse(data);
      // jsonData.push(newUser)
      const newData = [...jsonData, newUser];

      fs.writeFile(pathFile, JSON.stringify(newData), error => {
        if (error) {
          res.send('Error al guardar dato');
        } else {
          res.send(newData);
        }
      });
    }
  });
});

app.patch('/update', (req, res) => {});

app.delete('/delete', (req, res) => {});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
