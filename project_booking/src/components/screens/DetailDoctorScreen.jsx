import React from "react";
import Detail from "../layouts/DetailDoctor";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import Article from "../layouts/Article";

function DetailScreen({ doctor }) {
  return (
    <div>
      <Navbar />
      <div className="bg-blue-100 w-full h-20 absolute"></div>
      <div className="border-2 rounded-t-3xl mt-2 relative">
        <Detail doctor={doctor} />
        <Article />
      </div>
      <Footer />
    </div>
  );
}

export default DetailScreen;
