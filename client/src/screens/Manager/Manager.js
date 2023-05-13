import { useSelector } from "react-redux";
import managerPageStyles from "./Manager.styles";
import { useEffect } from "react";
import { getEmployeeDetail } from "./ManagerService";

// import landingPageStyles from "./LandingPage.styles";

const Manager = (props) => {
  const classes = managerPageStyles;

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

  return <>Manager</>;
};

export default Manager;
