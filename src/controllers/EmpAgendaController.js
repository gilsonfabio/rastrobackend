const connection = require('../database/connection');

module.exports = {      
    async index(request, response) {
        const empresaId = request.headers.empresaid;
        try {

            const agendas = await connection('empresa_agenda')
                .where('ehrEmpId', empresaId)
                .join('empresas', 'empresas.empId','empresa_agenda.ehrEmpId')
                .select(
                    'empresa_agenda.*',
                    'empresas.empNomFantasia'
                );

            return response.json(agendas);


        } catch (error) {
            console.error(error);
            return response.status(500).json({
                message: error.message,
                stack: error.stack
            });
        }
    },
    
    async newagenda(request, response) {
        console.log(request.body);
        const {
            eagIntervalo,
            eagPermiteEncaixe,
            eagAntecedenciaDias,
            eagTempoCancelamento} = request.body;
        const empresaId = request.headers.empresaid;
        const [eagId] = await connection('empresa_agenda').insert({
            eagEmpId: empresaId, 
            eagIntervalo,
            eagPermiteEncaixe,
            eagAntecedenciaDias,
            eagTempoCancelamento
        });
           
        return response.json({eagId});
    },

    async show(request, response) {
        const { id } = request.params;
        const empresaId = request.headers.empresaid;

        const agenda = await connection("empresa_agenda")
            .where('eagEmpId', empresaId)
            .where("eagId", id)
            .first();

        if (!agenda) {
            return response.status(404).json({
                error: "Agenda não encontrado."
            });
        }

        return response.json(agenda);

    },

    async update(request, response) {
        const { id } = request.params;
        const {
            eagIntervalo,
            eagPermiteEncaixe,
            eagAntecedenciaDias,
            eagTempoCancelamento } = request.body;
        const empresaId = request.headers.empresaid;

        const agenda = await connection("empresa_agenda")
            .where('eagEmpId', empresaId)    
            .where("eagId", id)
            .first();

        if (!agenda) {
            return response.status(404).json({
                error: "Agenda não encontrado."
            });
        }

        await connection("empresa_agenda")
            .where('eagEmpId', empresaId)
            .where("eagId", id)
            .update({
                eagIntervalo,
                eagPermiteEncaixe,
                eagAntecedenciaDias,
                eagTempoCancelamento
            });

        return response.json({
            success: true,
            message: "Agenda atualizado com sucesso."
        });
    },

}