const connection = require('../database/connection');

module.exports = {      
    async index(request, response) {
        const pets = await connection('pets')
            .select('*');
          
        if (!pets) {
            return response.status(400).json({ error: 'Não encontrou pets cadastrados!'});
        } 

        return response.json(pets);
    },
    
    async newpet(request, response) {
        console.log(request.body);
        const {nome, specie, raca, usrId, nascimento , caracteristica, porte} = request.body;
        let status = 'A'; 
        const [petId] = await connection('pets').insert({
            petNome: nome, 
            petSpecie: specie, 
            petRaca: raca, 
            petUsrId: usrId, 
            petNascimento: nascimento, 
            petCaracter: caracteristica, 
            petPorte: porte,
            petStatus: status  
        });
           
        return response.json({petId});
    },

}