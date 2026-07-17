const express = require('express');
const routes = express.Router();

const AdminController = require('./controllers/AdminController');
const UsersController = require('./controllers/UsersController');
const PetsController = require('./controllers/PetsController');
const SpeciesController = require('./controllers/SpeciesController');
const RacasController = require('./controllers/RacasController');

routes.get('/', (request, response) => {
    response.json({
        message: 'Bem-vindo ao servidor BackRastro!',
    });
});

routes.post('/logAdmin', AdminController.signIn);
routes.post('/newAdmin', AdminController.newadmin);

routes.post('/signIn', UsersController.signIn);
routes.post('/newuser', UsersController.newuser);
routes.get('/searchUser/:cpf', UsersController.searchUser);
routes.get('/busUser/:idUsr', UsersController.busUser);
routes.post('/loginCpf', UsersController.loginCPF);
routes.post('/saveToken', UsersController.saveToken);

routes.get('/pets', PetsController.index);
routes.post('/newpet', PetsController.newpet);

routes.get('/species', SpeciesController.index);
routes.post('/newspecie', SpeciesController.newspecie);

routes.get('/racas', RacasController.index);
routes.post('/newraca', RacasController.newraca);

module.exports = routes;
