const connection = require('../database/connection');

module.exports = {      
    async index(request, response) {
        const funcionaId = request.headers.funcionaid;
        try {

            const agebloqueios = await connection('agenda_bloqueios')
                .where('ablFunId', funcionaId)
                .join('funcionarios', 'funcionarios.funId','agenda_bloqueios.ablFunId')
                .select(
                    'agenda_bloqueios.*',
                    'funcionarios.funNome'
                );

            return response.json(agebloqueios);


        } catch (error) {
            console.error(error);
            return response.status(500).json({
                message: error.message,
                stack: error.stack
            });
        }
    },
    
    async newbloqueio(request, response) {
        console.log(request.body);
        const {ablFunId, 
            ablDataInicio, 
            ablDataFim, 
            ablHoraInicio, 
            ablHoraFim, 
            ablMotivo} = request.body;
        const [ablId] = await connection('agenda_bloqueios').insert({
            ablFunId, 
            ablDataInicio, 
            ablDataFim, 
            ablHoraInicio, 
            ablHoraFim, 
            ablMotivo
        });
           
        return response.json({ablId});
    },

    async show(request, response) {
        const { id } = request.params;
        const agebloqueio = await connection("agenda_bloqueios")
            .where("ablId", id)
            .first();

        if (!agebloqueio) {
            return response.status(404).json({
                error: "Bloqueio de Agenda não encontrado."
            });
        }

        return response.json(agebloqueio);

    },

    async update(request, response) {
        const { id } = request.params;
        const {
            ablFunId, 
            ablDataInicio, 
            ablDataFim, 
            ablHoraInicio, 
            ablHoraFim, 
            ablMotivo} = request.body;
        const agebloqueio = await connection("agenda_bloqueios")
            .where("ablId", id)
            .first();

        if (!agebloqueio) {
            return response.status(404).json({
                error: "Bloqueio de Agenda não encontrado."
            });
        }

        await connection("agenda_bloqueios")
            .where("ablId", id)
            .update({
                ablFunId, 
                ablDataInicio, 
                ablDataFim, 
                ablHoraInicio, 
                ablHoraFim, 
                ablMotivo
            });

        return response.json({
            success: true,
            message: "Bloqueio de Agenda atualizado com sucesso."
        });
    },
}