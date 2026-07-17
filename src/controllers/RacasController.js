const connection = require('../database/connection');

module.exports = {      
    async index(request, response) {
        try {

            const racas = await connection('racas')
                .join('especies', 'especies.espId', 'racas.racEspId')
                .select(
                    'racas.*',
                    'especies.espNome'
                );


            return response.json(racas);


        } catch(error) {

            return response.status(500).json({
                error:error.message
            });

        }
    },
    
    async newraca(request, response) {
        console.log(request.body);
        const {descricao, speId} = request.body;
        let status = 'A'; 
        const [racId] = await connection('racas').insert({
            racDescricao: descricao, 
            racSpeId: speId,
            racStatus: status  
        });
           
        return response.json({racId});
    },

}