import React, { useState, useEffect } from 'react';
import './YearWiseDiv.css';
import { yearwiselabel } from '../../Templates/Template';

const YearWiseQuery = ({ newMapObj, layer, Graphic, geometry, SpatialReference }) => {
    const [yearWiseLabel, setYearWiseLabel] = useState(yearwiselabel);

    const handleYearChange = (year) => async (event) => {
        debugger
        let value = year.value;
        console.log(`This is the value checked : ${value}`);
        const isChecked = event.target.checked;
        console.log(`This is the checked : ${isChecked}`);
        const updatedYearWiseLabel = yearWiseLabel.map((year) =>
            year.value === value ? { ...year, checked: isChecked } : year
        );
        let view = newMapObj.newView;
        if (isChecked) {
            // Parse the year value to get start and end years
            const [startYear, endYear] = value.split('-').map(Number);

            // Create date strings for 01/01/YYYY and 31/12/YYYY
            const firstDate = `01/01/${startYear}`;
            const lastDate = `31/12/20${endYear}`;

            console.log(`Querying date range: ${firstDate} to ${lastDate}`);

            // Create and execute the query for the date range
            let query = layer.createQuery();
            query.where = `date___time_of_fracture BETWEEN '${firstDate}' AND '${lastDate}'`;

            try {
                const result = await layer.queryFeatures(query);
                // Define the popup template
                const popupTemplate = {
                    title: "Feature Information Date Wise",
                    content: [{
                        type: "fields",
                        fieldInfos: [
                            // {
                            //     fieldName: "date___time_of_fracture",
                            //     label: "Date of Fracture",
                            //     format: {
                            //         digitSeparator:true,
                            //         dateFormat: "short-date-short-time",
                            //         places:0
                            //     }
                            // },
                            {
                                fieldName: "railway",
                                label: "Railway",
                                format: {
                                    digitSeparator:true,
                                    dateFormat: "short-date-short-time",
                                    places:0
                                }
                            }
                        ]
                    }]
                };
                console.log(`This is the view :${view}`)
                // Check if the result is not undefined and has the featureResult property
                result.features.forEach(function (feature) {
                    var symbolPoint = {
                        type: "simple-marker",
                        color: "orange",
                        size: 15
                    };


                    let symbol = symbolPoint;

                    var graphic = new Graphic({
                        geometry: feature.geometry,
                        symbol: symbol,
                        popupTemplate: popupTemplate
                    });
                    view.graphics.add(graphic);
                });
                let graphicsExtent = result.features.filter(f => f.geometry.x !== 0).reduce((accExtent, feature) => {
                    let _ext = new geometry.Extent(feature.geometry.x, feature.geometry.y, feature.geometry.x, feature.geometry.y, new SpatialReference({ wkid: 4326 }));
                    return accExtent ? accExtent.union(_ext) : _ext;
                }, null);

                if (graphicsExtent) {
                    view.goTo(graphicsExtent);
                }
            } catch (error) {
                console.error('Query failed', error);
            }
        } else {
            view.graphics.removeAll();
        }
        setYearWiseLabel(updatedYearWiseLabel);
    };
    /*
 let screenId = filteredScreen[0].id;
        let selectedField = selectedLayerField;
        let selectedOperator = signSelected;
        let selectedValue = selectedLayerValue;
        if (!screenId || !selectedField || !selectedOperator || !selectedValue) {
            return toast.error("Please Select the Field, Sign and Value")
        }
        let query = selectedLayer.createQuery();
        if (fieldType === "integer" || fieldType === "double") {
            query.where = selectedField + " " + selectedOperator + " " + selectedValue + "";
        }
        else if (fieldType === "date") {
            query.where = `${selectedField} ${selectedOperator} DATE '${formatDate(parseInt(selectedValue))}'`;
        }
        else {
            query.where = selectedField + " " + selectedOperator + "'" + selectedValue + "'";
        }
        try {
            const result = await selectedLayer.queryFeatures(query);
            if (result.features.length !== 0) {
                let type = result.features[0].geometry.type;
                let filteredMapObj = mapObject && mapObject.filter((mapOb) => mapOb.id === screenId);
                let view = filteredMapObj[0].newView;
                view.graphics.removeAll();

                result.features.forEach(function (feature) {
                    var symbolPoint = {
                        type: "simple-marker",
                        color: "yellow",
                        size: 15
                    };
                    var symbolLine = {
                        type: "simple-line",
                        style: "solid",
                        color: "aqua",
                        width: 5,
                        outline: {
                            color: "aqua",
                            width: 5
                        }
                    };
                    let symbol;
                    if (type === "point") {
                        symbol = symbolPoint
                    } else {
                        symbol = symbolLine
                    }
                    var graphic = new Graphic({
                        geometry: feature.geometry,
                        symbol: symbol
                    });
                    view.graphics.add(graphic);
                });
                let graphicsExtent = null;
                if (type === "point") {
                    graphicsExtent = result.features.filter(f => f.geometry.x !== 0).reduce((accExtent, feature) => {
                        let _ext = new geometry.Extent(feature.geometry.x, feature.geometry.y, feature.geometry.x, feature.geometry.y, new SpatialReference({ wkid: 4326 }));
                        return accExtent ? accExtent.union(_ext) : _ext;
                    }, null);
                } else {
                    graphicsExtent = result.features.filter(f => f.geometry.paths[0].length > 0).reduce((extent, feature) => {
                        return extent ? extent.union(feature.geometry.extent) : feature.geometry.extent;
                    }, null);
                }
                if (graphicsExtent) {
                    view.goTo(graphicsExtent);
                }
                // Display results in a table
                displayResultsInTable(result.features);

            } else {
                toast("No Features Found");
            }
        } catch (error) {
            console.log(`Error while querrying features : ${error}`);
        }
    */
    return (
        <div className='yearQueryDiv'>
            <div className="heading">
                <h4>Rail Fracture</h4>
            </div>
            <div className="content">
                <div className="tag">
                    <span>Year Wise</span>
                </div>
                <div className="checkBoxDiv">
                    {
                        yearWiseLabel && yearWiseLabel.map((year, index) => (
                            <label
                                key={index}
                            >
                                <input
                                    type="checkbox"
                                    value={year.value}
                                    onChange={handleYearChange(year)}
                                    checked={year.checked}
                                    style={{ marginRight: "8px" }}
                                />
                                <span> {year.label}</span>
                            </label>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default YearWiseQuery