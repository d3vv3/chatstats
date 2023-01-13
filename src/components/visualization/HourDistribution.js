import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export const data = {
  labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
  datasets: [
    {
      label: '# of Votes',
      data: [2, 9, 3, 5, 2, 3],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};

function HourDistribution(props) {
  const [options, setOptions] = useState({});

  useEffect(() => {
    setOptions({
      series: [
        {
          name: "Messages",
          data: props.polarizedByHour.chat
        }
      ],
      labels: props.polarizedByHour.hours,
      xaxis: {
        categories: props.polarizedByHour.hours,
        labels: {
          show: true,
          style: {
            colors: ["#a8a8a8"],
            fontSize: "11px",
            fontFamily: 'Arial',
          }
        }
      }
    });
  }, [props.polarizedByHour]);

  return (
    <div className="hour-distribution-container">
      {
      options !== {} ?  <Chart
        options={options}
        type="radar"
        width="500"
      /> : null
      }
    </div>
  );
};

export default HourDistribution;
