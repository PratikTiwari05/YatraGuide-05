const express=require('express');
const router=express.Router();
const db= require('../db');//mysql connect
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const JWT_SECRET='pass123';
//creating an user
//creating a user
router.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Missing Username, Email or Password' });
  }

  try {
    // Check if user already exists
    const [[existingUser]] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (existingUser) {
      return res.status(409).json({ message: 'Username already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user with email
    await db.query(
      'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
      [username, hashedPassword, email]
    );

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error.message, error.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



router.post('/login',async(req,res)=>{
    const{username,password}=req.body;
    if(!username||!password){
        return res.json(400).json({message:'Missing username or password'});
    }
    try{
        //1.check user exists
        const[[user]]=await db.query('SELECT * FROM users WHERE username=?',[username]);
        if(!user){
            return res.status(401).json({message:'Invalid Credentials'});
        }
        //2.Compare password with hashedpassword
        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:'Inavlid Password'});
        }
        //3.Generate JWT
        const token=jwt.sign(
            {id: user.id,username:user.username},
            JWT_SECRET,
            {expiresIn:'1h'}
        );
        //4.Send token to client
        res.json({message:'Login Successful',token});
    }
    catch(error){
        console.error('Login error:',error);
        res.status(500).json({message:'Internal Server Error'});
    }
});
module.exports=router;