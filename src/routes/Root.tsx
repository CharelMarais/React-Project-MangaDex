import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { registerSW } from "../sw-register";
import { useEffect } from "react";

export function Root() {
    useEffect(() => {
      registerSW()
    }, [])

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Root;
