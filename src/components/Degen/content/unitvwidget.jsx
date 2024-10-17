import React from 'react';

const UniTradingViewChart = ({ poolContract, chainNet, SetOpenDonate }) => {

  return (
    <div className="h-full w-full bg-black relative">
      <iframe id="dextools-widget"
        title="DEXTools Trading Chart"
        width="100%" height="100%"
        src={`https://www.dextools.io/widget-chart/en/base/pe-light/${poolContract}?theme=dark&chartType=1&chartResolution=30&drawingToolbars=false`}>
      </iframe>
    </div>
  )}

export default UniTradingViewChart;

