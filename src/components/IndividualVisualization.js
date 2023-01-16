import React, { useState, useEffect } from "react";

// Local imports

function IndividualVisualization({title, description, data, unit, colorMap}) {

    const [number1, setNumber1] = useState(0);
    const [number2, setNumber2] = useState(0);
    const [name1, setName1] = useState("");
    const [name2, setName2] = useState("");
    const [color1, setColor1] = useState("");
    const [color2, setColor2] = useState("");

    useEffect(() => {
        setColor1((data?.labels ?? []).length === 2 ? data.datasets[0].borderColor[0] : Object.values(colorMap)[0].lineColor);
        setColor2((data?.labels ?? []).length === 2 ? data.datasets[0].borderColor[1] : Object.values(colorMap)[1].lineColor);
        setName1((data?.labels ?? []).length === 2 ?  data.labels[0] : Object.keys(colorMap)[0]);
        setName2((data?.labels ?? []).length === 2 ?  data.labels[1] : Object.keys(colorMap)[1]);
        let num1 = data?.datasets[0]?.data ? data.datasets[0].data[0] : 0;
        let num2 = data?.datasets[0]?.data ? data.datasets[0].data[1] : 0;

        setNumber1((num1 ?? 0) % 1 === 0 ? (num1 ?? 0) : num1.toFixed(1));
        setNumber2((num2 ?? 0) % 1 === 0 ? (num2 ?? 0) : num2.toFixed(1));

        if (number1 === undefined) setNumber1(0);
        if (number2 === undefined) setNumber2(0);

    }, [data]);

  return (
    <div className="individual-visualization">
        <h2>{title}</h2>
        <p className="description">{description}</p>
        <div className="row">
            <div className="column">
                <h2 style={{"color": `${color1}`}}>
                    {name1}
                </h2>
                <p className="number" style={{"color": `${color1}`}}>
                    {number1} {unit}
                </p>
            </div>

            <div className="column">
                <h2 style={{"color": `${color2}`}}>
                    {name2}
                </h2>
                <p className="number" style={{"color": `${color2}`}}>
                    {number2} {unit}
                </p>
            </div>
        </div>
    </div>
  );
}

export default IndividualVisualization;