const questionsdb = require("../../model/Admin/questionSchema");

exports.Addquestions = async(req,res)=>{
    const {title,questions,answers,categoryid,experienceLevel} = req.body;

    if(!title || !questions || !answers || !categoryid || !experienceLevel){
        res.status(400).json({error:"All fields are required"})
    }else{
        try {
            const questionsCreate = new questionsdb({
                title,questions,answers,categoryid,experienceLevel
            });

            await questionsCreate.save();

            res.status(200).json(questionsCreate)
        } catch (error) {
            res.status(400).json({error:error})
        }
    }

}

// get questions
exports.GetQuestions = async(req,res)=>{

    const {categoryid} = req.query;
    const {experienceLevel} = req.query
    const page = req.query.page || 1
    const ITEM_PER_PAGE = 1;

    try {
        const skip = (page - 1) * ITEM_PER_PAGE  // 1 * 4 = 4

        const queryobj = {
            categoryid:categoryid,experienceLevel:experienceLevel
        }

        const count = await questionsdb.countDocuments(queryobj);

        const QuestionData = await questionsdb.find(queryobj)
        .limit(ITEM_PER_PAGE)
        .skip(skip)
        .sort({_id:-1});

        const pageCount = Math.ceil(count/ITEM_PER_PAGE);

        res.status(200).json({
            Pagination:{
                count,pageCount
            },
            QuestionData
        })
    } catch (error) {
        res.status(400).json({error});
    }
}