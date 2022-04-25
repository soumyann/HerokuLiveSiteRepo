import express from 'express';
const router = express.Router();

// controller instance
import { DisplayAboutPage, DisplayContactPage, DisplayHomePage, DisplayProductsPage, DisplayServicesPage } from '../Controllers/index';

/**************************************TOP LEVEL ROUTES ********************************/
/* GET home page. */
router.get('/', DisplayHomePage);

/* GET home page. */
router.get('/home', DisplayHomePage);

/* GET about page. */
router.get('/about', DisplayAboutPage);

/* GET services page. */
router.get('/services', DisplayServicesPage);

/* GET products page. */
router.get('/products', DisplayProductsPage);

/* GET contact page. */
router.get('/contact', DisplayContactPage);

export default router;