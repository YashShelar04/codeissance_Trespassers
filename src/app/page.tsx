"use client";
import Spline from "@splinetool/react-spline";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <Navbar />
      <div className="h-screen relative z-10">
        <Spline
          className="w-full h-full"
          scene="https://prod.spline.design/i93i7R9GQtNmyEBT/scene.splinecode"
        />
      </div>
    </div>
  );
}
