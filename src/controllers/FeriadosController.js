const connection = require('../database/connection');

module.exports = {      
    async index(request, response) {
        const empresaId = request.headers.empresaid;
        try {

            const feriados = await connection('empresa_feriados')
                .where('ferEmpId', empresaId)
                .join('empresas', 'empresas.empId','empresa_feriados.ferEmpId')
                .select(
                    'empresa_feriados.*',
                    'empresas.empNomFantasia'
                );

            return response.json(feriados);


        } catch (error) {
            console.error(error);
            return response.status(500).json({
                message: error.message,
                stack: error.stack
            });
        }
    },
    
    async newferiado(request, response) {
        console.log(request.body);
        const {
            ferData,
            ferDescricao,
            ferAtende} = request.body;
        const empresaId = request.headers.empresaid;
        const [ferId] = await connection('empresa_feriados').insert({
            ferEmpId: empresaId, 
            ferData, 
            ferDescricao, 
            ferAtende
        });
           
        return response.json({ferId});
    },

    async show(request, response) {
        const { id } = request.params;
        const empresaId = request.headers.empresaid;

        const feriado = await connection("empresa_feriados")
            .where('ferEmpId', empresaId)
            .where("ferId", id)
            .first();

        if (!feriado) {
            return response.status(404).json({
                error: "Feriado não encontrado."
            });
        }

        return response.json(feriado);

    },

    async update(request, response) {
        const { id } = request.params;
        const {
            ferData, 
            ferDescricao,             
            ferAtende } = request.body;
        const empresaId = request.headers.empresaid;

        const feriado = await connection("empresa_feriados")
            .where('ferEmpId', empresaId)    
            .where("ferId", id)
            .first();

        if (!feriado) {
            return response.status(404).json({
                error: "Feriado não encontrado."
            });
        }

        await connection("empresa_feriados")
            .where('ferEmpId', empresaId)
            .where("ferId", id)
            .update({
                ferNome, 
                ferTipo, 
                ferAtende 
            });

        return response.json({
            success: true,
            message: "Feriado atualizado com sucesso."
        });
    },

}