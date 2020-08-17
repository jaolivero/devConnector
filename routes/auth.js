const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/');
const User = require('../../models/Users');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, valiadationResult } = require('express-validator/check');
const User = require('../../models/User')
//@Route Get api/auth/user
// desc Test route
//@access Public

router.post(
    '/',
    [
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Password is required'
        ).exists()
    ],
    async(req, res) => {
        const errors = valiadationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        
        try {
            let user = await User.findOne({ email });
            
            if(!user) {
                return res
                .status(400)
                .json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch) {
                return res
                .status(400)
                .json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            const payload = {
                user = {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn:360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({token});
                }                
            );
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);


router.get("/", auth, async (req, res) => {
    try {
const user = await User.findById(req.user.id).select('-password');
res.json(user);
} catch(err) {
console.error(err.message);
res.status(500).send('Server Error');
}
});

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find({user: req.params.user_id}).populate('user', ['name', 'lastname']);
        
        if(!profile) return res.status(400).json({ msg: 'there is no profile for this user'})
        res.json(profiles);
    } catch(err) {
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
})
//authenticate user and get token using expres validator 
module.exports = router;
