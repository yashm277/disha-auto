//create a post request to create a new employee
//import and export required stuff
//confirmed
import { Router } from "express";
import { Employee } from "../models/employee.js";

const employeesRouter = Router();

//create a post request to create a new employee
employeesRouter.post("/", async (req, res) => {
    //create a new employee with the request body
    const body = req.body;
    const employee = new Employee({
        //look at the employee model to see what fields are required
        date_of_birth: body.date_of_birth,
        first_name: body.first_name,
        last_name: body.last_name,
        contact: body.contact,
        emergency_contact: body.emergency_contact,
        designation: body.designation,
        department: body.department,
    });
    //save the employee
    await employee.save();
    //send the employee as a response
    res.status(201).json(employee);
});

//create a get request to get all the employees
employeesRouter.get("/", async (req, res) => {
    //get all the employees from the database
    const employees = await Employee.find({});
    //send the employees as a response
    res.json(employees);
}
);

//create a get request to get a single employee
employeesRouter.get("/:id", async (req, res) => {
    //get the employee id from the request parameters
    const id = req.params.id;
    //find the employee with the id
    const employee = await Employee.findById(id);
    //if the employee exists send it as a response
    if (employee) {
        res.json(employee);
    } else {
        //if the employee doesn't exist send a 404 status
        res.status(404).end();
    }
});


//export the router
export { employeesRouter };
