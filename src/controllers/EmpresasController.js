const connection = require('../database/connection');

module.exports = {      
    async index(request, response) {
        const empresas = await connection('empresas')
            .select('*');
          
        if (!empresas) {
            return response.status(400).json({ error: 'Não encontrou empresas cadastradas!'});
        } 

        return response.json(empresas);
    },
    
    async newempresa(request, response) {
        console.log(request.body);
        const {descricao, cidade} = request.body;
        let status = 'A'; 
        const [empId] = await connection('empresas').insert({
            empDescricao: descricao, 
            empCidId: cidade,
            empStatus: status  
        });
           
        return response.json({empId});
    },

    async empSearch(request, response) {
        const id = request.body;
        const empresa = await connection('empresas')
            .where('empId', id)
            .join('cidades', 'cidId', 'empresas.empCidId')
            .join('bairros', 'baiId', 'empresas.empBaiId')
            .select(['empresas.*', 'cidades.cidDescricao', 'bairros.baiDescricao']);
          
        if (!empresas) {
            return response.status(400).json({ error: 'Não encontrou empresa com este ID!'});
        } 

        return response.json(empresa);
    },

}