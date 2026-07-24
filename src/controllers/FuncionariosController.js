const connection = require('../database/connection');

module.exports = {      
    async index(request, response) {
        const empresaId = request.headers.empresaid;
        try {

            const funcionarios = await connection('funcionarios')
                .where('funEmpId', empresaId)
                .join('empresas', 'empresas.empId','funcionarios.funEmpId')
                .select(
                    'funcionarios.*',
                    'empresas.empNomFantasia'
                );

            return response.json(funcionarios);


        } catch (error) {
            console.error(error);
            return response.status(500).json({
                message: error.message,
                stack: error.stack
            });
        }
    },
    
    async newfuncionario(request, response) {
        console.log(request.body);
        const {
            funCargo, 
            funCRMV, 
            funUsrId, 
            funAtivo} = request.body;
        const empresaId = request.headers.empresaid;
        const [funId] = await connection('funcionarios').insert({
            funEmpId: empresaId, 
            funCargo, 
            funCRMV, 
            funUsrId, 
            funAtivo
        });
           
        return response.json({funId});
    },

    async show(request, response) {
        const { id } = request.params;
        const empresaId = request.headers.empresaid;

        const funcionario = await connection("funcionarios")
            .where('funEmpId', empresaId)
            .where("funId", id)
            .first();

        if (!funcionario) {
            return response.status(404).json({
                error: "Funcionário não encontrado."
            });
        }

        return response.json(funcionario);

    },

    async update(request, response) {
        const { id } = request.params;
        const {
            funCargo, 
            funCRMV, 
            funUsrId, 
            funAtivo } = request.body;
        const empresaId = request.headers.empresaid;

        const funcionario = await connection("funcionarios")
            .where('funEmpId', empresaId)    
            .where("funId", id)
            .first();

        if (!funcionario) {
            return response.status(404).json({
                error: "Funcionario não encontrado."
            });
        }

        await connection("funcionarios")
            .where('funEmpId', empresaId)
            .where("funId", id)
            .update({
                funCargo, 
                funCRMV, 
                funUsrId, 
                funAtivo 
            });

        return response.json({
            success: true,
            message: "Funcionário atualizado com sucesso."
        });
    },

}