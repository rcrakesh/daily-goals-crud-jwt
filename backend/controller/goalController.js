// const { error } = require("console");

const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel')


const getGoals = asyncHandler(async (req, res) =>{
const goals = await Goal.find({ user : req.user.id})

    res.status(200).json(goals);

})

const setGoals = asyncHandler(async (req, res) =>{
    if(!req.body.text){
        res.status(400)
        throw new Error(' please add the text field')
    }
    const goal = await Goal.create({
        text : req.body.text,
        user: req.user.id
     })
    
    res.status(200).json(goal);
  
   

})


const updateGoals =asyncHandler(async(req, res) =>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error("Goal not found")
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
    })
    res.status(200).json(updatedGoal);

})

const deleteGoals = asyncHandler(async(req, res) =>{
    const deleteGoal = await Goal.findByIdAndDelete(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error("goal not found")

    }
    await goal.remove
    res.status(200).json(deleteGoal)

})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
};