import React from "react";
import { Welcome_Factory, Services, Transactions, Footer } from './content';

const Factory = () => {
    return (<div>
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Welcome_Factory />
      </div>
      <Services />
      <Transactions/>
      <Footer />
    </div>
    </div>
    )
};

export default Factory;