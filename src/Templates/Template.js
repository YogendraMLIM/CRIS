//Rail Weld Fracture Renderer and PopUpTemplate
const railFractureRenderer = {
    type: "simple",
    symbol: {
        type: "simple-marker",
        size: 5,
        color: "#720455",
        outline: null
    }
};
const railFracturePopUpTemplate = {
    title: "Rail Weld Fracture",
    content: "<table class='table table-striped'>" +
        "<tr><td>Unique Id</td><td class='popup-cell'>{}</td></tr>" +
        "<tr><td>Fracture Date</td><td class='popup-cell'>{date_time_of_fracture}</td></tr>" +
        "<tr><td>Railway</td><td class='popup-cell'>{railway}</td></tr>" +
        "<tr><td>Division</td><td class='popup-cell'>{division}</td></tr>" +
        "<tr><td>Section Station</td><td class='popup-cell'>{section_station}</td></tr>" +
        "</table>",
    fieldInfos: [
        {
            fieldName: "routeclass",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "date_time_of_fracture",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "railway",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "division",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "section",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "route",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
    ]
};
//GMT Details ClassBreak, Renderer and PopUpTemplate
const gmtClassBreaks = [
    {
        minValue: -Infinity,
        maxValue: 19,
        symbol: {
            type: "simple-line",
            style: "solid",
            color: "red",
            width: 2 // Adjust the width property instead of size
        },
        label: "0-20"
    },
    {
        minValue: 20,
        maxValue: 39,
        symbol: {
            type: "simple-line",
            style: "solid",
            color: "blue",
            width: 2 // Adjust the width property instead of size
        },
        label: "20 - 40"
    },
    {
        minValue: 40,
        maxValue: 59,
        symbol: {
            type: "simple-line",
            style: "solid",
            color: "#430A5D",
            width: 2 // Adjust the width property instead of size
        },
        label: "40-60"
    },
    {
        minValue: 60,
        maxValue: Infinity,
        symbol: {
            type: "simple-line",
            style: "solid",
            color: "#F57D1F",
            width: 2 // Adjust the width property instead of size
        },
        label: "60-Above"
    }
];
const gmtClassBreaksRenderer = {
    type: "class-breaks",
    field: "gmt",
    classBreakInfos: gmtClassBreaks
};
const GMTPopupTemplate = {
    // autocasts as new PopupTemplate()
    title: "GMT Details Data",
    content: "<table class='table table-striped'>" +
        "<tr><td>Type Of Route</td><td class='popup-cell'>{routeclass}</td></tr>" +
        "<tr><td>GMT</td><td class='popup-cell'>{gmt}</td></tr>" +
        "<tr><td>GMT Year</td><td class='popup-cell'>{gmt_year}</td></tr>" +
        "<tr><td>Railway</td><td class='popup-cell'>{railway}</td></tr>" +
        "<tr><td>Division</td><td class='popup-cell'>{division}</td></tr>" +
        "<tr><td>Route</td><td class='popup-cell'>{route}</td></tr>" +
        "<tr><td>Section</td><td class='popup-cell'>{section_n}</td></tr>" +
        "</table>",
    fieldInfos: [
        {
            fieldName: "routeclass",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "gmt",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "gmt_year",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "railway",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "division",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "section",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
    ]
};
//Speed Restriction ClassBreak, Renderer and PopUpTemplate
const speedclassBreaks = [
    {
        minValue: 0,
        maxValue: 59,
        symbol: {
            type: "simple-line",
            style: "solid",
            color: "red",
            width: 2 // Adjust the width property instead of size
        },
        label: "< 60 KMPH"
    },
    {
        minValue: 60,
        maxValue: 99,
        symbol: {
            type: "simple-line",
            style: "solid",
            color: "blue",
            width: 2 // Adjust the width property instead of size
        },
        label: ">= 60 & < 100 KMPH"
    },
    {
        minValue: 100,
        maxValue: Infinity,
        symbol: {
            type: "simple-line",
            style: "solid",
            color: "#430A5D",
            width: 2 // Adjust the width property instead of size
        },
        label: ">= 100 KMPH"
    },
];
const speedclassBreaksRenderer = {
    type: "class-breaks",
    field: "psr",
    classBreakInfos: speedclassBreaks
};
const speedPopUpTemplate = {
    // autocasts as new PopupTemplate()
    title: "Speed Restriciton Data",
    content: "<table class='table table-striped'>" +
        "<tr><td>Type Of Route</td><td class='popup-cell'>{route_clas}</td></tr>" +
        "<tr><td>Imposition Date</td><td class='popup-cell'>{date_of_im}}</td></tr>" +
        "<tr><td>Railway</td><td class='popup-cell'>{railway}</td></tr>" +
        "<tr><td>Division</td><td class='popup-cell'>{division}</td></tr>" +
        "<tr><td>Section</td><td class='popup-cell'>{section}</td></tr>" +
        "<tr><td>Route</td><td class='popup-cell'>{route}</td></tr>" +
        "</table>",
    fieldInfos: [
        {
            fieldName: "route_clas",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "railway",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "division",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "section",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
    ]
};
//Level Crossing ClassBreak, Renderer and PopUpTemplate
const levelCrossingClassBreak = [
    {
        minValue: 0,
        maxValue: 99000,
        symbol: {
            type: "simple-marker",
            style: "circle",
            color: "red",
            size: 6,
        },
        label: "< 1 Lac"
    },
    {
        minValue: 100000,
        maxValue: Infinity,
        symbol: {
            type: "simple-marker",
            style: "circle",
            size: 6,
            color: "green",
        },
        label: "> 1 Lac"
    },
];
const levelCrossingRenderer = {
    type: "class-breaks",
    field: "tvu",
    classBreakInfos: levelCrossingClassBreak
}
const levelCrossingPopUpTemplate = {
    // autocasts as new PopupTemplate()
    title: "Level Crossing",
    content: "<table class='table table-striped'>" +
        "<tr><td>Type Of Route</td><td class='popup-cell'>{routeclass}}</td></tr>" +
        "<tr><td>TVU</td><td class='popup-cell'>{tvu}}</td></tr>" +
        "<tr><td>Rail Paint Date</td><td class='popup-cell'>{rail_painting_date}}</td></tr>" +
        "<tr><td>Railway</td><td class='popup-cell'>{railway}</td></tr>" +
        "<tr><td>Division</td><td class='popup-cell'>{division}</td></tr>" +
        "<tr><td>Route</td><td class='popup-cell'>{route}</td></tr>" +
        "<tr><td>Section</td><td class='popup-cell'>{section}</td></tr>" +
        "</table>",
    fieldInfos: [
        {
            fieldName: "routeclass",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "tvu",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName:"rail_painting_date",
            format:{
                digitSeparator: true,
                places:0
            }
        },
        {
            fieldName: "railway",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "division",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "route",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "section",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
    ]
};
//Track Network Distribution ClassBreak, Renderer and PopUpTemplate
const trackNetworkDistributionPopUpTemplate = {
    // autocasts as new PopupTemplate()
    title: "Track Network Distribution",
    content: "<table class='table table-striped'>" +
        "<tr><td>Type Of Route</td><td class='popup-cell'>{routeclass}}</td></tr>" +
        "<tr><td>Rail Section</td><td class='popup-cell'>{rail_section}</td></tr>" +
        "<tr><td>Track Laying Month</td><td class='popup-cell'>{laying_month}</td></tr>" +
        "<tr><td>Railway</td><td class='popup-cell'>{railway}</td></tr>" +
        "<tr><td>Division</td><td class='popup-cell'>{division}</td></tr>" +
        "<tr><td>Route</td><td class='popup-cell'>{route}</td></tr>" +
        "<tr><td>Section</td><td class='popup-cell'>{section}</td></tr>" +
        "</table>",
    fieldInfos: [
        {
            fieldName: "routeclass",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "rail_section",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "laying_month",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "railway",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "division",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "route",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "section",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
    ]
};
//Weld Fracture Report Renderer and PopUpTemplate
const weldFractureReportRenderer = {
    type: "simple", // autocasts as new SimpleRenderer()
    symbol: {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        size: 5,
        color: "#FF5F00",
        outline: null
    }
}
const weldFractureReportPopUpTemplate = {
    title: "Weld Fracture Report",
    content: "<table class='table table-striped'>" +
        "<tr><td>Type Of Route</td><td class='popup-cell'>{routeclass}}</td></tr>" +
        "<tr><td>Welding Date</td><td class='popup-cell'>{date_of_welding}}</td></tr>" +
        "<tr><td>Railway</td><td class='popup-cell'>{railway}</td></tr>" +
        "<tr><td>Division</td><td class='popup-cell'>{division}</td></tr>" +
        "<tr><td>Section</td><td class='popup-cell'>{section}</td></tr>" +
        "<tr><td>Route</td><td class='popup-cell'>{route}</td></tr>" +
        "</table>",
    fieldInfos: [
        {
            fieldName: "routeclass",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "date_of_welding",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "railway",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "division",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "route",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "section",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
    ]
};
//Permissible Speed Restriction ClassBreak, Renderer and PopUpTemplate
const permissibleSpeedclassBreaks = [
    {
        minValue: 0,
        maxValue: 99,
        symbol: {
            type: "simple-line",
            style: "solid",
            color: "#C40C0C",
            width: 2
        },
        label: "< 100 KMPH"
    },
    {
        minValue: 100,
        maxValue: 110,
        symbol: {
            type: "simple-line",
            style: "solid",
            color: "#FFC100",
            width: 2
        },
        label: "100 - 110 KMPH"
    }
];
const permissibleSpeedclassBreaksRenderer = {
    type: "class-breaks",
    field: "maximum_permissible_speed",
    classBreakInfos: permissibleSpeedclassBreaks
};
const permissibleSpeedPopUpTemplate = {
    // autocasts as new PopupTemplate()
    title: "Permisable Speed Restriciton",
    content: "<table class='table table-striped'>" +
        "<tr><td>Type Of Route</td><td class='popup-cell'>{routeclass}}</td></tr>" +
        "<tr><td>Maximum Permissible Speed</td><td class='popup-cell'>{maximum_permissible_speed}}</td></tr>" +
        "<tr><td>Railway</td><td class='popup-cell'>{railway}</td></tr>" +
        "<tr><td>Division</td><td class='popup-cell'>{division}</td></tr>" +
        "<tr><td>Section</td><td class='popup-cell'>{section}</td></tr>" +
        "<tr><td>Route</td><td class='popup-cell'>{route}</td></tr>" +
        "</table>",
    fieldInfos: [
        {
            fieldName: "routeclass",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "maximum_permissible_speed",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "railway",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "division",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "route",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "section",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
    ]
};
const baseTrackClassBreak = [
    {
        value:"NER",
        symbol: {
            type: "simple-line",
            style: "solid",
            color: "red",
            width: 1,
        },
    },
    {
        value:"ECR",
        symbol: {
            type: "simple-line",
            style: "solid",
            width: 1,
            color: "green",
        },
    },
    {
        value:"NR",
        symbol: {
            type: "simple-line",
            style: "solid",
            width: 1,
            color: "Blue",
        },
    },
    {
        value:"NWR",
        symbol: {
            type: "simple-line",
            style: "solid",
            width: 1,
            color: "#711DB0",
        },
    },
    {
        value:"SCRS",
        symbol: {
            type: "simple-line",
            style: "solid",
            width: 1,
            color: "#E36414",
        },
    },
    {
        value:"WR",
        symbol: {
            type: "simple-line",
            style: "solid",
            width: 1,
            color: "#A1DD70",
        },
    },
    {
        value:"NCR",
        symbol: {
            type: "simple-line",
            style: "solid",
            width: 1,
            color: "#006769",
        },
    },
    {
        value:"WCR",
        symbol: {
            type: "simple-line",
            style: "solid",
            width: 1,
            color: "#5AB2FF",
        },
    },
    {
        value:"CR",
        symbol: {
            type: "simple-line",
            style: "solid",
            width: 1,
            color: "#DD5746",
        },
    },
]
export const baseTrackRenderer = {
    type: "unique-value",
    field: "railway",
    uniqueValueInfos: baseTrackClassBreak
}
export const operationalLayers = [
    { name: "Rail Fracture", DateField: "date___time_of_fracture", DateType: "Date" },
    { name: "GMT Details", DateField: "gmt_year", DateType: "FinancialYear" },
    { name: "Speed Restriction", DateField: "date_of_im", DateType: "FinancialYear" },
    { name: "Level Crossing", DateField: "rail_painting_date", DateType: "FinancialYear" },
    { name: "Track Network Distribution", DateField: "laying_month", DateType: "FinancialYear" },
    { name: "Weld Fracture Report", DateField: "date_of_welding", DateType: "Date" }
];
export const TrackInsightes = [
    { id: 1, label: "Rail Fracture", value: "Rail Fracture", url: "https://mlinfomap.org/server/rest/services/RailWeldFractureAnalysis/MapServer/0", renderer: railFractureRenderer, popupTemplate: railFracturePopUpTemplate, title: "Rail Weld Fracture", checked: false },
    { id: 2, label: "GMT Details", value: "GMT Details", url: "https://mlinfomap.org/server/rest/services/GMT_Details_Event/MapServer/0", renderer: gmtClassBreaksRenderer, popupTemplate: GMTPopupTemplate, title: "GMT Details", checked: false },
    { id: 3, label: "Speed Restriction", value: "Speed Restriction", url: "https://mlinfomap.org/server/rest/services/PermanentSpeedRestrictions/MapServer/0", renderer: speedclassBreaksRenderer, popupTemplate: speedPopUpTemplate, title: "Speed Restriction", checked: false },
    { id: 4, label: "Level Crossing", value: "Level Crossing", url: "https://mlinfomap.org/server/rest/services/LevelCrossing/MapServer/0", renderer: levelCrossingRenderer, popupTemplate: levelCrossingPopUpTemplate, title: "Level Crossing", checked: false },
    { id: 5, label: "Track Network Distribution", value: "Track Network Distribution", url: "https://mlinfomap.org/server/rest/services/TrackNetworkDistribution/MapServer/0", popupTemplate: trackNetworkDistributionPopUpTemplate, field: "rail_section", title: "Track Network Distribution", checked: false },
    { id: 6, label: "Weld Fracture Report", value: "Weld Fracture Report", url: "https://mlinfomap.org/server/rest/services/WeldFractureReport/MapServer/0", renderer: weldFractureReportRenderer, popupTemplate: weldFractureReportPopUpTemplate, title: "Weld Fracture Report", checked: false },
    { id: 7, label: "Permissible Speed Restriction", value: "Permissible Speed Restriction", url: "https://mlinfomap.org/server/rest/services/Rail_Track/MapServer/0", renderer: permissibleSpeedclassBreaksRenderer, popupTemplate: permissibleSpeedPopUpTemplate, title: "Permissible Speed Restriction", checked: false },
    { id: 8, label: "TRC Peaks", value: "TRC Peaks", url: "https://mlinfomap.org/server/rest/services/Rail_Track/MapServer/0", checked: false },
    { id: 9, label: "Rail Section Analysis", value: "Rail Section Analysis", url: "https://mlinfomap.org/server/rest/services/Rail_Track/MapServer/0", checked: false },
];
export const BridgeInsightes = [
    { id: 10, label: "ORN (Less than or Equal to 2)", value: "ORN (Less than or Equal to 2)", url: "https://mlinfomap.org/server/rest/services/Rail_Track/MapServer/0", checked: false },
    { id: 11, label: "ORN (Between 3 to 4)", value: "ORN (Between 3 to 4)", url: "https://mlinfomap.org/server/rest/services/Rail_Track/MapServer/0", checked: false },
    { id: 12, label: "ORN (Equal to 5)", value: "ORN (Equal to 5)", url: "https://mlinfomap.org/server/rest/services/Rail_Track/MapServer/0", checked: false },
    // { id: 13, label: "Bridge Inspection DUE", value: "Bridge Inspection DUE", checked: false },
    // { id: 14, label: "Bridge Inspection DONE", value: "Bridge Inspection DONE", checked: false },
    // { id: 15, label: "Bridge Water Level", value: "Bridge Water Level", checked: false },
    // { id: 16, label: "Monsoon Reserve Location", value: "Monsoon Reserve Location", checked: false },
];
export const Trackanalysisrenderer = {
    type: "simple",  // Use a simple renderer
    symbol: {
        type: "simple-line",  // Specify the symbol type as a simple line
        color: "gray",  // Set the color to red (RGB format)
        width: 1  // Set the width of the line
    }
};
export const trackPopUpTemplate = {
    // autocasts as new PopupTemplate()
    title: "Track_Analysis Data",
    content: "<table class='table table-striped'>" +
        "<tr><td>Line</td><td class='popup-cell'>{line}}</td></tr>" +
        "<tr><td>Section Code</td><td class='popup-cell'>{sec_code}</td></tr>" +
        "<tr><td>Railway</td><td class='popup-cell'>{railway}</td></tr>" +
        "<tr><td>Division</td><td class='popup-cell'>{division}</td></tr>" +
        "<tr><td>Section</td><td class='popup-cell'>{tmssection}</td></tr>" +
        "<tr><td>Route</td><td class='popup-cell'>{route}</td></tr>" +
        "</table>",
    fieldInfos: [
        {
            fieldName: "line",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "sec_code",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "railway",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "division",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "section_co",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "route",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
    ]
}
export const operators = [
    { id: 1, label: "greater than", value: ">" },
    { id: 2, label: "less than", value: "<" },
    { id: 3, label: "equal to", value: "=" },
]
export const commonFields = [
    { label: "Railway", value: "railway", type:"string" },
    { label: "Division", value: "division", type:"string" },
    { label: "Route", value: "route", type:"string" },
    { label: "Section", value: "section", type:"string" },
    { label: "Type of Route", value: "routeclass", type:"string" },
]
const railWeldFractureFields = [
    { label: "Fracture Date", value: "date___time_of_fracture", type:"string" },
    { label: "Line Code", value: "line_code", type:"integer" },
]
const gmtDetailsFields = [
    { label: "GMT", value: "gmt", type:"double" },
    {label:"GMT Year", value: "gmt_year", type:"string"}
]
const speedRestrictionFields = [
    { label: "PSR", value: "psr", type:"integer" },
    { label: "Imposition Date", value: "date_of_im", type:"date" },
]
const levelCrossingFields = [
    { label: "Tvu", value: "tvu", type:"double" },
    { label: "Rail Painting Date", value: "rail_painting_date", type:"date" },
]
const trackNetworkFields = [
    { label: "Rail Section", value: "rail_section", type:"string" },
    { label: "Laying Month", value: "laying_month", type:"string" },
    { label: "Section Code", value: "section_code", type:"integer" },
]
const weldFractureReportFields = [
    { label: "Welding Date", value: "date_of_welding", type:"date" },
    { label: "Gap At Time Of Fracture", value: "gap_at_the___time_of_fracture", type:"integer" },
]
export const screenRelatedFields = [
    { label: "RailWeldFractureAnalysis", fields: railWeldFractureFields },
    { label: "GMT Details Event", fields: gmtDetailsFields },
    { label: "PermanentSpeedRestrictions", fields: speedRestrictionFields },
    { label: "LevelCrossing", fields: levelCrossingFields },
    { label: "TrackNetworkDistribution", fields: trackNetworkFields },
    { label: "WeldFractureReport", fields: weldFractureReportFields },
]
export const classifications = [
    {label:"Equal-Interval", value:"equal-interval"},
    {label:"Quantile", value:"quantile"},
    {label:"Natural-Breaks", value:"natural-breaks"},
    {label:"Manual", value:"manual"},
]