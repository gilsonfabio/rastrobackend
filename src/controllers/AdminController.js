const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const saltRounds = 12;
require('dotenv/config');

module.exports = {       
    
    async signIn(request, response) {
        let email = request.body.email;
        let senha = request.body.password;

        //console.log('Email:', email);
        //console.log('Password:', senha);

        const admin = await connection('admin')
            .where('admEmail', email) 
            .select(`admId`, `admNome`, `admEmail`, `admPassword`, `admNivAcesso`)
            .first();
        
        if (!admin) {            
            return response.status(400).json({ error: 'Não encontrou usuário com este ID'});
        } 

        //let pass = usuario.usrPassword;
        //const match = await bcrypt.compare(senha, pass)

        //if(!match) {
        //    return response.status(403).send({ auth: false, message: 'User invalid!' });
        //}

        const adm = {
            id: admin.admId,
            name: admin.admNome,
            email: admin.admEmail,
            nivel: admin.admNivAcesso
        }

        //let token = jwt.sign({ id: user.usrId, name: user.usrNome, email: user.usrEmail, nivel: user.usrNivAcesso }, process.env.SECRET_JWT, {
        //    expiresIn: '1h'
        //});
        //let refreshToken = jwt.sign({ id: user.usrId, name: user.usrNome, email: user.usrEmail, nivel: user.usrNivAcesso  }, process.env.SECRET_JWT_REFRESH, {
        //    expiresIn: '2h'
        //});
        //console.log(user);
        
        return response.json(adm);

    },

    async newadmin(request, response) {
        console.log(request.body);
        const {nome, cpf, nascimento, email, celular , password, nivAcesso} = request.body;
        let status = 'A'; 
        let snhCrypt = await bcrypt.hash(password, saltRounds);
        const [admId] = await connection('admin').insert({
            admNome: nome, 
            admEmail: email, 
            admCpf: cpf, 
            admCelular: celular, 
            admNascimento: nascimento, 
            admPassword: snhCrypt, 
            admNivAcesso: nivAcesso, 
            admStatus: status  
        });
           
        return response.json({admId});
    },
     
};
