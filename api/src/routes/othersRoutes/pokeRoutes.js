const { Router } = require('express');
const pokeFunctions = require("../othersFunctions/pokeFunctions")

const router = Router();

router.get("/", async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            const result = await pokeFunctions.listPokemons(name)
            return res.status(200).json(result);
        } else {
            const result = await pokeFunctions.listPokemons()
            return res.status(200).json(result);
        }
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        if (id) {
            const result = await pokeFunctions.detailPokemon(id);
            return res.status(200).json(result);
        } else {
            throw new Error("Id is required");
        }
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const create = await pokeFunctions.newPokemon(req.body);
        return res.send(create)
    } catch (error) {

        res.status(400).json({ error: error.message })
    }
});

router.put("/edit/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const update = await pokeFunctions.editPokemon(id, req.body)
        return res.send(update)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

router.delete("/delete/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const pokemonDelete = await pokeFunctions.deletePokemon(id);
        return res.send(pokemonDelete);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

module.exports = router;
