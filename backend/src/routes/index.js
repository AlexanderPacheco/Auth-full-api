const { Router, response } = require('express');
const router = Router();

const User = require('../models/User');

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.send('hello')
});

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const newUser = new User({email, password});
    
    await newUser.save();
	const token = await jwt.sign({_id: newUser._id}, 'secretkey'); //Guardo la propiedad _id del usuario creado en un token
    res.status(200).json({token});
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email});
    if (!user) return res.status(401).send("The email doesn't exists");
    if (user.password !== password) return res.status(401).send('Wrong Password');

	const token = jwt.sign({_id: user._id}, 'secretkey'); //Este nombre del token tiene que coindicer con el de signup

    return res.status(200).json({token});
});

router.get('/tasks', (req, res) => {
    res.json([
        {
            _id: '1',
            name: "task one",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
        {
            _id: '2',
            name: "task two",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
        {
            _id: '3',
            name: "task three",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
    ])
});

router.get('/private-tasks', verifyToken, (req, res) => {
    res.json([
        {
            _id: '1',
            name: "task one",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
        {
            _id: '2',
            name: "task two",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
        {
            _id: '3',
            name: "task three",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
    ])
});

async function verifyToken(req, res, next) {

    //console.log(req.headers.authorization)

	try {

		if (!req.headers.authorization) {
			return res.status(401).send('Unauhtorized Request');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('Unauhtorized Request');
		}

		const payload = await jwt.verify(token, 'secretkey');
		if (!payload) {
			return res.status(401).send('Unauhtorized Request');
		}
		req.userId = payload._id;
		next();
	} catch(e) {
		//console.log(e)
		return res.status(401).send('Unauhtorized Request');
	}
}

module.exports = router;
