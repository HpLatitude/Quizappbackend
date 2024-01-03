require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const cors = require("cors");
const PORT = 4008;


app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.status(200).json("server start")
});

// all routes


// admin auth routes
const AdminRoutes = require("./routes/AdminRoutes/AdminAuthRoutes");
app.use("/admin/api",AdminRoutes);

// question category routes
const questionCategory = require("./routes/AdminRoutes/CategoryRoutes");
app.use("/questioncategory/api",questionCategory)

// question routes
const questionRoute = require("./routes/AdminRoutes/questionRoutes");
app.use("/question/api",questionRoute);

// user routes for admin
const UserForAdmin = require("./routes/AdminRoutes/UserRoutesAdmin");
app.use("/userauthadmin/api",UserForAdmin);

// question submit
const QuestionSubmit = require("./routes/AdminRoutes/ScoreRoutes");
app.use("/quiz/api",QuestionSubmit)

const userRoute = require("./routes/UserRoutes/userAuthRoutes");
app.use("/user/api",userRoute)

// listen app
app.listen(PORT,()=>{
    console.log(`server start at port no ${PORT}`)
})