const app = require("express").Router();
const Employer = require("../models");
require("dotenv").config();
const multer = require("../middleware/multer");
const cloudinary = require("../cloud");
const { isValidObjectId } = require("mongoose");

const nodemailer = require("nodemailer");

let serverOTP = "";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

//Posting Employer Data
app.post(
  "/",
  multer.single("image"),
  //Middleware to validate the data
  (req, res, next) => {
    const name = req.body.name;
    const company_name = req.body.company_name;
    const email = req.body.email;
    const phone = req.body.phone;
    const aadhar = req.body.aadhar;
    const password = req.body.password;
    // "Password must contain 6 letters and alteast one special character and one numeric value",
    const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (name == "" || name == undefined) {
      return res.json({
        status: 400,
        message:
          "😅 Please enter your name so that we can proceed futher more !",
      });
    } else if (company_name == "" || company_name == undefined) {
      return res.json({
        status: 400,
        message:
          "😅 Please enter company name so that we can proceed futher more !",
      });
    } else if (email == "" || email == undefined) {
      return res.json({
        status: 400,
        message:
          "😅 Please enter your email so that we can proceed futher more !",
      });
    } else if (phone == "" || phone == undefined) {
      return res.json({
        status: 400,
        message:
          "😅 Please enter phone number so that we can proceed futher more !",
      });
    } else if (aadhar == "" || aadhar == undefined) {
      return res.json({
        status: 400,
        message:
          "😅 Please enter aadhar number so that we can proceed futher more !",
      });
    } else if (password == "" || password == undefined) {
      return res.json({
        status: 400,
        message:
          "😅 Please enter your password so that we can proceed futher more !",
      });
    } else if (phone.length != 10) {
      return res.json({
        status: 400,
        message: "😅 Please enter valid phone no !",
      });
    } else if (!(email.includes("@") && email.includes("."))) {
      return res.json({
        status: 400,
        message: "😅 Please enter a valid email address !",
      });
    } else if (!(password.length >= 6 && password.match(passRegex))) {
      return res.json({
        status: 400,
        message:
          "😅 Password must contain 6 letters and alteast one special character and one numeric value",
      });
    } else if (aadhar.length != 12) {
      return res.json({
        status: 400,
        message: "😅 Please enter valid aadhar no...",
      });
    } else {
      next();
    }
  },
  //if validate successfully then we can send to database
  async (req, res) => {
    const name = req.body.name;
    const company_name = req.body.company_name;
    const email = req.body.email.trim().toLowerCase();
    const phone = req.body.phone;
    const aadhar = req.body.aadhar;
    const password = req.body.password.trim();

    //Upload file in cloudinary if file exist
    const { file } = req;
    const alreadyExist = await Employer.find({
      email: email.trim().toLowerCase(),
    });

    if (alreadyExist.length != 0) {
      return res.json({
        status: 403,
        message:
          " 🥲 User with this email is already exist please login or try to use another email id!",
      });
    } else {
      const newEmployer = await new Employer({
        name,
        company_name,
        email,
        phone,
        aadhar,
        password,
      });
      // console.log(file);
      if (file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(
          file.path
        );
        newEmployer.image = { url: secure_url, public_id };
      }
      newEmployer.save();
      res.json({
        status: 200,
        message: "😍 Thanks for sending data....",
        data: newEmployer,
      });
    }
  }
);
//Getting User Details By An Id
app.get("/:id", async (req, res) => {
  const employerId = req.params.id;
  if (employerId.includes("@") && employerId.includes(".com")) {
    const getUser = await Employer.find({ email: employerId });
    if (getUser.length) {
      return res.status(200).json({ status: 200, data: getUser });
    } else {
      return res.json({ status: 401, message: "😇 Invalid Request !" });
    }
  } else {
    return res.json({ status: 400, message: "😇 Invalid  Object Id!" });
  }
});
//Add Worker Details
app.route("/add_worker/:id").patch(
  multer.single("image"),
  //Middleware to validate the data
  (req, res, next) => {
    const name = req.body.name;
    const work_type = req.body.work_type;
    const worker_id = req.body.worker_id;
    const phone = req.body.phone;
    const aadhar = req.body.aadhar;
    const salary = req.body.salary;
    const password = req.body.password;
    // "Password must contain 6 letters and alteast one special character and one numeric value",
    const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (name == "" || name == undefined) {
      return res.json({
        status: 400,
        message:
          "😅 Please enter your name so that we can proceed futher more !",
      });
    } else if (work_type == "" || work_type == undefined) {
      return res.json({
        status: 400,
        message:
          "😅 Please entert work type so that we can proceed futher more !",
      });
    } else if (worker_id == "" || worker_id == undefined) {
      return res.json({
        status: 400,
        message:
          "😅 Please enter worker id so that we can proceed futher more !",
      });
    } else if (phone == "" || phone == undefined) {
      return res.json({
        status: 400,
        message:
          "😅 Please enter phone number so that we can proceed futher more !",
      });
    } else if (aadhar == "" || aadhar == undefined) {
      return res.json({
        status: 400,
        message:
          "😅 Please enter aadhar number so that we can proceed futher more !",
      });
    } else if (password == "" || password == undefined) {
      return res.json({
        status: 400,
        message:
          "😅 Please enter your password so that we can proceed futher more !",
      });
    } else if (salary == "" || salary == undefined) {
      return res.json({
        status: 400,
        message: "😅 Please enter salary so that we can proceed futher more !",
      });
    } else if (phone.length != 10) {
      return res.json({
        status: 400,
        message: "😅 Please enter valid phone no !",
      });
    } else if (!(password.length >= 6 && password.match(passRegex))) {
      return res.json({
        status: 400,
        message:
          "😅 Password must contain 6 letters and alteast one special character and one numeric value",
      });
    } else if (aadhar.length != 12) {
      return res.json({
        status: 400,
        message: "😅 Please enter valid aadhar no...",
      });
    } else {
      next();
    }
  },
  //if validate successfully then we can send to database
  async (req, res) => {
    const id = req.params.id.toLowerCase();
    const worker_id = req.body.worker_id;

    const exist = await Employer.findOne({
      email: id,
      "workers.worker_id": worker_id,
    });
    // console.log(exist);

    if (exist != null) {
      return res.json({
        status: 400,
        message: "Worker already exist with this worker id ( Aadhar no )....",
      });
    }
    const { file } = req;
    if (file) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        file.path
      );
      req.body.image = { url: secure_url, public_id };
    }

    const newWorker = await Employer.updateOne(
      { email: id },
      {
        $push: {
          workers: req.body,
        },
      }
    );

    res.status(200).json({
      status: 200,
      message: "😍 Thanks for adding worker....",
    });
  }
);
//Delete Worker
app.delete("/delete_worker/:employerId/:workerId", async (req, res) => {
  const workerId = req.params.workerId;
  const employerId = req.params.employerId.toLowerCase();

  if (employerId.includes("@") && employerId.includes(".com")) {
    const result = await Employer.findOneAndUpdate(
      { email: employerId },
      {
        $pull: {
          workers: { worker_id: workerId },
        },
      },
      { new: true }
    );

    return res.status(200).json({
      status: 200,
      message: "Worker Delete Successfully !",
    });
  } else {
    return res.status(401).json({ status: 401, message: "😅 Invalid Id !" });
  }
});
//Find Individual Worker
app.get("/get_individual_worker/:employerId/:workerId", async (req, res) => {
  const workerId = req.params.workerId;
  const employerId = req.params.employerId.toLowerCase();

  if (employerId.includes("@") && employerId.includes(".com")) {
    const result = await Employer.findOne(
      {
        email: employerId,
      },
      { workers: { $elemMatch: { worker_id: workerId } } }
    );

    if (result.workers.length != 0) {
      return res.status(200).json({
        status: 200,
        data: result.workers,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "No Worker exist  with this id!",
      });
    }
  } else {
    return res.json({ status: 401, message: "😅 Invalid Id !" });
  }
});
//Update Worker
app.patch(
  "/update_worker/:employerId/:workerId",
  (req, res, next) => {
    const name = req.body.name;
    const work_type = req.body.work_type;
    const worker_id = req.body.worker_id;
    const phone = req.body.phone;
    const aadhar = req.body.aadhar;
    const salary = req.body.salary;
    const password = req.body.password;
    // "Password must contain 6 letters and alteast one special character and one numeric value",
    const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (name == "" || name == undefined) {
      return res.json({
        status: 400,
        message:
          "😅 Please enter your name so that we can proceed futher more !",
      });
    } else if (work_type == "" || work_type == undefined) {
      return res.json({
        status: 400,
        message:
          "😅 Please entert work type so that we can proceed futher more !",
      });
    } else if (worker_id == "" || worker_id == undefined) {
      return res.json({
        status: 400,
        message:
          "😅 Please enter worker id so that we can proceed futher more !",
      });
    } else if (phone == "" || phone == undefined) {
      return res.json({
        status: 400,
        message:
          "😅 Please enter phone number so that we can proceed futher more !",
      });
    } else if (aadhar == "" || aadhar == undefined) {
      return res.json({
        status: 400,
        message:
          "😅 Please enter aadhar number so that we can proceed futher more !",
      });
    } else if (password == "" || password == undefined) {
      return res.json({
        status: 400,
        message:
          "😅 Please enter your password so that we can proceed futher more !",
      });
    } else if (salary == "" || salary == undefined) {
      return res.json({
        status: 400,
        message: "😅 Please enter salary so that we can proceed futher more !",
      });
    } else if (phone.length != 10) {
      return res.json({
        status: 400,
        message: "😅 Please enter valid phone no !",
      });
    } else if (!(password.length >= 6 && password.match(passRegex))) {
      return res.json({
        status: 400,
        message:
          "😅 Password must contain 6 letters and alteast one special character and one numeric value",
      });
    } else if (aadhar.length != 12) {
      return res.json({
        status: 400,
        message: "😅 Please enter valid aadhar no...",
      });
    } else {
      next();
    }
  },
  async (req, res) => {
    const employerId = req.params.employerId.toLowerCase();
    const workerId = req.params.workerId;
    const worker = await Employer.findOne(
      { email: employerId },
      { workers: { $elemMatch: { worker_id: workerId } } }
    );
    req.body.image = worker.workers[0].image;
    req.body.attendence = worker.workers[0].attendence;
    req.body.paid_amount = worker.workers[0].paid_amount;
    await Employer.findOneAndUpdate(
      { email: employerId, "workers.worker_id": workerId },
      {
        $set: {
          "workers.$": req.body,
        },
      }
    );
    res.json({ status: 200, message: "🙂 Worker update successfully...." });
  }
);
//*************************************Check for Employer login */
app.post("/login", async (req, res) => {
  const email = req.body.email.toLowerCase();
  const pass = req.body.password;
  // console.log(email, pass);
  if (email == "" || email == undefined) {
    return res.json({ status: 401, message: "Invalid Credentials...." });
  } else if (pass == "" || pass == undefined) {
    return res.json({ status: 401, message: "Invalid Credentials...." });
  }
  const result = await Employer.findOne({ email: email, password: pass });
  if (result == null) {
    return res.json({ status: 401, message: "Invalid Credentials...." });
  } else {
    res.json({ status: 200, message: "Successfully...", data: result });
  }
});
//*************************************Check for Worker login */
app.post("/worker_login", async (req, res) => {
  const workerId = req.body.workerId;
  const pass = req.body.password;
  const empolyerId = req.body.employerId.toLowerCase();

  // console.log(workerId, pass, empolyerId);
  if (workerId == "" || workerId == undefined) {
    return res.json({ status: 401, message: "Invalid Credentials...." });
  }
  if (
    empolyerId == "" ||
    empolyerId == undefined ||
    empolyerId.includes("@") == "false" ||
    empolyerId.includes(".com") == false
  ) {
    return res.json({ status: 401, message: "Invalid Credentials...." });
  } else if (pass == "" || pass == undefined) {
    return res.json({ status: 401, message: "Invalid Credentials...." });
  }
  const result = await Employer.findOne(
    {
      email: empolyerId,
    },
    { workers: { $elemMatch: { worker_id: workerId, password: pass } } }
  );

  if (result.workers.length == 0) {
    return res.json({ status: 401, message: "Invalid Credentials...." });
  } else {
    res.json({ status: 200, message: "Successfully...", data: result });
  }
});

