const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = db.import('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Get All
router.get('/', (req, res) => {

    Gig.findAll()
        .then(gigs => {
            res.render('gigs', {
                gigs
            });
        }).catch(err => console.log(err));
});

// Display add gig form
router.get('/add', (req, res) => {
    res.render('add');
});

// Add a gig
router.post('/add', (req, res) => {
    let { title, technologies, description, budget, contact_email } = req.body;
    let errors = [];

    if (!title) {
        errors.push({ text: 'Please add a title' });
    }
    if (!description) {
        errors.push({ text: 'Please add a description' });
    }
    if (!technologies) {
        errors.push({ text: 'Please add some technologies' });
    }
    if (!contact_email) {
        errors.push({ text: 'Please add a contact email' });
    }

    // Check for errors
    if (errors.length > 0) {
        res.render('add', {
            errors,
            title,
            technologies,
            description,
            budget,
            contact_email
        });
    } else {
        if(!budget) {
            budget = 0;
        }

        // Make lowercase and remove space after comma
        technologies = technologies.toLowerCase().replace(/./g, ',');

        Gig.create({
            title,
            technologies,
            description,
            budget,
            contact_email
        }).then(gig => res.redirect('/gigs'))
            .catch(err => console.log(err))
    }

    // Insert into table

});

// Search for gigs
router.get('/search', (req, res)=> {
    const {term} = req.query;

    // Make lowercase
    term = term.toLowerCase();

    Gig.findAll({where: { technologies: {[Op.like]: '%' + term + '%' } } })
    .then(gigs => res.render('gigs', {gigs}))
    .catch(err => console.log(err)
    );

})

module.exports = router;