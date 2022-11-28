const { Router } = require('express');
const pokeFunctions = require("../../controllers/pokeFunctions")


const router = Router();

router.get("/", async (req, res) => {
    try {
        const result = await pokeFunctions.listTypes();
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
})

module.exports = router;