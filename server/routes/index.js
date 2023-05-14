const express = require("express");
const router = express();
const { Employees, Departments } = require("../models/schema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Employees
router.post("/employees/sign-up", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      gender,
      departmentIds,
      user_type,
    } = req.body;
    // Check if user with the email already exists
    const userExists = await Employees.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User with email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = new Employees({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      gender,
      departmentIds,
      user_type,
    });

    await user.save();

    // Create and sign a JWT token
    const token = jwt.sign(
      { userId: user.id, user_type: user_type },
      "mysecretkey"
    );

    res.status(201).json({ token, user_type, userId: user.id });
  } catch (error) {
    res.status(500).json({ message: error.message ?? "Internal server error" });
  }
});

router.post("/employees/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user with the email exists
    const user = await Employees.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create and sign a JWT token
    const token = jwt.sign({ userId: user._id }, "mysecretkey");

    res
      .status(200)
      .json({ user_type: user.user_type, token: token, userId: user.id });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// get employee by id
router.get("/employees/getDetailByUserId/:id", async (req, res) => {
  try {
    const user_id = req.params.id;

    const user = await Employees.findOne(
      { _id: user_id },
      { first_name: 1, last_name: 1, email: 1, departmentIds: 1 }
    );
    if (!user) {
      return res.status(401).json({ message: "Invalid user id " + user_id });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// update employees details
router.put("/employees/updateById/:id", async (req, res) => {
  try {
    const { department_id } = req.body;

    if (!department_id.length) {
      return res.status(401).json({ message: "Nothing to update" });
    }

    const user = await Employees.findByIdAndUpdate(req.params.id, {
      departmentIds: department_id,
    });

    if (!user) {
      return res.status(404).json({ message: "employee not found" });
    }
    res
      .status(200)
      .json(`User Updated Successfully ${department_id.join(",")}`);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Department
router.post("/departments/create", async (req, res) => {
  try {
    const { department_name, category_name, location } = req.body;

    const department = new Departments({
      department_name,
      category_name,
      location,
    });
    await department.save();

    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all departments
router.get("/departments/getAll", async (req, res) => {
  try {
    const departments = await Departments.find();

    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a department by ID
router.get("/departments/getById/:id", async (req, res) => {
  try {
    const department = await Departments.findById(req.params.id);

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update a department by ID
router.put("/departments/updateById/:id", async (req, res) => {
  try {
    const { department_name, category_name, location } = req.body;

    const department = await Departments.findByIdAndUpdate(
      req.params.id,
      {
        department_name,
        category_name,
        location,
      },
      { new: true }
    );
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a department by ID
router.delete("/departments/delete/:id", async (req, res) => {
  try {
    const department = await Departments.findByIdAndDelete(req.params.id);

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
