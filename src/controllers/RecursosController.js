const connection = require('../database/connection');

module.exports = {      
    async index(request, response) {
        const empresaId = request.headers.empresaid;
        try {

            const recursos = await connection('recursos')
                .where('recEmpId', empresaId)
                .join('empresas', 'empresas.empId','recursos.recEmpId')
                .select(
                    'recursos.*',
                    'empresas.empNomFantasia'
                );

            return response.json(recursos);


        } catch (error) {
            console.error(error);
            return response.status(500).json({
                message: error.message,
                stack: error.stack
            });
        }
    },
    
    async newrecurso(request, response) {
        console.log(request.body);
        const {
            recNome,
            recTipo,
            recAtivo} = request.body;
        const empresaId = request.headers.empresaid;
        let status = 0; 
        const [recId] = await connection('recursos').insert({
            recEmpId: empresaId, 
            recNome, 
            recTipo, 
            recAtivo: status
        });
           
        return response.json({recId});
    },

    async show(request, response) {
        const { id } = request.params;
        const empresaId = request.headers.empresaid;

        const recurso = await connection("recursos")
            .where('recEmpId', empresaId)
            .where("recId", id)
            .first();

        if (!serv) {
            return response.status(404).json({
                error: "Recurso não encontrado."
            });
        }

        return response.json(recurso);

    },

    async update(request, response) {
        const { id } = request.params;
        const {
            recNome, 
            recTipo,             
            recAtivo } = request.body;
        const empresaId = request.headers.empresaid;

        const recurso = await connection("recursos")
            .where('recEmpId', empresaId)    
            .where("recId", id)
            .first();

        if (!serv) {
            return response.status(404).json({
                error: "Recurso não encontrado."
            });
        }

        await connection("recursos")
            .where('recEmpId', empresaId)
            .where("recId", id)
            .update({
                recNome, 
                recTipo, 
                recAtivo 
            });

        return response.json({
            success: true,
            message: "Recurso atualizado com sucesso."
        });
    },

}