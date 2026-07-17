const connection = require('../database/connection');

module.exports = {      
    async index(request, response) {
        const cidades = await connection('cidades')
            .select('*');
          
        if (!cidades) {
            return response.status(400).json({ error: 'Não encontrou cidades cadastradas!'});
        } 

        return response.json(cidades);
    },
    
    async newcidade(request, response) {
        console.log(request.body);
        const {descricao, codIbge} = request.body;
        let status = 'A'; 
        const [cidId] = await connection('cidades').insert({
            cidDescricao: descricao, 
            cidCodIbge: codIbge,
            cidStatus: status  
        });
           
        return response.json({cidId});
    },

}