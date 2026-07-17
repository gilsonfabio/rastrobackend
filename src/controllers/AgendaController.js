const connection = require('../database/connection');

module.exports = {      
    async index(request, response) {
        const agenda = await connection('agenda')
            .select('*');
          
        if (!agenda) {
            return response.status(400).json({ error: 'Não encontrou agenda cadastrada!'});
        } 

        return response.json(agenda);
    },
    
    async newagenda(request, response) {
        console.log(request.body);
        const {tipo, resp, data, hora, petId, descricao} = request.body;
        let status = 'A'; 
        const [ageId] = await connection('agenda').insert({
            ageTip: tipo, 
            ageResId: resp,
            ageData: data, 
            ageHora: hora,
            agePetId: petId,
            ageDescricao: descricao,
            ageStatus: status  
        });
           
        return response.json({ageId});
    },

    async ageSearch(request, response) {
        const pet = request.body;
        const agenda = await connection('agenda')
            .where('agePetId', pet)
            .select('*');
          
        if (!agenda) {
            return response.status(400).json({ error: 'Não encontrou agenda com este ID!'});
        } 

        return response.json(agenda);
    },

}