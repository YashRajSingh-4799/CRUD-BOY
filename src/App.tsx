import React from "react";
import APITester from "./components/APITester";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        {/* <h1 className="text-3xl font-bold mb-4">CRUD Boy</h1> */}
      </header>
      <APITester />
      <Footer />
    </div>
  );
};

export default App;
