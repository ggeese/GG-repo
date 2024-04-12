import React from "react";
import { Info, Pools, Footer } from './content';

const Home = () => {
    return (<div>
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Welcome />
      </div>
      <Services />
      <Transactions/>
      <Footer />
    </div>
    </div>
    )
};

export default Home;