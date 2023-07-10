//create a post request to create a new assessment
//immport and export required stuff
import {Router} from "express";
import { Assessment } from "../models/assessment.js";
import { Training } from "../models/training.js";

const assessmentsRouter = Router();

//create a post request to create a new assessment
assessmentsRouter.post("/", async (req, res) => {
    //get the training id from the request body
    const { training_id } = req.body.training_id;
    //find the training with the given id
    const training = await Training.findById(training_id);
    //if training is not found, send a 404 error
    if (!training) {
        return res.status(404).json({ error: "training not found" });
    }
    //create a new assessment with the request body
    const body = req.body;
    const assessment = new Assessment({
        training_id: body.training_id,
        category: body.category,
        date: body.date,
        document: body.document,
        completed: body.completed,
        total_score: body.total_score,
        score_obtained: body.score_obtained,
    });
    //save the assessment
    await assessment.save();
    //send the assessment as a response
    res.status(201).json(assessment);
}
);

//export the router
export { assessmentsRouter };
