const mongoose = require("mongoose");
const AttendenceSchema = mongoose.Schema({
  status: { type: String, require: true },
  date: { type: String, default: new Date().getDate() },
});
const PaymentSchema = mongoose.Schema({
  amount: { type: String, require: true },
  date: { type: String, require: true },
});
const EmployeeSchema = mongoose.Schema({
  name: { type: String, require: true },
  work_type: { type: String, require: true },
  worker_id: { type: String, require: true },
  phone: { type: String, require: true },
  aadhar: { type: String, require: true },
  salary: { type: String, require: true },
  password: { type: String, require: true },
  image: {
    type: Object,
    url: { type: URL, require: true },
    public_id: {
      type: String,
    },
  },
  attendence: [AttendenceSchema],
  paid_amount: [PaymentSchema],
});
const EmployerSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    company_name: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: String, require: true },
    aadhar: { type: String, require: true },
    password: { type: String, require: true },
    image: {},
    workers: [EmployeeSchema],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Employer", EmployerSchema);
