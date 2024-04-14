import React from "react";
import { Info, Pools, Footer } from './content';

const Farm = () => {
    return (<div>
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Info />
      </div>
      <Pools />
      <Footer />
    </div>
    </div>
    )
};

export default Farm;