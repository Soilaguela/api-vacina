// importing the express library but destructuring just the Router logic
const { Router } = require("express");
const jwt = require('jsonwebtoken');
// create a new router
const router = new Router();

// require bcrypt for hashing the password
const bcrypt = require("bcrypt");

// import middleware
const verifyToken = require("../middlewares/verifyToken");

// import utils
const generateToken = require("../utils/generateToken");

// import model schema
const User = require("../models/userModels");
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, accessTokenSecret, (err, user) => {
         if (err) {
            return res.sendStatus(403);
         }
         req.user = user;
         next();
      });
  } else {
     res.sendStatus(401);
  }
};
// user/register
router.post("/register", async (req, res) => {
  /*try {
    await User.init();

    // check if the user exists 
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(409).send('Um usuário com este email já existe.');

    // hash the password with 10 rounds
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // hashed password
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let aux_role = "utilizador"

    // create user
    user = await User.create({

      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: aux_role
    });
    
    let token = generateToken(user.id);

    console.log({ auth: true, token: token })

    return res.status(200).send('User inserido com sucesso!');
      // generate jwt token with user.id
     

  } catch (err) {
    if (err.code == 11000 && err.keyPattern.email == 1)
      res.status(500).send('E-mail duplicado');
    else
      res.status(500).send('Internal Server Error');
  }*/
});

// user/login 
/*router.post('/login', async function (req, res) {
  try {
    // check if the user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send('Invalid Credentials');

    // check if the password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).send({ auth: false, token: null, msg: 'Invalid Credentials' });

    // generate jwt token with user.id
    let token = generateToken(user.id);
    console.log(user);
    console.log(validPassword);
    console.log(token);
    return res.status(200).send({ auth: true, token: token })
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});*/


 
const accessTokenSecret = 'youraccesstokensecret';
const users = [{
  username: 'adminuser',
  password: 'admin123',
  role: 'admin'
 }, {
     username: 'dipak',
     password: 'dipak123',
   
 }];

 router.post("/create", authenticateJWT , async  (req, res) => {

  try {
    
    let user = await User.findOne({ username: req.body.username });
    if (user) return res.status(409).send('Um usuário com este username já existe.');
        user = new User(req.body);
    if (!user) return res.status(409).send('Os dados já existem.');
    user = await User.create({

      username: req.body.username,
      password: req.body.password
      
    });
    user.save();
    return res.status(200).send(user);

  } catch (err) {
    res.status(500).send('Internal Server Error');
  }

});
router.post('/login', (req, res) => {
  // Read username and password from request body
   let { username, password } = req.body;
  // Filter user from the users array by username and password
  let user = User.find();
  if (user) {
      // Generate an access token
      let accessToken = jwt.sign({ username: user.username,  role:   user.role }, accessTokenSecret);
      res.json({accessToken});
  } else {
      res.send('Username or password incorrect...');
  }
  });

// export the router function
module.exports = router;