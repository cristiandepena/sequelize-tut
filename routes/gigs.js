const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = db.import('../models/Gig');

// Get All
router.get('/', (req, res) => {

    Gig.findAll()
    .then(gigs => {
        console.log(gigs);
        res.status(200).send(JSON.stringify({ gigs }));
    }).catch( err => console.log(err));
});

// Add a gig
router.get('/add', (req, res) => {
    const data = {
        title: 'Looking for a Vue developer',
        technologies: 'Vue,Javascript,HTML,CSS, PHP',
        description: 'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
        budget: 500,
        contact_email: 'utaveras@gmail.com'
    }

    let { title, technologies, description, budget, contact_email } = data;

    // Insert into table

    Gig.create({
        title: title,
        technologies: technologies,
        description: description,
        budget: budget,
        contact_email: contact_email
    }).then(gig => res.redirect('/gigs'))
    .catch(err => console.log(err))
});

module.exports = router;