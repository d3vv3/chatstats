const jsonToChartJS = (object, colorMap) => {
    return {
        labels: Object.keys(object),
        datasets: [
          {
            data: Object.values(object),
            backgroundColor: Object.keys(object).map(contactName => colorMap[contactName].fillColor),
            borderColor: Object.keys(object).map(contactName => colorMap[contactName].lineColor),
            // hoverBackgroundColor: colors,
          },
        ],
      };
};

export { jsonToChartJS };