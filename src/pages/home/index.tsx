import { useAuthContext } from "../../features/auth/general/model/auth.context";
import { Map } from "../../features/map";
import { LandsatButton } from "../../features/ui/button";

const HomePage = () => {
  const { logout } = useAuthContext();

  return (
    <>
      {/* <h1>Home</h1> */}
      {/* <LandsatButton onClick={logout} text={"Logout"} /> */}
      <Map />
    </>
  );
};

export default HomePage;
