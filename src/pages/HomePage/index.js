import Content1 from "./Content1";
import FooterPage from "./FooterPage";
import Slider from "./Slider";
import "./homepage.scss";

function HomePage(props) {
  return (
    <>
      <Slider />
      <Content1 />
      <FooterPage />
    </>
  );
}

export default HomePage;
