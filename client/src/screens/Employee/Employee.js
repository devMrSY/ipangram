import { useEffect } from "react";
import employeePageStyles from "./Employee.styles";
import { getEmployeeDetail } from "./EmployeeService";
import { useSelector } from "react-redux";
import { userId } from "../../redux/authSlice";

const Employee = (props) => {
  const classes = employeePageStyles;

  const userIdFromRedux = useSelector((state) => state.auth.userId);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      await getEmployeeDetail(userIdFromRedux).then((res) => console.log(res));
    } catch (error) {
      alert(error.message ?? error);
    }
  };

  return <>Employee</>;
};

export default Employee;
