const { Router } = require('express');
const { fieldsMiddleware } = require('./app/middlewares/FieldsMiddleware');
const ContactController = require('./app/controllers/ContactController');
const CategoriesController = require('./app/controllers/CategoryController');

const router = Router();

//Contacts
router.get('/contacts', ContactController.index);
router.get('/contacts/:id', ContactController.show);
router.delete('/contacts/:id', ContactController.delete);
router.post('/contacts', fieldsMiddleware, ContactController.store);
router.put('/contacts/:id', ContactController.update);

//Categories
router.get('/categories', CategoriesController.index);
router.get('/categories/:id', CategoriesController.show);
router.post('/categories', CategoriesController.store);
router.delete('/categories/:id', CategoriesController.delete);
router.put('/categories/:id', CategoriesController.update);




module.exports = router;
