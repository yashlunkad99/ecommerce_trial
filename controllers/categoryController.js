import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const categoryController = async (req,res) =>{
    try{
        const {name} = req.body;
        if(!name)
        {
            return res.status(500).send({
                success:false,
                message:"Name is required"
            });
        }
        const ifExisting = await  categoryModel.findOne({name});
        if(ifExisting)
        {
            return res.status(200).send({
                success:true,
                message:"Category Already Exist"
            });
        }
        const category = await new categoryModel({name,slug:slugify(name)}).save();
        res.status(201).send({
            success:true,
            message:"Category created successfully",
            category

        })

    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in Category"
        })
    }

};

export const updateCategoryController = async(req,res) => {
    try{

        const {name}=req.body;
        const {id}  = req.params;
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
        res.status(201).send({
            success:true,
            message:"Category updated successfully",
            category

        })

    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in Updating Category"
        })
    }

};

export const displayCategoryCont = async(req,res) =>{
    try{
        const category = await categoryModel.find({});
        res.status(200).send({
            success:true,
            message:"All category list",
            category,
            
        });

    }
    catch(error){
        res.status(500).send({
            success:false,
            error,
            message:"Error displaying category"
        });
    }
};

export const singleCategoryCont = async(req,res)=>{
    try{
        const {slug}=req.params
        const category = await categoryModel.findOne({slug});
        res.status(200).send({
            success:true,
            category,
            message:"All category list"
        });

    }
    catch(error){
        res.status(500).send({
            success:false,
            error,
            message:"Error displayint category"
        });
    }
}

export const deleteCategoryCont = async(req,res) =>{
    try{
        const {id}=req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:"Category deleted successfully !!!"
        });

    }
    catch(error){
        res.status(500).send({
            success:false,
            error,
            message:"Cannot delete Category !!"
        });
    }
}