const connection = require('../database/connection');

module.exports = {      
     
    async newhorario(request, response) {
        console.log(request.body);
        const {
            fhrFunId,
            fhrDiaSemana,
            fhrHoraInicio,
            fhrHoraFim,
            fhrIntervaloInicio,
            fhrIntervaloFin,
            fhrAtende} = request.body;
        const empresaId = request.headers.empresaid;
        const [fhrId] = await connection('funcionario_horarios').insert({
            fhrFunId,
            fhrDiaSemana,
            fhrHoraInicio,
            fhrHoraFim,
            fhrIntervaloInicio,
            fhrIntervaloFin,
            fhrAtende
        });
           
        return response.json({fhrId});
    },

    async show(request, response) {
        const { id } = request.params;
        const horario = await connection("funcionario_horarios")
            .where('fhrFunId', id)
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
            fhrDiaSemana,
            fhrHoraInicio,
            fhrHoraFim,
            fhrIntervaloInicio,
            fhrIntervaloFin,
            fhrAtende } = request.body;
        const horario = await connection("funcionario_horarios")
            .where('fhrFunId', id)    
            .first();

        if (!horario) {
            return response.status(404).json({
                error: "Horário não encontrado."
            });
        }

        await connection("funcionario_horarios")
            .where('fhrFunId', id)
            .update({
                fhrDiaSemana,
                fhrHoraInicio,
                fhrHoraFim,
                fhrIntervaloInicio,
                fhrIntervaloFin,
                fhrAtende 
            });

        return response.json({
            success: true,
            message: "Horário atualizado com sucesso."
        });
    },

}