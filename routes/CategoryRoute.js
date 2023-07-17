import express from "express";
import { requireSignIn,adminAccess } from "../middelwares/authMiddelware.js";
import { categoryController, deleteCategoryCont, displayCategoryCont, singleCategoryCont, updateCategoryController } from "../controllers/categoryController.js";
const router = express.Router();

//create
router.post('/create-category',requireSignIn,adminAccess,categoryController);

//update
router.put('/update-category/:id',requireSignIn,adminAccess,updateCategoryController);

//display
router.get('/get-category',displayCategoryCont);

router.get('/single-category/:slug',singleCategoryCont)

router.get('/delete-category/:id',requireSignIn,adminAccess,deleteCategoryCont);

export default router;