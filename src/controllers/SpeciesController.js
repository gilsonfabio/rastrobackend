const connection = require('../database/connection');

module.exports = {      
    async index(request, response) {
        try {
            const species = await connection('especies')
                .select('*');
            if (species.length === 0) {
                return response.status(404).json({
                    error: "Não encontrou espécies cadastradas!"
                });
            }
            return response.json(species);
        } catch (error) {
            return response.status(500).json({
                error: "Erro ao buscar espécies",
                message: error.message
            });
        }
    },
    
    async newspecie(request, response) {
        try {
            const { espNome } = request.body;
            const nome = espNome.trim();
            const existe = await connection("especies")
                .whereRaw(
                    "LOWER(espNome)=LOWER(?)",
                    [nome]
                )
                .first();

            if (existe) {
                return response.status(400).json({
                    success: false,
                    message: "Espécie já cadastrada."
                });
            }

            const [espId] =
                await connection("especies")
                .insert({
                    espNome: nome,
                });

            return response.status(201).json({
                success: true,
                message: "Espécie cadastrada com sucesso.",
                data: {
                    espId,
                    espNome: nome,
                }
            });
        } catch (error) {
            return response.status(500).json({
                success: false,
                message: "Erro interno.",
            });
        }
    },

    async show(request, response) {
        const { id } = request.params;

        const especie = await connection("especies")
            .where("espId", id)
            .first();

        if (!especie) {

            return response.status(404).json({
                error: "Espécie não encontrada."
            });
        }

        return response.json(especie);

    },

    async update(request, response) {
        const { id } = request.params;
        const { espNome } = request.body;

        const especie = await connection("especies")
            .where("espId", id)
            .first();

        if (!especie) {
            return response.status(404).json({
                error: "Espécie não encontrada."
            });
        }

        const existe = await connection("especies")
            .whereRaw(
                "LOWER(espNome)=LOWER(?)",
                [espNome]
            )
            .whereNot("espId", id)
            .first();

        if (existe) {
            return response.status(400).json({
                error: "Já existe uma espécie com esse nome."
            });
        }

        await connection("especies")
            .where("espId", id)
            .update({
                espNome: espNome.trim(),
            });

        return response.json({
            success: true,
            message: "Espécie atualizada com sucesso."
        });
    },

}