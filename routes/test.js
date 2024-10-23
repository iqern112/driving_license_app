const express = require('express');
const TestResult = require('../models/TestResult');
const router = express.Router();

// Add Test Result (Admin only)
router.post('/add', async (req, res) => {
    const { user_id, color_blind_test, long_sighted_test, astigmatism_test, response_time_test, traffic_sign_score, road_marking_score, right_of_way_score, practical_test_pass } = req.body;
    
    const physical_test_pass = [color_blind_test, long_sighted_test, astigmatism_test, response_time_test].filter(Boolean).length >= 3;
    const theory_test_pass = (traffic_sign_score + road_marking_score + right_of_way_score) >= 120;
    let license_test_status = 'รอพิจารณา';
    if (physical_test_pass && theory_test_pass && practical_test_pass) {
        license_test_status = 'ผ่าน';
    } else if (!physical_test_pass || !theory_test_pass || !practical_test_pass) {
        license_test_status = 'ไม่ผ่าน';
    }

    try {
        await TestResult.create({
            user_id,
            color_blind_test, long_sighted_test, astigmatism_test, response_time_test, physical_test_pass,
            traffic_sign_score, road_marking_score, right_of_way_score, theory_test_pass, practical_test_pass,
            license_test_status
        });
        res.redirect('/dashboard');
    } catch (error) {
        res.status(400).send('Error adding test result');
    }
});

// Edit and Delete Routes can be similarly implemented
module.exports = router;
