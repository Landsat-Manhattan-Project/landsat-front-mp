import { useAuthContext } from "../../features/auth/general/model/auth.context";
import { Map } from "../../features/map";
import { LandsatButton } from "../../features/ui/button";

import AddLocation from "../../features/ui/addLocation";
import { Header } from "../../features/ui/header";

const HomePage = () => {
  const { logout } = useAuthContext();

  return (
    <>
      <Header />
      <AddLocation />
      <h1>Home</h1>
      <LandsatButton onClick={logout} text={"Logout"} />
      {/* <Map /> */}
    </>
  );
};

export default HomePage;
