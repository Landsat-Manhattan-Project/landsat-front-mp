import { useAuthContext } from "../../features/auth/general/model/auth.context";
import { LandsatButton } from "../../features/ui/button";

const HomePage = () => {
  const { logout } = useAuthContext();

  return (
    <>
      <h1>Home</h1>
      <LandsatButton onClick={logout} text={"Logout"} />
    </>
  );
};

export default HomePage;
