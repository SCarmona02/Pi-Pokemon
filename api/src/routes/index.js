const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokeroutes = require("./othersRoutes/pokeRoutes.js");
const typeroutes = require("./othersRoutes/typeRoutes.js");


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", (req, res) => {
    return res.status(200).send("Welcomeeeee!!!")
})

router.use("/pokemons", pokeroutes);
router.use("/types", typeroutes);

module.exports = router;
