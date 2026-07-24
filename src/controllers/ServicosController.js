const connection = require('../database/connection');

module.exports = {      
    async index(request, response) {
        const empresaId = request.headers.empresaid;
        try {

            const servicos = await connection('servicos')
                .where('serEmpId', empresaId)
                .join('empresas', 'empresas.empId','servicos.serEmpId')
                .select(
                    'servicos.*',
                    'empresas.empNomFantasia'
                );

            return response.json(servicos);


        } catch (error) {
            console.error(error);
            return response.status(500).json({
                message: error.message,
                stack: error.stack
            });
        }
    },
    
    async newservico(request, response) {
        console.log(request.body);
        const {
            serNome, 
            serTipo, 
            serDuracao, 
            serValor, 
            serCorAgenda} = request.body;
        const empresaId = request.headers.empresaid;
        let status = 0; 
        const [serId] = await connection('servicos').insert({
            serEmpId: empresaId, 
            serNome, 
            serTipo, 
            serDuracao, 
            serValor, 
            serCorAgenda,
            serAtivo: status
        });
           
        return response.json({serId});
    },

    async show(request, response) {
        const { id } = request.params;
        const empresaId = request.headers.empresaid;

        const serv = await connection("servicos")
            .where('serEmpId', empresaId)
            .where("serId", id)
            .first();

        if (!serv) {
            return response.status(404).json({
                error: "Serviço não encontrado."
            });
        }

        return response.json(serv);

    },

    async update(request, response) {
        const { id } = request.params;
        const {
            serNome, 
            serTipo, 
            serDuracao, 
            serValor, 
            serCorAgenda,
            serAtivo } = request.body;
        const empresaId = request.headers.empresaid;

        const serv = await connection("servicos")
            .where('serEmpId', empresaId)    
            .where("serId", id)
            .first();

        if (!serv) {
            return response.status(404).json({
                error: "Serviço não encontrado."
            });
        }

        await connection("servicos")
            .where('serEmpId', empresaId)
            .where("serId", id)
            .update({
                serNome, 
                serTipo, 
                serDuracao, 
                serValor, 
                serCorAgenda,
                serAtivo 
            });

        return response.json({
            success: true,
            message: "Serviço atualizado com sucesso."
        });
    },

}