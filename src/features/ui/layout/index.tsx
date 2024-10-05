import { Header } from "../header";

const Layout = (Children: React.ComponentType) => {
  return (
    <>
      <Header />
      <Children />
    </>
  );
};

export default Layout;
