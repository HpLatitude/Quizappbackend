const categoryDb = require("../../model/Admin/categorySchema");

// create category
exports.CreateCategory = async(req,res)=>{

    const { categoryName, description } = req.body;

    if (!categoryName) {
        res.status(400).json({ error: "fill All Details" })
    }else{
        try {
            const existingProducts = await categoryDb.findOne({ categoryName: categoryName });
            if (existingProducts) {
                res.status(400).json({ error: "This category Already exist" })
            } else {
                const addProductCategory = new categoryDb({
                    categoryName, description
                });
    
                await addProductCategory.save();
                res.status(200).json(addProductCategory);
            }
        } catch (error) {
            res.status(400).json({error:error})
        }
    }
}

// get category
exports.GetCategory = async(req,res)=>{
    try {
        const getAllcategory = await categoryDb.find();
        res.status(200).json(getAllcategory);
    } catch (error) {
        res.status(400).json({error:error})
    }
}

// DeleteCategory
exports.DeleteCategory = async(req,res)=>{
    const {categoryid} = req.params;
    try {
        const Deletecategory = await categoryDb.findByIdAndDelete({_id:categoryid});
        res.status(200).json({message:"category sucessfully deleted",Deletecategory});

    } catch (error) {
        res.status(400).json({error:error})
    }
}

// UpdateCategory
exports.UpdateCategory = async(req,res)=>{
    const {categoryid} = req.params;
    const { categoryName, description } = req.body;


    try {
        const CategoryDataUpdate = await categoryDb.findByIdAndUpdate({_id:categoryid},{
            categoryName, description
        },{new:true});

        await CategoryDataUpdate.save();
        res.status(200).json({message:"category sucessfully Updated",CategoryDataUpdate});

    } catch (error) {
        res.status(400).json({error:error})
    }
}