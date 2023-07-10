//import router, employee and leave model
//confirmed
import { Router } from "express";
import { Employee } from "../models/employee.js";
import { Leave } from "../models/leave.js";

//create a router
const leavesRouter = Router();

//create a post request to create a new leave
leavesRouter.post("/", async (req, res) => {
    //get the request body
    const body = req.body;
    //create a new leave with the request body
    const leave = new Leave({
        //look at the leave model to see what fields are required
        employee_id: body.employee_id,
        start_date: body.start_date,
        end_date: body.end_date,
        type: body.type,
        document: body.document
    });
    //save the leave
    await leave.save();
    //send the leave as a response
    res.status(201).json(leave);
});

//create a get request to get all the leaves
leavesRouter.get("/", async (req, res) => {
    //get all the leaves from the database
    const leaves = await Leave.find({});
    //send the leaves as a response
    res.json(leaves);
}
);

//create a get request to get a single leave
leavesRouter.get("/:id", async (req, res) => {
    //get the leave id from the request parameters
    const id = req.params.id;
    //find the leave with the id
    const leave = await Leave.findById(id);
    //if the leave exists send it as a response
    if (leave) {
        res.json(leave);
    } else {
        //if the leave doesn't exist send a 404 status
        res.status(404).end();
    }
});

//export the router
export { leavesRouter };