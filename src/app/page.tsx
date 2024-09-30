import Spline from '@splinetool/react-spline';
import Navbar from "./components/Navbar";
import Cards from "./components/Cards";

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <div className="h-screen">
        <Spline className="w-full h-full" scene="https://prod.spline.design/i93i7R9GQtNmyEBT/scene.splinecode" />
      </div>
      <Cards />
    </div>
  );
}