const connection = require('../database/connection');

module.exports = {      
    async index(request, response) {
        const empresaId = request.headers.empresaid;
        try {

            const agendamentos = await connection('agendamentos')
                .where('ageEmpId', empresaId)
                .join('empresas', 'empresas.empId','agendamentos.ageEmpId')
                .select(
                    'agendamentos.*',
                    'empresas.empNomFantasia'
                );

            return response.json(agendamentos);


        } catch (error) {
            console.error(error);
            return response.status(500).json({
                message: error.message,
                stack: error.stack
            });
        }
    },
    
    async newagenda(request, response) {
        const empresaId = request.headers.empresaid;
        console.log(request.body);
        const {agePetId,
            ageTutId,
            ageFunId,
            ageRecId,
            ageSerId,
            ageData,
            ageHoraInicio,
            ageHoraFim,
            ageStatus,
            ageValor,
            ageObservacao} = request.body;
        const [ageId] = await connection('agendamentos').insert({
            agePetId,
            ageTutId,
            ageFunId,
            ageRecId,
            ageSerId,
            ageData,
            ageHoraInicio,
            ageHoraFim,
            ageStatus,
            ageValor,
            ageObservacao
        });
           
        return response.json({ageId});
    },

    async show(request, response) {
        const { id } = request.params;
        const empresaId = request.headers.empresaid;

        const agendamento = await connection("agendamentos")
            .where('ageEmpId', empresaId)
            .where("ageId", id)
            .first();

        if (!agendamento) {
            return response.status(404).json({
                error: "Agendamento não encontrado."
            });
        }

        return response.json(agendamento);

    },

    async update(request, response) {
        const { id } = request.params;
        const {
            agePetId,
            ageTutId,
            ageFunId,
            ageRecId,
            ageSerId,
            ageData,
            ageHoraInicio,
            ageHoraFim,
            ageStatus,
            ageValor,
            ageObservacao} = request.body;
        const empresaId = request.headers.empresaid;

        const agendamento = await connection("agendamentos")
            .where('ageEmpId', empresaId)    
            .where("ageId", id)
            .first();

        if (!agendamento) {
            return response.status(404).json({
                error: "Agendamento não encontrado."
            });
        }

        await connection("agendamentos")
            .where('ageEmpId', empresaId)
            .where("ageId", id)
            .update({
                agePetId,
                ageTutId,
                ageFunId,
                ageRecId,
                ageSerId,
                ageData,
                ageHoraInicio,
                ageHoraFim,
                ageStatus,
                ageValor,
                ageObservacao
            });

        return response.json({
            success: true,
            message: "Agendamento atualizado com sucesso."
        });
    },
}