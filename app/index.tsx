import React from "react";
import { Redirect } from "expo-router";

// Redirect to Home page
const index = () => {
  return <Redirect href={"/(home)"}></Redirect>;
};

export default index;
