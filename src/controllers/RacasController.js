const connection = require('../database/connection');

module.exports = {      
    async index(request, response) {
        try {

            const racas = await connection('racas')
                .join('especies', 'especies.espId', 'racas.racEspId')
                .select(
                    'racas.*',
                    'especies.espNome'
                );


            return response.json(racas);


        } catch(error) {

            return response.status(500).json({
                error:error.message
            });

        }
    },
    
    async newraca(request, response) {
        console.log(request.body);
        const {descricao, speId} = request.body;
        let status = 'A'; 
        const [racId] = await connection('racas').insert({
            racNome: descricao, 
            racEspId: speId,
        });
           
        return response.json({racId});
    },

    async show(request, response) {
        const { id } = request.params;

        const raca = await connection("racas")
            .where("racId", id)
            .first();

        if (!raca) {

            return response.status(404).json({
                error: "Raça não encontrada."
            });
        }

        return response.json(raca);

    },

    async update(request, response) {
        const { id } = request.params;
        const { racNome, racEspId } = request.body;

        const raca = await connection("racas")
            .where("racId", id)
            .first();

        if (!raca) {
            return response.status(404).json({
                error: "Raça não encontrada."
            });
        }

        const existe = await connection("racas")
            .whereRaw(
                "LOWER(espNome)=LOWER(?)",
                [racNome]
            )
            .whereNot("racId", id)
            .first();

        if (existe) {
            return response.status(400).json({
                error: "Já existe uma raça com esse nome."
            });
        }

        await connection("racas")
            .where("racId", id)
            .update({
                racNome: racNome.trim(),
                racEspId: racEspId
            });

        return response.json({
            success: true,
            message: "Raça atualizada com sucesso."
        });
    },

}