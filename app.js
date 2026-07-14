const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb://athulkrishnapanamakkal:athul123@ac-pikpijl-shard-00-00.wjtqgxj.mongodb.net:27017,ac-pikpijl-shard-00-01.wjtqgxj.mongodb.net:27017,ac-pikpijl-shard-00-02.wjtqgxj.mongodb.net:27017/hackathondb?ssl=true&replicaSet=atlas-a3e10y-shard-0&authSource=admin&appName=Cluster0"
  )
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

const Team = mongoose.model("Teams",new mongoose.Schema(
{
    teamId: String,
    teamName: String,
    teamLeaderName: String,
    leaderEmail: String,
    leaderPhone: String,
    collegeName: String,
    numberOfMembers: String,
    projectTitle: String,
    problemStatementTrack: String,
    technologyStack: String,
    mentorName: String,
    registrationDate: String,
    tableStationNumber: String,
  })
);



app.get("/test", (req, res) => {
  res.send("Hackathon Team Management API");
});


// Add Team
app.post("/add", async (req, res) => {
  try {
    await Team.create(req.body);
    res.json({ Status: "Success" });
  } catch (error) {
    res.status(500).json(
        { Status: "Failed", Error: error.message }
    );
  }
});


// View All Teams
app.get("/view", async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json(
        { Status: "Failed", Error: error.message }
    );
  }
});


const PORT=3000;

app.listen(PORT,()=>{
    console.log(`Server is Running on http://localhost:${PORT}`);
})