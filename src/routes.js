const express = require('express');
const routes = express.Router();

const AdminController = require('./controllers/AdminController');
const UsersController = require('./controllers/UsersController');
const PetsController = require('./controllers/PetsController');
const SpeciesController = require('./controllers/SpeciesController');
const RacasController = require('./controllers/RacasController');
const TutoresController = require('./controllers/TutoresController');
const ServicosController = require('./controllers/ServicosController');
const RecursosController = require('./controllers/RecursosController');
const FeriadosController = require('./controllers/FeriadosController');
const HorariosController = require('./controllers/HorariosController');
const AgendaController = require('./controllers/AgendaController');
const EmpAgendaController = require('./controllers/EmpAgendaController');
const FuncionariosController = require('./controllers/FuncionariosController');
const FunHorariosController = require('./controllers/FunHorariosController');

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

routes.get('/especies', SpeciesController.index);
routes.post("/especies", SpeciesController.newspecie);
routes.get("/especies/:id", SpeciesController.show);
routes.put("/especies/:id", SpeciesController.update);

routes.get('/racas', RacasController.index);
routes.post("/racas", RacasController.newraca);
routes.get("/racas/:id", RacasController.show);
routes.put("/racas/:id", RacasController.update);

routes.get('/tutores', TutoresController.index);
routes.post("/tutores", TutoresController.newtutor);
routes.get("/tutores/:id", TutoresController.show);
routes.put("/tutores/:id", TutoresController.update);

routes.get('/pets', PetsController.index);
routes.post("/pets", PetsController.newpet);
routes.get("/pets/:id", PetsController.show);
routes.put("/pets/:id", PetsController.update);

routes.get('/servicos', ServicosController.index);
routes.post("/servicos", ServicosController.newservico);
routes.get("/servicos/:id", ServicosController.show);
routes.put("/servicos/:id", ServicosController.update);

routes.get('/recursos', RecursosController.index);
routes.post("/recursos", RecursosController.newrecurso);
routes.get("/recursos/:id", RecursosController.show);
routes.put("/recursos/:id", RecursosController.update);

routes.get('/feriados', FeriadosController.index);
routes.post("/feriados", FeriadosController.newferiado);
routes.get("/feriados/:id", FeriadosController.show);
routes.put("/feriados/:id", FeriadosController.update);

routes.get('/horarios', HorariosController.index);
routes.post("/horarios", HorariosController.newhorario);
routes.get("/horarios/:id", HorariosController.show);
routes.put("/horarios/:id", HorariosController.update);

routes.get('/agendamentos', AgendaController.index);
routes.post("/agendamentos", AgendaController.newagenda);
routes.get("/agendamentos/:id", AgendaController.show);
routes.put("/agendamentos/:id", AgendaController.update);

routes.get('/empAgenda', EmpAgendaController.index);
routes.post("/empAgenda", EmpAgendaController.newagenda);
routes.get("/empAgenda/:id", EmpAgendaController.show);
routes.put("/empAgenda/:id", EmpAgendaController.update);

routes.get('/funcionarios', FuncionariosController.index);
routes.post("/funcionarios", FuncionariosController.newfuncionario);
routes.get("/funcionarios/:id", FuncionariosController.show);
routes.put("/funcionarios/:id", FuncionariosController.update);

routes.post("/funHorarios", FunHorariosController.newhorario);
routes.get("/funHorarios/:id", FunHorariosController.show);
routes.put("/funHorarios/:id", FunHorariosController.update);

module.exports = routes;
