const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/userController')


// POST request/api/users/signup
router.post('/signup', userCtrl.create);

// POST request/api/users/signup
router.get('/test', userCtrl.test);

// LOGIN request/api/users/login
router.post('/login',userCtrl.login);



//--------------------------------ADMIN USER REQUESTS--------------------------------//

// GET/api/users  UPDATE USER
router.get("/", userCtrl.allUsers);

// PUT /api/users/update  UPDATE USER
router.put("/update", userCtrl.updateUser);

module.exports = router;