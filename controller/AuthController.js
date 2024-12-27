const bcrypt=require("bcryptjs")

const jwt = require('jsonwebtoken');

const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const multer = require("multer");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { storage } = require("../firebase/firebaseConfig");
const path = require("path");




const storageConfig = multer.memoryStorage(); 
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error("Only images (jpeg, jpg, png, gif) are allowed")); 
  }
};

const upload = multer({
  storage: storageConfig,
  fileFilter: fileFilter,
});


// Generate JWT Token
const generateAuthToken = (user) => {
    const payload = {user: user._id };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  };

exports.DoctorSignup = [
    upload.single("image"),
    async (req, res) => {
      try {
        const { name, specialization,email, degree, rate ,description,password} = req.body;
        console.log("degree: "+ degree )
        const file = req.file;
        if (!file) {
          return res.status(400).json({ message: "Image file is required" });
        }
  
        const existingUser = await Doctor.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'Doctor already exists' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);


       
       
        const storageRef = ref(storage, `tour-packages/${Date.now()}_${file.originalname}`);
  
       
        await uploadBytes(storageRef, file.buffer);
  
        
        const imageUrl = await getDownloadURL(storageRef);
  
    
        const newDoctor=new Doctor({name,specialization,email,degree,rate,description,imageUrl,password})
  
        
        await newDoctor.save();
        const token = generateAuthToken(newDoctor);
        console.log(newDoctor)
        res.status(201).json({
          message: "Doctor created successfully",
          tourDoctor: newDoctor,
          token:token
        });
      } catch (error) {
        console.error("Error creating :", error);
        res.status(500).json({ message: "Server error", error });
      }
    },
  ];


exports.Patientsignup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await Patient.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const Walletbalance=0;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newPatient = new Patient({ name, email, password: hashedPassword ,Walletbalance});
    await newPatient.save();

    const token = generateAuthToken(newPatient);
    res.status(201).json({ message: 'User created successfully', token,newPatient });
  } catch (error) {
    res.status(500).json({ message: 'Error while signing up' });
  }
};




exports.PatientLogin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const patient = await Patient.findOne({ email });
      if (!patient) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const isMatch = await bcrypt.compare(password, patient.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const token = generateAuthToken(patient);
      console.log("patient : "+ patient)
      res.json({ token, patient });
    } catch (error) {
      res.status(500).json({ message: 'Error while logging in' });
    }
  };
  



exports.DoctorLogin = async (req, res) => {

  const { email, password } = req.body;

  console.log(email, password);


  try {

      const doctor = await Doctor.findOne({ email });

      if (!doctor) {

          return res.status(400).json({ message: 'Invalid email or password' });

      }




      if (password !== doctor.password) {

          return res.status(400).json({ message: 'Invalid email or password' });

      }




      const token = generateAuthToken(doctor);

      res.json({ token, doctor });

  } catch (error) {

      console.error(error);

      res.status(500).json({ message: 'Error while logging in' });

  }

};

