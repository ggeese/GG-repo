import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';

const intervals = [
  { value: '1m', label: '1 Minuto' },
  { value: '3m', label: '3 Minutos' },
  { value: '5m', label: '5 Minutos' },
  { value: '15m', label: '15 Minutos' },
  { value: '30m', label: '30 Minutos' },
  { value: '1h', label: '1 Hora' },
  { value: '2h', label: '2 Horas' },
  { value: '4h', label: '4 Horas' },
  { value: '6h', label: '6 Horas' },
  { value: '8h', label: '8 Horas' },
  { value: '12h', label: '12 Horas' },
  { value: '1d', label: '1 Día' },
  { value: '3d', label: '3 Días' },
  { value: '1w', label: '1 Semana' },
  { value: '1M', label: '1 Mes' },
];

const TradingViewChart = ({ tableName }) => {
  const chartContainerRef = useRef();
  const candleSeriesRef = useRef();
  const [interval, setInterval] = useState('1m');
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const newWs = new WebSocket('ws://localhost:3003');
    newWs.onopen = () => {
      console.log('Connected to WebSocket');
      newWs.send(JSON.stringify({ tableName }));
    };
    newWs.onclose = () => {
      console.log('WebSocket connection closed');
    };
    newWs.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setWs(newWs);

    return () => {
      newWs.close();
    };
  }, [tableName]);

  useEffect(() => {
    if (!ws) return;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received data:', data); // Log para depuración

      // Transformar y validar los datos
      const transformedData = data.map(item => ({
        time: item[0]/1000, // Convertir milisegundos a segundos
        open: parseFloat(item[1]),
        high: parseFloat(item[2]),
        low: parseFloat(item[3]),
        close: parseFloat(item[4])
      }));

      if (!candleSeriesRef.current) {
        while (chartContainerRef.current.firstChild) {
          chartContainerRef.current.removeChild(chartContainerRef.current.firstChild);
        }

        const chart = createChart(chartContainerRef.current, {
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
          layout: {
            background: {
              color: '#000000',
            },
            textColor: '#ffffff',
          },
          grid: {
            vertLines: {
              color: 'transparent',
            },
            horzLines: {
              color: 'transparent',
            },
          },
        });

        const candleSeries = chart.addCandlestickSeries();
        candleSeries.setData(transformedData);
        candleSeriesRef.current = candleSeries;

        window.addEventListener('resize', () => {
          chart.resize(chartContainerRef.current.clientWidth, chartContainerRef.current.clientHeight);
        });
      } else {
        candleSeriesRef.current.update(transformedData[transformedData.length - 1]);
      }
    };

    return () => {
      ws.onmessage = null;
    };
  }, [ws, tableName]);

  return (
    <div className="h-full w-full bg-black">
      <select
        value={interval}
        onChange={(e) => setInterval(e.target.value)}
        className="mb-2 bg-gray-800 text-white border border-gray-600 rounded p-2"
      >
        {intervals.map((intvl) => (
          <option key={intvl.value} value={intvl.value}>
            {intvl.label}
          </option>
        ))}
      </select>

      <div
        ref={chartContainerRef}
        className="h-[calc(100%-30px)] w-full"
      />
    </div>
  );
};

export default TradingViewChart;
