
const Workout = require("../models/Workout");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const workouts = await Workout.find({ user: req.user.id });
      res.render("profile.ejs", { workouts: workouts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req,res) => {
    try{
        const workouts = await Workout.find().sort({createdAt: 'desc'}).lean()
        res.render('feed.ejs',{workouts: workouts, user: req.user})
    }
   catch (err){
    console.log(err)
    }
},
getWorkout: async (req,res) => {
    try{
        const workouts = await Workout.findById(req.params.id)
        res.render('workouts.ejs',{workouts: workouts,  user: req.user})
    }
   catch (err){
    console.log(err)
    }
},
createWorkout: async (req, res) => {
    try {

      await Workout.create({
        name: req.body.name,
        muscle: req.body.muscle,
        type: req.body.type,
        equipment: req.body.equipment,
        instructions: req.body.instructions,
        likes: 0,
        user: req.user.id,
      });
      console.log("Workout has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likeWorkout: async (req, res) => {
    try {
      await Workout.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/workouts/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteWorkout: async (req,res) => {
    try{
        await Workout.remove({_id: req.params.id})
        console.log("Workout deleted");
        res.redirect("/profile")
    }catch (err){
        console.log(err)
    }
  }
}