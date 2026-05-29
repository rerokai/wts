import { Outlet } from "react-router-dom";
import Grainient from "@/components/Grainient";// путь к вашему компоненту

export function IntroPage() {
  return (
    <div className="relative h-screen w-full">
  <div className="absolute inset-0 -z-10">
    <Grainient className="h-full w-full" />
  </div>
  <div className="relative z-10 flex h-full items-center justify-center">
    <div className="..."> <Outlet /> </div>
  </div>
</div>
  );
}