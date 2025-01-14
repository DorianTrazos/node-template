const path = require('path');
const fs = require('fs');
const pathFile = path.resolve(__dirname, '../../data/users.json');

const usersController = {};

usersController.getAllUsers = (req, res) => {
  fs.readFile(pathFile, (error, data) => {
    if (error) {
      res.status(500).json({ error: 'Error al leer el archivo' });
    } else {
      const jsonData = JSON.parse(data);
      res.status(200).json(jsonData);
    }
  });
};

usersController.getUserById = (req, res) => {
  const userId = req.params.id;

  fs.readFile(pathFile, (error, data) => {
    if (error) {
      res.status(500).json({ error: 'Error al leer el archivo' });
    } else {
      const jsonData = JSON.parse(data);
      const userFounded = jsonData.find(user => user.userId === userId);
      if (userFounded) {
        res.status(200).json(userFounded);
      } else {
        res.status(404).json({ error: 'Usurio no encontrado' });
      }
    }
  });
};

// send -> Sirve para mandar cualquier información
// json -> Sirve para mandar información en formato objeto

usersController.createNewUser = (req, res) => {
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
};

usersController.updateUser = (req, res) => {
  const userId = req.body.id;
  fs.readFile(pathFile, (error, data) => {
    if (error) {
      res.send('Error al leer el archivo');
    } else {
      // Haces una copia de los datos
      const jsonData = JSON.parse(data);

      // Modificar la copia
      const userFounded = jsonData.find(user => user.userId === userId);
      (userFounded.name = req.body.name), (userFounded.email = req.body.email);

      fs.writeFile(pathFile, JSON.stringify(jsonData), error => {
        if (error) {
          res.send('Error al guardar dato');
        } else {
          res.send(jsonData);
        }
      });
    }
  });
};

usersController.deleteUser = (req, res) => {
  const userId = req.body.id;
  fs.readFile(pathFile, (error, data) => {
    if (error) {
      res.send('Error al leer el archivo');
    } else {
      // Haces una copia de los datos
      const jsonData = JSON.parse(data);

      // Modificar la copia
      const usersUpdated = jsonData.filter(user => user.userId === userId);

      fs.writeFile(pathFile, JSON.stringify(usersUpdated), error => {
        if (error) {
          res.send('Error al guardar dato');
        } else {
          res.send(usersUpdated);
        }
      });
    }
  });
};

module.exports = usersController;
