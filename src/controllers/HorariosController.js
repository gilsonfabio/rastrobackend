const connection = require('../database/connection');

module.exports = {      
    async index(request, response) {
        const empresaId = request.headers.empresaid;
        try {

            const horarios = await connection('empresa_horarios')
                .where('ehrEmpId', empresaId)
                .join('empresas', 'empresas.empId','empresa_horarios.ehrEmpId')
                .select(
                    'empresa_horarios.*',
                    'empresas.empNomFantasia'
                );

            return response.json(horarios);


        } catch (error) {
            console.error(error);
            return response.status(500).json({
                message: error.message,
                stack: error.stack
            });
        }
    },
    
    async newhorario(request, response) {
        console.log(request.body);
        const {
            ehrDiaSemana,
            ehrHoraInicio,
            ehrHoraFim,
            ehrIntervaloInicio,
            ehrIntervaloFin,
            ehrAtende} = request.body;
        const empresaId = request.headers.empresaid;
        const [ehrId] = await connection('empresa_horarios').insert({
            ehrEmpId: empresaId, 
            ehrDiaSemana,
            ehrHoraInicio,
            ehrHoraFim,
            ehrIntervaloInicio,
            ehrIntervaloFin,
            ehrAtende
        });
           
        return response.json({ehrId});
    },

    async show(request, response) {
        const { id } = request.params;
        const empresaId = request.headers.empresaid;

        const horario = await connection("empresa_horarios")
            .where('ehrEmpId', empresaId)
            .where("ehrId", id)
            .first();

        if (!horario) {
            return response.status(404).json({
                error: "Horário não encontrado."
            });
        }

        return response.json(horario);

    },

    async update(request, response) {
        const { id } = request.params;
        const {
            ehrDiaSemana,
            ehrHoraInicio,
            ehrHoraFim,
            ehrIntervaloInicio,
            ehrIntervaloFin,
            ehrAtende } = request.body;
        const empresaId = request.headers.empresaid;

        const horario = await connection("empresa_horarios")
            .where('ehrEmpId', empresaId)    
            .where("ehrId", id)
            .first();

        if (!horario) {
            return response.status(404).json({
                error: "Horário não encontrado."
            });
        }

        await connection("empresa_horarios")
            .where('ehrEmpId', empresaId)
            .where("ehrId", id)
            .update({
                ehrDiaSemana,
                ehrHoraInicio,
                ehrHoraFim,
                ehrIntervaloInicio,
                ehrIntervaloFin,
                ehrAtende 
            });

        return response.json({
            success: true,
            message: "Horário atualizado com sucesso."
        });
    },

}