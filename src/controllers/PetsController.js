const connection = require('../database/connection');

module.exports = {      
    async index(request, response) {
        const empresaId = request.headers.empresaid;
        try {

            const pets = await connection('pets')
                .where('tutEmpId', empresaId)
                .join('empresas', 'empresas.empCpfCnpj','pets.petEmpId')
                .join('especies', 'especies.espId','pets.petEspId')
                .join('racas', 'racas.racId','pets.petRacId')
                .join('tutores', 'tutores.tutId','pets.petTutId')
                .select(
                    'pets.*',
                    'empresas.empNomFantasia',
                    'tutores.tutNome',
                    'especies.espNome',
                    'racas.racNome'
                );

            return response.json(pets);


        } catch (error) {
            console.error(error);
            return response.status(500).json({
                message: error.message,
                stack: error.stack
            });
        }
    },
    
    async newpet(request, response) {
        console.log(request.body);
        const {petNome,
            petTutId,
            petEmpId,
            petEspId,
            petRacId,
            petCor,
            petPorte,
            petNascimento,
            petCaracter,
            petSinPatinhas} = request.body;
        const status = 'A'; 
        const [petId] = await connection('pets').insert({
            petNome,
            petTutId,
            petEmpId,
            petEspId,
            petRacId,
            petCor,
            petPorte,
            petNascimento,
            petCaracter,
            petSinPatinhas,
            petStatus: status  
        });
           
        return response.json({petId});
    },

    async show(request, response) {
        const { id } = request.params;
        const empresaId = request.headers.empresaid;

        const pet = await connection("pets")
            .where('petEmpId', empresaId)
            .where("petId", id)
            .first();

        if (!pet) {

            return response.status(404).json({
                error: "Pet não encontrado."
            });
        }

        return response.json(pet);

    },

    async update(request, response) {
        const { id } = request.params;
        const {
            petNome,
            petTutId,
            petEmpId,
            petEspId,
            petRacId,
            petCor,
            petPorte,
            petNascimento,
            petCaracter,
            petSinPatinhas} = request.body;
        const empresaId = request.headers.empresaid;

        const pet = await connection("pets")
            .where('petEmpId', empresaId)    
            .where("petId", id)
            .first();

        if (!pet) {
            return response.status(404).json({
                error: "Pet não encontrado."
            });
        }

        await connection("pets")
            .where('petEmpId', empresaId)
            .where("petId", id)
            .update({
                petNome,
                petTutId,
                petEmpId,
                petEspId,
                petRacId,
                petCor,
                petPorte,
                petNascimento,
                petCaracter,
                petSinPatinhas
            });

        return response.json({
            success: true,
            message: "Pet atualizado com sucesso."
        });
    },

}