// Update Worker Attendence
app
  .route("/update_attendence/:workerId/:employerId")
  .patch(async (req, res) => {
    const worker_id = req.params.workerId;
    const employerId = req.params.employerId.toLowerCase();

    if (employerId.includes("@") && employerId.includes(".com")) {
      const attendence = await Employer.findOneAndUpdate(
        { email: employerId, "workers.worker_id": worker_id },
        {
          $push: {
            "workers.$.attendence": req.body,
          },
        }
      );
      if (attendence != null) {
        res.status(200).json({
          status: 200,
          message: "😍 Thanks for submitting worker attendence....",
        });
      } else {
        res.json({
          status: 401,

          message: "🥲 Invalid Request !",
        });
      }
    } else {
      res.json({
        status: 400,

        message: "🥲 Invalid Request !",
      });
    }
  });
//Update Worker Paid Amount
app.route("/update_payment/:workerId/:employerId").patch(async (req, res) => {
  const worker_id = req.params.workerId;
  const employerId = req.params.employerId.toLowerCase();
  // console.log(req.body);
  if (employerId.includes("@") && employerId.includes(".com")) {
    const attendence = await Employer.findOneAndUpdate(
      { email: employerId, "workers.worker_id": worker_id },
      {
        $push: {
          "workers.$.paid_amount": req.body,
        },
      }
    );
    if (attendence != null) {
      res.status(200).json({
        status: 200,

        message: "😍 Thanks for submitting worker payment....",
      });
    } else {
      res.json({
        status: 401,

        message: "🥲 Invalid Request !",
      });
    }
  } else {
    res.json({
      status: 400,

      message: "🥲 Invalid Request !",
    });
  }
});

