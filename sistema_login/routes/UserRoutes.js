const express = require('express');
const router = express.Router();
 
//Controller
const { register, login, getCurrentUser, updateUser, getUserById, getAllUser, deleteUser } = require('../controllers/UserController');
 
//Middlewares
const { userCreateValidation, loginValidation, updateValidation } = require('../middlewares/userValidations');
const validate = require('../middlewares/handleValidation');
const authGuard = require('../middlewares/authGuard');
  
      
//Routes
router.post('/register', userCreateValidation(), validate, register)
router.post('/login', loginValidation(), validate, login) 
router.get('/profile', authGuard, getCurrentUser) 
router.put('/', authGuard, updateValidation(), validate, updateUser)
router.get('/:id', getUserById)
router.get('/', getAllUser)
router.delete('/:id', deleteUser)

module.exports = router; 