const connection = require('../database/connection');

module.exports = {      
    async index(request, response) {
        const species = await connection('species')
            .select('*');
          
        if (!species) {
            return response.status(400).json({ error: 'Não encontrou species cadastrados!'});
        } 

        return response.json(species);
    },
    
    async newspecie(request, response) {
        console.log(request.body);
        const {descricao} = request.body;
        let status = 'A'; 
        const [speId] = await connection('species').insert({
            speDescricao: descricao, 
            speStatus: status  
        });
           
        return response.json({speId});
    },

}