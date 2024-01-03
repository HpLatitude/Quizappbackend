const resultdb = require("../../model/Admin/resultSchema");

exports.SubmitQuiz = async(req,res)=>{
    const {answer} = req.body;

    console.log("first",req.usermainId)

    try {
        var count = 0
        for(let i = 0;i<answer.length;i++){
            console.log("answer",answer[0])
    
            if(answer[i]["correct"] == true){
                count = count + 1
            }
        }

        const StoreResult = await new resultdb({
            Score:count,
            userid:req.usermainId
        });

        await StoreResult.save();
        res.status(200).json(StoreResult)

    } catch (error) {
        res.status(400).json({error:error})
    }

 

    
    console.log("count",count)
}