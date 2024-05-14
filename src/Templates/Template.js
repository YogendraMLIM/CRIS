
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
// Create ClassBreaksRenderer
 const gmtClassBreaksRenderer = {
    type: "class-breaks",
    field: "gmt",
    classBreakInfos: gmtClassBreaks
};
 const GMTPopupTemplate = {
    // autocasts as new PopupTemplate()
    title: "GMT Details Data",
    content: "<table class='table table-striped'>" +
        "<tr><td>GMT</td><td class='popup-cell'>{gmt}</td></tr>" +
        "<tr><td>GMT Year</td><td class='popup-cell'>{gmt_year}</td></tr>" +
        "<tr><td>Railway</td><td class='popup-cell'>{railway}</td></tr>" +
        "<tr><td>Division</td><td class='popup-cell'>{division}</td></tr>" +
        "<tr><td>Section</td><td class='popup-cell'>{section_n}</td></tr>" +
        "<tr><td>Route</td><td class='popup-cell'>{route}</td></tr>" +
        "</table>",
    fieldInfos: [
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
// Define unique value infos for layer1
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
// Create ClassBreaksRenderer
 const speedclassBreaksRenderer = {
    type: "class-breaks",
    field: "speed",
    classBreakInfos: speedclassBreaks
};
 const speedPopUpTemplate = {
    // autocasts as new PopupTemplate()
    title: "Speed Restriciton Data",
    content: "<table class='table table-striped'>" +
        "<tr><td>Speed</td><td class='popup-cell'>{speed}}</td></tr>" +
        "<tr><td>Reason</td><td class='popup-cell'>{reason_c}</td></tr>" +
        "<tr><td>Railway</td><td class='popup-cell'>{railway}</td></tr>" +
        "<tr><td>Division</td><td class='popup-cell'>{division}</td></tr>" +
        "<tr><td>Section</td><td class='popup-cell'>{section}</td></tr>" +
        "<tr><td>Route</td><td class='popup-cell'>{route}</td></tr>" +
        "</table>",
    fieldInfos: [
        {
            fieldName: "speed",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "reason_c",
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
// Define unique value infos for layer4
 const weldFractureClassBreak = [
    {
        value: "KJT KHPI",
        symbol: {
            type: "simple-marker",
            style: "circle",
            color: "black",
            width: 2 // Adjust the width property instead of size
        }
    },
    {
        value: "KYN WADI",
        symbol: {
            type: "simple-marker",
            style: "circle",
            color: "green",
            width: 2
        }
    },
    {
        value: "CSTM PNVL",
        symbol: {
            type: "simple-marker",
            style: "circle",
            color: "#FFC374",
            width: 2
        }
    },
    {
        value: "CSTM-DLI",
        symbol: {
            type: "simple-marker",
            style: "circle",
            color: "#FC4100",
            width: 2
        }
    },
    {
        value: "DW RATNAGIRI",
        symbol: {
            type: "simple-marker",
            style: "circle",
            color: "#FFC55A",
            width: 2
        }
    },
    {
        value: "PNVL KJT",
        symbol: {
            type: "simple-marker",
            style: "circle",
            color: "2C4E80",
            width: 2
        }
    }
];
// Create UniqueValueRenderer
 const weldFractureClassBreakRenderer = {
    type: "unique-value", // autocasts as new UniqueValueRenderer()
    field: "route",
    uniqueValueInfos: weldFractureClassBreak
};
 const weldFracturePopUpTemplate = {
    // autocasts as new PopupTemplate()
    title: "Weld Fracture Data",
    content: "<table class='table table-striped'>" +
        "<tr><td>Fracture</td><td class='popup-cell'>{fracture_d}}</td></tr>" +
        "<tr><td>Location</td><td class='popup-cell'>{location_o}</td></tr>" +
        "<tr><td>Railway</td><td class='popup-cell'>{railway}</td></tr>" +
        "<tr><td>Division</td><td class='popup-cell'>{division}</td></tr>" +
        "<tr><td>Section</td><td class='popup-cell'>{section}</td></tr>" +
        "<tr><td>Route</td><td class='popup-cell'>{route}</td></tr>" +
        "</table>",
    fieldInfos: [
        {
            fieldName: "fracture_d",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "location_o",
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
};
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
        "<tr><td>KM From</td><td class='popup-cell'>{km_from}}</td></tr>" +
        "<tr><td>KM To</td><td class='popup-cell'>{km_to}</td></tr>" +
        "<tr><td>Length</td><td class='popup-cell'>{lenght}</td></tr>" +
        "<tr><td>Railway</td><td class='popup-cell'>{railway}</td></tr>" +
        "<tr><td>Division</td><td class='popup-cell'>{division}</td></tr>" +
        "<tr><td>Section</td><td class='popup-cell'>{section}</td></tr>" +
        "<tr><td>Route</td><td class='popup-cell'>{route}</td></tr>" +
        "</table>",
    fieldInfos: [
        {
            fieldName: "km_from",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "km_to",
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: "lenght",
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
const permisableSpeedclassBreaks = [
    {
        minValue: 0,
        maxValue: 99,
        symbol: {
            type: "simple-line",
            style: "solid",
            color: "#FF204E",
            width: 2 // Adjust the width property instead of size
        },
        label: "< 100 KMPH"
    },
    {
        minValue: 100,
        maxValue: 110,
        symbol: {
            type: "simple-line",
            style: "solid",
            color: "#A0153E",
            width: 2 // Adjust the width property instead of size
        },
        label: "= 100 - 110 KMPH"
    },
    {
        minValue: 111,
        maxValue: 130,
        symbol: {
            type: "simple-line",
            style: "solid",
            color: "#5D0E41",
            width: 2 // Adjust the width property instead of size
        },
        label: "= 111 - 130 KMPH"
    },
    {
        minValue: 100,
        maxValue: Infinity,
        symbol: {
            type: "simple-line",
            style: "solid",
            color: "#00224D",
            width: 2 // Adjust the width property instead of size
        },
        label: "= 131 - 160 KMPH"
    },
];
const permisableSpeedclassBreaksRenderer = {
    type: "class-breaks",
    field: "speed",
    classBreakInfos: speedclassBreaks
};
export const TrackInsightes = [
    { id: 1, label: "Weld Fracture", value: "Weld Fracture", url: "https://mlinfomap.org/server/rest/services/Weld_Fracture_Analysis/MapServer/0", renderer: weldFractureClassBreakRenderer, popupTemplate: weldFracturePopUpTemplate, field: "route", title: "Weld Fracture", checked: false },
    { id: 2, label: "GMT Details", value: "GMT Details", url: "https://mlinfomap.org/server/rest/services/GMTDetails_Events/MapServer/0", renderer: gmtClassBreaksRenderer, popupTemplate: GMTPopupTemplate, field: "gmt", title: "GMT Details", checked: false },
    { id: 3, label: "Speed Restriction", value: "Speed Restriction", url: "https://mlinfomap.org/server/rest/services/Speed_Restriciton_Events/MapServer/0", renderer: speedclassBreaksRenderer, popupTemplate: speedPopUpTemplate, field: "speed", title: "Speed Restriction", checked: false },
    { id: 4, label: "Level Crossing", value: "Level Crossing", url: "https://mlinfomap.org/server/rest/services/LevelCrossing/MapServer/0", checked: false },
    { id: 5, label: "Track Network Distribution", value: "Track Network Distribution", url: "https://mlinfomap.org/server/rest/services/TrackNetworkDistribution/MapServer/0", checked: false },
    { id: 6, label: "Weld Fracture Report", value: "Weld Fracture Report", url: "https://mlinfomap.org/server/rest/services/WeldFractureReport/MapServer/0", checked: false },
    { id: 7, label: "Permanent Speed Restriction", value: "Permanent Speed Restriction", url: "https://mlinfomap.org/server/rest/services/Rail_Track/MapServer/0", checked: false },
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
]