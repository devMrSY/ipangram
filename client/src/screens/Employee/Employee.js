import { useEffect, useState } from "react";
import employeePageStyles from "./Employee.styles";
import { getEmployeeDetail } from "./EmployeeService";
import { useSelector } from "react-redux";
import { userId } from "../../redux/authSlice";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const Employee = (props) => {
  const classes = employeePageStyles;

  const [employee, setEmployee] = useState({
    _id: "",
    first_name: "",
    last_name: "",
    email: "",
    departmentIds: [],
  });

  const userIdFromRedux = useSelector((state) => state.auth.userId);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      await getEmployeeDetail(userIdFromRedux).then((res) => setEmployee(res));
    } catch (error) {
      alert(error.message ?? error);
    }
  };

  const getBody = () => {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image='/static/images/cards/contemplative-reptile.jpg'
          title='green iguana'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {"name =" + employee.first_name + " " + employee.last_name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {employee.departmentIds.join(",")}
          </Typography>
        </CardContent>
        {/* <CardActions>
          <Button size='small'>Share</Button>
          <Button size='small'>Learn More</Button>
        </CardActions> */}
      </Card>
    );
  };

  return getBody();
};

export default Employee;
