const connection = require('../database/connection');

module.exports = {      
    async index(request, response) {
        const empresaId = request.headers.empresaid;
        try {

            const tutores = await connection('tutores')
                .where('tutEmpId', empresaId)
                .join('empresas', 'empresas.empCpfCnpj','tutores.tutEmpId')
                .select(
                    'tutores.*',
                    'empresas.empNomFantasia'
                );

            return response.json(tutores);


        } catch (error) {
            console.error(error);
            return response.status(500).json({
                message: error.message,
                stack: error.stack
            });
        }
    },
    
    async newtutor(request, response) {
        console.log(request.body);
        const {
            tutNome, 
            tutCpf, 
            tutNascimento, 
            tutEmail, 
            tutEndereco, 
            tutNumero, 
            tutComplemento, 
            tutBairro, 
            tutCidade, 
            tutCep, 
            tutUf, 
            tutCelular } = request.body;
        const empresaId = request.headers.empresaid;
        let status = 'A'; 
        const [tutId] = await connection('tutores').insert({
            tutEmpId: empresaId, 
            tutNome, 
            tutCpf, 
            tutNascimento, 
            tutEmail, 
            tutEndereco, 
            tutNumero, 
            tutComplemento, 
            tutBairro, 
            tutCidade, 
            tutCep, 
            tutUf, 
            tutCelular, 
            tutStatus: status
        });
           
        return response.json({tutId});
    },

    async show(request, response) {
        const { id } = request.params;
        const empresaId = request.headers.empresaid;

        const tutor = await connection("tutores")
            .where('tutEmpId', empresaId)
            .where("tutId", id)
            .first();

        if (!tutor) {

            return response.status(404).json({
                error: "Tutor não encontrado."
            });
        }

        return response.json(tutor);

    },

    async update(request, response) {
        const { id } = request.params;
        const {
            tutNome, 
            tutCpf, 
            tutNascimento, 
            tutEmail, 
            tutEndereco, 
            tutNumero, 
            tutComplemento, 
            tutBairro, 
            tutCidade, 
            tutCep, 
            tutUf, 
            tutCelular } = request.body;
        const empresaId = request.headers.empresaid;

        const tutor = await connection("tutores")
            .where('tutEmpId', empresaId)    
            .where("tutId", id)
            .first();

        if (!tutor) {
            return response.status(404).json({
                error: "Tutor não encontrado."
            });
        }

        await connection("tutores")
            .where('tutEmpId', empresaId)
            .where("racId", id)
            .update({
                tutNome, 
                tutCpf, 
                tutNascimento, 
                tutEmail, 
                tutEndereco, 
                tutNumero, 
                tutComplemento, 
                tutBairro, 
                tutCidade, 
                tutCep, 
                tutUf, 
                tutCelular 
            });

        return response.json({
            success: true,
            message: "Tutor atualizado com sucesso."
        });
    },

}