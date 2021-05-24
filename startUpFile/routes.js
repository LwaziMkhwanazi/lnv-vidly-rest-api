import express from "express";
import genres from "../routes/genres.js";
import customer from "../routes/customer.js";
import movie from "../routes/movies.js";
import rental from "../routes/rentals.js";
import user from "../routes/user.js";
import auth from "../routes/auth.js";
import movieReturn from "../routes/movieReturns.js";
import errorhanlder from "../middlleware/error.js"; 
import dashboard from "../routes/dashboard.js"

function handleRoutes(app) {
        app.use(express.json())
        app.use('/api/genres', genres)
        app.use('/api/customers',customer)
        app.use('/api/movies',movie)
        app.use('/api/rentals',rental)
        app.use('/api/users',user);
        app.use('/api/auth', auth);
        app.use('/api/dashboard', dashboard);
        app.use('/api/returns',movieReturn)
        app.use(errorhanlder)
}

export default handleRoutes;