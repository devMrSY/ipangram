const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeesSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    hobbiles: { type: String, required: true },
    department_id: { type: [String], required: false },
    user_type: { type: String, required: true },
  },
  { timestamps: true }
);

const DepartmentsSchema = new Schema(
  {
    department_name: { type: String, required: true },
    category_name: { type: String, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true }
);

// const manager = new Schema(
//   {
//     first_name: { type: String, required: true },
//     last_name: { type: [String], required: true },
//     email: { type: Number, required: false },
//     password: {},
//     gender: {},
//   },
//   { timestamps: true }
// );

// const Department_employees = new Schema(
//   {
//     department_name: { type: String, required: true },
//     category_name: { type: [String], required: true },
//     location: { type: Number, required: false },
//     salary: {},
//   },
//   { timestamps: true }
// );

const Employees = mongoose.model("Employees", EmployeesSchema);
const Departments = (module.exports = mongoose.model(
  "Departments",
  DepartmentsSchema
));

module.exports = { Employees, Departments };
