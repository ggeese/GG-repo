import React from "react";
import { Welcome, Services, Transactions, Footer } from './content';

const Factory = () => {
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

export default Factory;