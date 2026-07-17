const connection = require('../database/connection');

module.exports = {      
    async index(request, response) {
        const bairros = await connection('bairros')
            .select('*');
          
        if (!bairros) {
            return response.status(400).json({ error: 'Não encontrou bairros cadastradas!'});
        } 

        return response.json(bairros);
    },
    
    async newbairro(request, response) {
        console.log(request.body);
        const {descricao, cidade} = request.body;
        let status = 'A'; 
        const [baiId] = await connection('bairros').insert({
            baiDescricao: descricao, 
            baiCidId: cidade,
            baiStatus: status  
        });
           
        return response.json({baiId});
    },

    async baiSearch(request, response) {
        const id = request.body;
        const bairro = await connection('bairros')
            .where('baiId', id)
            .select('*');
          
        if (!bairros) {
            return response.status(400).json({ error: 'Não encontrou bairro com este ID!'});
        } 

        return response.json(bairros);
    },

}