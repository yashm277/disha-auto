//import router, employee and review models
import { Router } from "express";
import { Employee } from "../models/employee.js";
import { Review } from "../models/review.js";
//create a router
const reviewsRouter = Router();

//create a post request to create a new review
reviewsRouter.post("/", async (req, res) => {
    //get the request body
    const body = req.body;
    //create a new review with the request body
    const review = new Review({
        //look at the review model to see what fields are required
        employee_id: body.employee_id,
        comments: body.comment,
        rating: body.rating,
    });
    //save the review
    await review.save();
    //send the review as a response
    res.status(201).json(review);
}
);

//create a get request to get all the reviews
reviewsRouter.get("/", async (req, res) => {
    //get all the reviews from the database
    const reviews = await Review.find({});
    //send the reviews as a response
    res.json(reviews);
}
);


//all the reviews for a particular employee
reviewsRouter.get('/employeeid/:id', async (req, res) => {
    const employeeId = req.params.id;
  
    try {
      // Check if the employee exists
      const employee = await Employee.findById(employeeId);
      if (!employee) {
        return res.status(404).json({ message: 'Please enter a valid employee id.' });
      }
  
      const reviews = await Review.find({ employee_id: employeeId });
  
      // If no reviews are found, return a message
      if (reviews.length === 0) {
        return res.status(404).json({ message: 'No reviews found for the employee.' });
      }
  
      res.json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  
//delete a particular review
reviewsRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    //find the review with the id
    const review = await Review.findById(id);
    //if the review exists, delete it
    if (review) {
        await review.remove();
        res.status(204).end();
    } else {
        //if the review doesn't exist send a 404 status
        res.status(404).end();
    }
});



  //export the router
export { reviewsRouter };