//Sending OTP
app.route("/send_otp").post(async (req, res) => {
  const email = req.body.email.toLowerCase();
  // console.log(email);
  if (email == "" || email == undefined) {
    return res.json({
      status: 400,
      message:
        "😅 Please enter your email so that we can proceed futher more !",
    });
  } else if (!(email.includes("@") && email.includes("."))) {
    return res.json({
      status: 400,
      message: "😅 Please enter a valid email address !",
    });
  } else {
    const result = await Employer.findOne({ email });
    if (result == null) {
      res.json({
        status: 400,
        message: "No Employer exist with this email id .",
      });
    } else {
      let OTP = "";
      for (i = 0; i < 4; i++) {
        OTP += Math.floor(Math.random() * 10);
      }

      serverOTP = OTP;
      const mailOptions = {
        from: "workrideapp@gmail.com",
        to: email,
        subject: `OTP From Work Ride`,
        text: `OTP from Work Ride: ${OTP}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.json({ status: 400, message: "Something error..." });
        } else {
          res.json({ otp: OTP, status: 200, message: "Send Successfully..." });
        }
      });
    }
  }
});
//Update Password
app.route("/update_password").patch(
  (req, res, next) => {
    const otp = req.body.otp;
    const password = req.body.password;
    // "Password must contain 6 letters and alteast one special character and one numeric value",
    const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (otp == "" || otp == undefined) {
      return res.json({
        status: 400,
        message: "😅 Please enter your 4 digit OTP !",
      });
    } else if (password == "" || password == undefined) {
      return res.json({
        status: 400,
        message:
          "😅 Please enter your password so that we can proceed futher more !",
      });
    } else if (!(password.length >= 6 && password.match(passRegex))) {
      return res.json({
        status: 400,
        message:
          "😅 Password must contain 6 letters and alteast one special character and one numeric value",
      });
    } else if (otp !== serverOTP) {
      return res.json({
        status: 400,
        message: "😅 Invalid OTP !",
      });
    } else {
      next();
    }
  },
  async (req, res) => {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    // console.log(email, password);
    const updated_result = await Employer.findOneAndUpdate(
      { email: email },
      {
        $set: {
          password: password,
        },
      }
    );
    if (updated_result == null) {
      res.json({ status: 400, message: "🥲 Username does not exist !" });
    } else {
      res.json({ status: 200, message: "🙂 Password Updated Successfully..." });
    }
  }
);

module.exports = app;
