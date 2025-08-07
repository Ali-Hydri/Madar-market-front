"use client";
import React from "react";
import Header from "../components/head/header";
import Body from "../components/body/body";
import Footer from "../components/footer/footer";

function HomePage() {


  return (
    <div className="max-w-[375px] mx-auto">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default HomePage;
