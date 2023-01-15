const jsonToChartJS = (object, fillColors, lineColors) => {
    return {
        labels: Object.keys(object),
        datasets: [
          {
            data: Object.values(object),
            backgroundColor: fillColors,
            borderColor: lineColors,
            // hoverBackgroundColor: colors,
          },
        ],
      };
};

export { jsonToChartJS };