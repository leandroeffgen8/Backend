const express = require('express');
const router = express.Router();

router.use('/api/users', require('./UserRoutes'));

// Test router
router.get('/', (req, res) => {
    res.send('Testando Rota!')
});
 
module.exports = router; 