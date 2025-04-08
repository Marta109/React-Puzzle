import Footer from "../components/footer/footer";
import Header from "../components/header/header";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
