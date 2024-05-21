import React, { useState, useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';
import './ScreenSplit.css';
import { DateRangePicker } from 'react-dates';
import { Remove_User } from "../../actions";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { alpha, styled } from '@mui/material/styles';
import { blue} from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import $ from 'jquery';
import 'react-toastify/dist/ReactToastify.css';
import 'react-dates/initialize';
import moment from 'moment';
import 'react-dates/lib/css/_datepicker.css';
import { trackPopUpTemplate, Trackanalysisrenderer, TrackInsightes, BridgeInsightes, operationalLayers, operators, commonFields,screenRelatedFields } from '../../Templates/Template';
const [FeatureLayer, MapView, Map, Zoom, ScaleBar, Expand, BasemapGallery, reactiveUtils, Legend, LayerList, typeRendererCreator, Graphic, IdentityManager, geometry, SpatialReference, FeatureTable, Fullscreen, Print,
] = await loadModules(["esri/layers/FeatureLayer", "esri/views/MapView", "esri/Map", "esri/widgets/Zoom", "esri/widgets/ScaleBar",
    "esri/widgets/Expand", "esri/widgets/BasemapGallery", "esri/core/reactiveUtils", "esri/widgets/Legend", "esri/widgets/LayerList", "esri/smartMapping/renderers/type", "esri/Graphic", "esri/identity/IdentityManager", "esri/geometry", "esri/geometry/SpatialReference", "esri/widgets/FeatureTable", "esri/widgets/Fullscreen", "esri/widgets/Print", "esri/renderers/SimpleRenderer",
    "esri/symbols/SimpleFillSymbol"], { css: true });
    const BlueSwitch = styled(Switch)(({ theme }) => ({
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: blue[200],
          '&:hover': {
            backgroundColor: alpha(blue[200], theme.palette.action.hoverOpacity),
          },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: blue[200],
        },
      }));
const ScreenSplit = ({ onLogout }) => {
    const dispatch = useDispatch();
    const handleLogout = async () => {
        dispatch(Remove_User());
        IdentityManager.destroyCredentials();
        window.location.reload();
    };
    let screenId;
    let selectionIdCount = 0;
    let candidate;
    let featureTable;
    let selectedSign = "";
    const API_BASE_URL = "https://mlinfomap.org/cris_datamgmt_api";
    const trackLayer = "https://mlinfomap.org/server/rest/services/Rail_Track/MapServer/0";
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);
    const trackInsightesDropdownRef = useRef(null);
    const bridgeInsightesDropdownRef = useRef(null);
    const zoneDropdownRef = useRef(null);
    const divisionDropdownRef = useRef(null);
    const sectionDropdownRef = useRef(null);
    const routeDropdownRef = useRef(null);
    const [trackInsighteScreenDropdown, setTrackInsighteScreenDropdown] = useState(false);
    const [trackInsighteLayerDropdown, setTrackInsighteLayerDropdown] = useState(false)
    const [trackInsighteFieldDropdown, setTrackInsighteFieldDropdown] = useState(false);
    const [trackInsighteSignDropdown, setTrackInsighteSignDropdown] = useState(false);
    const [trackInsighteValueDropdown, setTrackInsighteValueDropdown] = useState(false);
    const [trackScreenRendererDropdown, setTrackScreenRendererDropdown] = useState(false);
    const [trackLayerRendererDropdown, setTrackLayerRendererDropdown] = useState(false);
    const [trackFieldRendererDropdown, setTrackFieldRendererDropdown] = useState(false);
    const [initialMap, setInitialMap] = useState(false);
    const [draggedItem, setDraggedItem] = useState(null);
    const [trackDropdown, setTrackDropdown] = useState(false);
    const [bridgeDropdown, setBridgeDropdown] = useState(false);
    const [openQueryBuilder, setOpenQueryBuilder] = useState(false);
    const [openStyleBreak, setOpenStyleBreak] = useState(false);
    const [openZoneDivFilter, setOpenZoneDivFilter] = useState(false);
    const [zoneDropDown, setZoneDropDown] = useState(false);
    const [divisionDropDown, setDivisionDropDown] = useState(false);
    const [sectionDropDown, setSectionDropDown] = useState(false);
    const [routeDropDown, setRouteDropDown] = useState(false);
    const [railwayZone, setRailwayZone] = useState([]);
    const [railwayDivision, setRailwayDivision] = useState([]);
    const [railwaySection, setRailwaySection] = useState([]);
    const [railwayRoute, setRailwayRoute] = useState([]);
    const [selectedTrackInsightesScreen, setSelectedTrackInsightesScreen] = useState("");
    const [selectedLayerFromMap, setSelectedLayerFromMap] = useState("");
    const [selectedLayerField, setSelectedLayerField] = useState("");
    const [signSelected, setSignSelected] = useState("");
    const [signLabel, setSignLabel] = useState("");
    const [selectedLayerValue, setSelectedLayerValue] = useState("");
    const [layerFromMap, setLayerFromMap] = useState([]);
    const [displayField, setDisplayField] = useState("");
    const [valueFromLayer, setValueFromLayer] = useState([]);
    const [selectedLayer, setSelectedLayer] = useState(null);
    const [mapObject, setMapObject] = useState([]);
    const [railwayNames, setRailwayNames] = useState(null);
    const [divisionNames, setDivisionNames] = useState(null);
    const [sectionNames, setSectionNames] = useState(null);
    const [routeNames, setRouteNames] = useState(null);
    const [selectedScreenForStyle, setSelectedScreenForStyle] = useState("");
    const [selectedLayerForStyle, setSelectedLayerForStyle] = useState("");
    const [selectedFieldForStyle, setSelectedFieldForStyle] = useState("");
    const [selectedStyleLayer, setSelectedStyleLayer] = useState(null);
    const [layerFromScreenStyle, setLayerFromScreenStyle] = useState([]);
    const [fieldsFromLayerStyle, setFieldsFromLayerStyle] = useState([]);
    const [viewId, setViewId] = useState(null);
    const [map, setMap] = useState(null);
    const [isSyncEnabled, setIsSyncEnabled] = useState(true);
    const watchersRef = useRef([]);
    const [active, setActive] = useState(null);
    const [KMFromSelected, setKMFromSelected] = useState("");
    const [KMToSelected, setKMToSelected] = useState("");
    const [fieldType, setFieldType] = useState("");
    const [trackInsightes, setTrackInsightes] = useState(TrackInsightes);
    const [bridgeInsightes, setBridgeInsightes] = useState(BridgeInsightes);
    const [operator, setOperator] = useState(operators);
    const [commonField, setCommonField] = useState(commonFields);
    const [screens, setScreens] = useState([
        { id: 0, label: "", value: "", url: "" }
    ]);
    const prevScreensRef = useRef(screens);
    const handleDatesChange = ({ startDate, endDate }) => {
        setStartDate(startDate);
        setEndDate(endDate);
    };

    const calculateGrid = (count) => {
        let numRows, numCols;
        if (count <= 9) {
            if (count === 1) {
                numRows = 1;
                numCols = 1;
            } else if (count === 2) {
                numRows = 1;
                numCols = 2;
            } else if (count === 3) {
                numRows = 1;
                numCols = 3;
            } else if (count === 4) {
                numRows = 2;
                numCols = 2;
            } else if (count === 5) {
                numRows = 25;
                numCols = 3;
            } else if (count === 6) {
                numRows = 2;
                numCols = 3;
            } else if (count === 7) {
                numRows = 37;
                numCols = 3;
            } else if (count === 8) {
                numRows = 38;
                numCols = 3;
            } else if (count === 9) {
                numRows = 3;
                numCols = 3;
            }
        }
        return { numRows, numCols };
    };
    const { numRows, numCols } = calculateGrid(screens.length);
    //#region API fetching the Zone, Division, Route and Section
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_BASE_URL + '/getZone');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();
                setRailwayNames(jsonData.data);
            } catch (error) {
                // setError(error);
            } finally {
                // setIsLoading(false);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_BASE_URL + '/getDivision?zone=' + railwayZone.join());
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();
                setDivisionNames(jsonData.data);
            } catch (error) {
                // setError(error);
            } finally {
                // setIsLoading(false);
            }
        };

        fetchData();
    }, [railwayZone]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_BASE_URL + '/getRoute?zone=' + railwayZone.join() + '&division=' + railwayDivision.join());
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();
                setRouteNames(jsonData.data);
            } catch (error) {
                // setError(error);
            } finally {
                // setIsLoading(false);
            }
        };

        fetchData();
    }, [railwayZone, railwayDivision]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_BASE_URL + '/getSection?zone=' + railwayZone.join() + '&division=' + railwayDivision.join() + '&route=' + railwayRoute.join());
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();
                setSectionNames(jsonData.data);
            } catch (error) {
                // setError(error);
            } finally {
                // setIsLoading(false);
            }
        };

        fetchData();
    }, [railwayZone, railwayDivision, railwayRoute]);
    //#endregion
    //#region MapScreens Draggable
    const handleDragStart = (event, index) => {
        setDraggedItem(index);
    };
    const handleDragOver = (event, index) => {
        event.preventDefault();
    };
    const handleDrop = (event, dropIndex) => {
        const updatedScreens = [...screens];
        updatedScreens.splice(dropIndex, 0, updatedScreens.splice(draggedItem, 1)[0]);
        setScreens(updatedScreens);
    };
    //#endregion
    //#region LoadNewMap Screen 
    const handleTrackInsightes = (item) => (event) => {
        const value = item.value;
        screenId = item.id;

        const isChecked = event.target.checked;
        const updatedTrackInsightes = trackInsightes.map((trackInsighte) =>
            trackInsighte.value === value ? { ...trackInsighte, checked: screens.length === 9 ? false : isChecked } : trackInsighte
        );
        let screenObj;
        if (isChecked) {
            if (screens.length < 9) {
                screenObj = {
                    id: screenId,
                    label: item.label,
                    value: item.value,
                    url: item.url,
                    renderer: item.renderer,
                    popupTemplate: item.popupTemplate,
                    field: item.field,
                    title: item.title,
                    checked: isChecked
                };
                if (screens[0].value === "") {
                    screens.splice(0, 1);
                    setScreens([screenObj])
                } else {
                    setScreens(prevScreens => [...prevScreens, screenObj]);
                }
            } else {
                toast.error("You Can't add more thean 9 screen")
            }
        } else {
            if (screens.length === 1) {
                screens[0].id = 0;
                screens[0].value = "";
                screens[0].label = "";
                screens[0].url = "";
                screens[0].checked = false;
                setInitialMap(!initialMap);
            } else {
                setScreens(screens.filter((screen) => screen.value !== value));
                setMapObject(mapObject.filter((mo) => mo.title !== value));
            }
        }
        setTrackInsightes(updatedTrackInsightes);
        esriPopUpUpdateSizes();
    };
    const handleTrackInsightesDropdown = () => {
        setTrackDropdown(!trackDropdown)
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (trackInsightesDropdownRef.current && !trackInsightesDropdownRef.current.contains(event.target)) {
                setTrackDropdown(false);
            }
        };
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);
    const handleBridgeInsightes = (bridgeItem) => (event) => {
        const value = bridgeItem.value;
        screenId = bridgeItem.id;
        const isChecked = event.target.checked;
        const updateBridgeInsightes = bridgeInsightes.map((bridgeInsighte) =>
            bridgeInsighte.value === value ? { ...bridgeInsighte, checked: screens.length === 9 ? false : isChecked } : bridgeInsighte
        );
        let screenObj;
        if (isChecked) {
            if (screens.length < 9) {
                screenObj = {
                    id: screenId,
                    label: bridgeItem.label,
                    value: bridgeItem.value,
                    url: bridgeItem.url,
                    renderer: bridgeItem.renderer,
                    popupTemplate: bridgeItem.popupTemplate,
                    field: bridgeItem.field,
                    title: bridgeItem.title,
                    checked: isChecked
                };
                if (screens[0].value === "") {
                    screens.splice(0, 1);
                    setScreens([screenObj]);
                } else {
                    setScreens(prevScreens => [...prevScreens, screenObj]);
                }
            } else {
                toast.error("You Can't add more thean 9 screen")
            }
        } else {
            if (screens.length === 1) {
                screens[0].id = 0;
                screens[0].value = "";
                screens[0].label = "";
                screens[0].url = "";
                screens[0].checked = false;
                setInitialMap(!initialMap);
            } else {
                setScreens(screens.filter((screen) => screen.value !== value));
                setMapObject(mapObject.filter((mo) => mo.title !== value));
            }
        }
        setBridgeInsightes(updateBridgeInsightes);
        esriPopUpUpdateSizes();
    };
    const handleBridgeInsightesDropdown = () => {
        setBridgeDropdown(!bridgeDropdown);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (bridgeInsightesDropdownRef.current && !bridgeInsightesDropdownRef.current.contains(event.target)) {
                setBridgeDropdown(false);
            }
        };
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);
    const handleCloseMapDiv = (id) => {
        if (id >= 1 && id <= 9) {
            const updatedTrackInsightes = trackInsightes.map((trackIn) => trackIn.id === id ? { ...trackIn, checked: false } : trackIn);
            setTrackInsightes(updatedTrackInsightes);
            if (screens.length === 1) {
                screens[0].id = 0;
                screens[0].label = "";
                screens[0].value = "";
                screens[0].checked = false;
                setInitialMap(!initialMap);
            } else {
                setScreens(screens.filter((screen) => screen.id !== id));
            }
        } else {
            const updatedBridgeInsightes = bridgeInsightes.map((bridgeIn) => bridgeIn.id === id ? { ...bridgeIn, checked: false } : bridgeIn);
            setBridgeInsightes(updatedBridgeInsightes);
            if (screens.length === 1) {
                screens[0].id = 0;
                screens[0].label = "";
                screens[0].value = "";
                screens[0].checked = false;
                setInitialMap(!initialMap);
            } else {
                setScreens(screens.filter((screen) => screen.id !== id));
            }
        };
    };
    useEffect(() => {
        const loadInitialMap = async () => {

            const map = new Map({
                basemap: "gray-vector",
            });
            const initialView = new MapView({
                map: map,
                center: [77.21991492557393, 28.632708300410687],
                zoom: 8,
                container: `viewDiv-0`,
                ui: {
                    components: ["attribution"]
                }
            });
            var trackfeaturelayer = new FeatureLayer({
                url: trackLayer,
                renderer: Trackanalysisrenderer,
                title: "Base Track",
                popupTemplate: trackPopUpTemplate
            });

            await Promise.all([trackfeaturelayer.load()]);
            map.add(trackfeaturelayer);
            const zoom = new Zoom({
                view: initialView
            });
            const fullscreen = new Fullscreen({
                view: initialView
            })
            const scaleBar = new ScaleBar({
                view: initialView
            });
            const legendData = new Legend({
                view: initialView
            });
            const expandLegend = new Expand({
                view: initialView,
                content: legendData
            });
            const basemapGallery = new BasemapGallery({
                view: initialView,
                container: document.createElement("div")
            });
            const bgExpand = new Expand({
                view: initialView,
                content: basemapGallery
            });
            const expandTableWidget = new Expand({
                view: initialView,
                content: document.createElement("div"),
                expandIconClass: "esri-icon-table",
                expandTooltip: "Feature Table",
                collapseTooltip: "Collapse Feature Table"
            });
            const layerList = new LayerList({
                view: initialView
            });
            const expandLayerList = new Expand({
                view: initialView,
                content: layerList
            });
            const print = new Print({
                view: initialView,
                printServiceUrl: "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
            });
            const bgExpandPrint = new Expand({
                view: initialView,
                content: print,
                expandTooltip: "Print Widget",
            });
            const createFeatureTable = () => {
                console.log('Feature Table ', featureTable);
                if (featureTable == null) {
                    featureTable = new FeatureTable({
                        view: initialView,
                        layer: trackfeaturelayer,
                        visibleElements: {
                            menuItems: {
                                clearSelection: true,
                                refreshData: true,
                                toggleColumns: true,
                                selectedRecordsShowAllToggle: true,
                                selectedRecordsShowSelectedToggle: true,
                                zoomToSelection: true
                            }
                        },
                        container: document.getElementById("tableDiv-0")
                    });

                    reactiveUtils.when(
                        () => initialView.stationary,
                        () => {
                            featureTable.filterGeometry = initialView.extent;
                        },
                        { initial: true }
                    );

                    initialView.on("immediate-click", async (event) => {
                        const response = await initialView.hitTest(event);
                        candidate = response.results.find((result) => {
                            return result.graphic && result.graphic.layer && result.graphic.layer === trackfeaturelayer;
                        });
                        if (candidate) {
                            const objectId = candidate.graphic.getObjectId();
                            if (featureTable.highlightIds.includes(objectId)) {
                                featureTable.highlightIds.remove(objectId);
                            } else {
                                featureTable.highlightIds.add(objectId);
                            }
                        }
                    });

                    reactiveUtils.watch(
                        () => featureTable.highlightIds.length,
                        (highlightIdsCount) => {
                            featureTable.viewModel.activeFilters.forEach((filter) => {
                                if (filter.type === "selection") {
                                    selectionIdCount = filter.objectIds.length;
                                    if (selectionIdCount !== highlightIdsCount) {
                                        featureTable.filterBySelection();
                                    }
                                }
                            });
                        }
                    );
                    var container = document.getElementById(`layerContainer-0`);
                    container.style.display = 'block';
                }
                else {
                    var container = document.getElementById('layerContainer-0');
                    container.style.display = 'block';
                }

            }
            // // Function to destroy Feature Table
            function destroyFeatureTable() {
                var container = document.getElementById('layerContainer-0');
                container.style.display = 'none';
                // featureTable.destroy();  
                // featureTable = null;               

            }
            expandTableWidget.watch(["expanded", "collapsed"], (expanded, collapsed) => {
                if (expanded) {
                    createFeatureTable();
                } else if (collapsed) {
                    destroyFeatureTable();
                }
            });
            // Function to close all Expand widgets except the provided one
            function closeOtherExpands(exceptExpand) {
                [expandLegend, expandLayerList, bgExpandPrint, bgExpand, expandTableWidget].forEach(expand => {
                    if (expand !== exceptExpand) {
                        expand.collapse();
                    }
                });
            }
            expandLegend.watch('expanded', () => {
                if (expandLegend.expanded) {
                    closeOtherExpands(expandLegend);
                }
            });
            expandLayerList.watch('expanded', () => {
                if (expandLayerList.expanded) {
                    closeOtherExpands(expandLayerList);
                }
            });
            bgExpandPrint.watch('expanded', () => {
                if (bgExpandPrint.expanded) {
                    closeOtherExpands(bgExpandPrint);
                }
            });
            bgExpand.watch('expanded', () => {
                if (bgExpand.expanded) {
                    closeOtherExpands(bgExpand)
                }
            })
            expandTableWidget.watch('expanded', () => {
                if (expandTableWidget.expanded) {
                    closeOtherExpands(expandTableWidget)
                }
            })
            initialView.ui.add(expandLayerList, "top-right");
            initialView.ui.add(expandLegend, "top-right");
            initialView.ui.add(fullscreen, "top-right");
            initialView.ui.add(expandTableWidget, "top-left");
            initialView.ui.add(bgExpand, "top-left");
            initialView.ui.add(zoom, "bottom-right");
            initialView.ui.add(scaleBar, "bottom-left");
            initialView.extent = trackfeaturelayer.fullExtent;
            await initialView.when();
        };
        loadInitialMap();
        return () => {
        };
    }, [initialMap]);
    const sync = (source) => {
        try {
            if (!active || !active.viewpoint || active !== source) {
                return;
            }

            mapObject.map(mo => mo.newView).forEach((view) => {
                if (isSyncEnabled && view !== active) {
                    view.viewpoint = active.viewpoint;
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const synchronizeMaps = () => {
        try {
            if (mapObject.length > 0) {
                for (const view of mapObject.map(mo => mo.newView)) {
                    const handle = reactiveUtils.watch(
                        () => [view.interacting, view.viewpoint],
                        ([interacting, viewpoint]) => {
                            if (interacting) {
                                setActive(view);
                                sync(view);
                            }
                        }
                    );
                    watchersRef.current.push(handle);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };
    const teardownWatchers = () => {
        watchersRef.current.forEach(handle => handle.remove());
        watchersRef.current = []; 
    };
    const handleSyncUnSyncMap = (e) => {
        let sync = e.target.checked;
        setIsSyncEnabled(sync);
    }
    useEffect(() => {
        if (isSyncEnabled) {
            synchronizeMaps();
        } else {
            teardownWatchers();
        }

        // Clean up on component unmount
        return () => {
            teardownWatchers();
        };
    }, [active, mapObject,isSyncEnabled])
    useEffect(() => {
        const loadMapForNewScreens = async () => {
            const clusterConfig = {
                type: "cluster",
                clusterRadius: "100px",
                // {cluster_count} is an aggregate field containing
                // the number of features comprised by the cluster
                popupTemplate: {
                    title: "Cluster summary",
                    content: "This cluster represents {cluster_count} Weld Fracture.",
                    fieldInfos: [{
                        fieldName: "cluster_count",
                        format: {
                            places: 0,
                            digitSeparator: true
                        }
                    }]
                },
                clusterMinSize: "18px",
                clusterMaxSize: "36px",
                labelingInfo: [{
                    deconflictionStrategy: "none",
                    labelExpressionInfo: {
                        expression: `Text($feature.cluster_count, '#,###')`
                    },
                    symbol: {
                        type: "text",
                        color: "white",
                        font: {
                            weight: "bold",
                            family: "Noto Sans",
                            size: "12px"
                        }
                    },
                    labelPlacement: "center-center",
                }]
            };
            screens.forEach(async (screen) => {
                if (!prevScreensRef.current.some(prevScreen => prevScreen.id === screen.id)) {
                    const map = new Map({
                        basemap: "gray-vector"
                    });
                    const newView = new MapView({
                        map: map,
                        center: [77.21991492557393, 28.632708300410687],
                        zoom: 8,
                        container: `viewDiv-${screen.id}`,
                        ui: {
                            components: ["attribution"]
                        }
                    });
                    var trackfeaturelayer = new FeatureLayer({
                        url: trackLayer,
                        renderer: Trackanalysisrenderer,
                        title: "Base Track",
                        popupTemplate: trackPopUpTemplate
                    });
                    await Promise.all([trackfeaturelayer.load()]);
                    var featurelayer = new FeatureLayer({
                        url: screen.url,
                        title: screen.title,
                        renderer: screen.renderer,
                        popupTemplate: screen.popupTemplate,
                    });
                    esriPopUpUpdateSizes();
                    if (!screen.renderer) {
                        generateRenderer(newView, featurelayer, screen.field)
                    }
                    if (screen.id === 1)
                        featurelayer.featureReduction = clusterConfig;
                    if (screen.id === 6)
                        featurelayer.featureReduction = clusterConfig;
                    await Promise.all([featurelayer.load()]);
                    map.addMany([trackfeaturelayer, featurelayer,]);
                    const zoom = new Zoom({
                        view: newView
                    });
                    const scaleBar = new ScaleBar({
                        view: newView
                    });
                    const legendData = new Legend({
                        view: newView
                    });
                    const expandLegend = new Expand({
                        view: newView,
                        content: legendData,
                        expandTooltip: "Legend",
                    });
                    const basemapGallery = new BasemapGallery({
                        view: newView,
                        container: document.createElement("div")
                    });
                    const bgExpand = new Expand({
                        view: newView,
                        content: basemapGallery,
                        expandTooltip: "BaseMap Gallery",
                    });
                    const layerList = new LayerList({
                        view: newView
                    });
                    const expandLayerList = new Expand({
                        view: newView,
                        content: layerList,
                        expandTooltip: "Layer List",
                    });
                    const expandTableWidget = new Expand({
                        view: newView,
                        content: document.createElement("div"),
                        expandIconClass: "esri-icon-table",
                        expandTooltip: "Feature Table",
                        collapseTooltip: "Collapse Feature Table"
                    });
                    const fullscreen = new Fullscreen({
                        view: newView
                    })
                    const print = new Print({
                        view: newView,
                        printServiceUrl: "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
                    });
                    const bgExpandPrint = new Expand({
                        view: newView,
                        content: print,
                        expandTooltip: "Print Widget",
                    });
                    const createFeatureTable = () => {
                        console.log('Feature Table ', featureTable);
                        if (featureTable == null) {
                            featureTable = new FeatureTable({
                                view: newView,
                                layer: featurelayer,
                                visibleElements: {
                                    menuItems: {
                                        clearSelection: true,
                                        refreshData: true,
                                        toggleColumns: true,
                                        selectedRecordsShowAllToggle: true,
                                        selectedRecordsShowSelectedToggle: true,
                                        zoomToSelection: true
                                    }
                                },
                                container: document.getElementById(`tableDiv-${screen.id}`)
                            });

                            reactiveUtils.when(
                                () => newView.stationary,
                                () => {
                                    featureTable.filterGeometry = newView.extent;
                                },
                                { initial: true }
                            );

                            newView.on("immediate-click", async (event) => {
                                const response = await newView.hitTest(event);
                                candidate = response.results.find((result) => {
                                    return result.graphic && result.graphic.layer && result.graphic.layer === featurelayer;
                                });
                                if (candidate) {
                                    const objectId = candidate.graphic.getObjectId();
                                    if (featureTable.highlightIds.includes(objectId)) {
                                        featureTable.highlightIds.remove(objectId);
                                    } else {
                                        featureTable.highlightIds.add(objectId);
                                    }
                                }
                            });

                            reactiveUtils.watch(
                                () => featureTable.highlightIds.length,
                                (highlightIdsCount) => {
                                    featureTable.viewModel.activeFilters.forEach((filter) => {
                                        if (filter.type === "selection") {
                                            selectionIdCount = filter.objectIds.length;
                                            if (selectionIdCount !== highlightIdsCount) {
                                                featureTable.filterBySelection();
                                            }
                                        }
                                    });
                                }
                            );
                            var container = document.getElementById(`layerContainer-${screen.id}`);
                            container.style.display = 'block';
                        }
                        else {
                            var container = document.getElementById(`layerContainer-${screen.id}`);
                            container.style.display = 'block';
                        }

                    }
                    function destroyFeatureTable() {
                        var container = document.getElementById(`layerContainer-${screen.id}`);
                        container.style.display = 'none';
                    }
                    expandTableWidget.watch(["expanded", "collapsed"], (expanded, collapsed) => {
                        if (expanded) {
                            createFeatureTable();
                        } else if (collapsed) {
                            destroyFeatureTable();
                        }
                    });
                    reactiveUtils.watch(
                        () => basemapGallery.activeBasemap,
                        () => {
                            const mobileSize = newView.heightBreakpoint === "xsmall" || newView.widthBreakpoint === "xsmall";

                            if (mobileSize) {
                                bgExpand.collapse();
                            }
                        }
                    );

                    // Function to close all Expand widgets except the provided one
                    function closeOtherExpands(exceptExpand) {
                        [expandLegend, expandLayerList, bgExpandPrint, bgExpand, expandTableWidget].forEach(expand => {
                            if (expand !== exceptExpand) {
                                expand.collapse();
                            }
                        });
                    }
                    expandLegend.watch('expanded', () => {
                        if (expandLegend.expanded) {
                            closeOtherExpands(expandLegend);
                        }
                    });

                    expandLayerList.watch('expanded', () => {
                        if (expandLayerList.expanded) {
                            closeOtherExpands(expandLayerList);
                        }
                    });

                    bgExpandPrint.watch('expanded', () => {
                        if (bgExpandPrint.expanded) {
                            closeOtherExpands(bgExpandPrint);
                        }
                    });
                    bgExpand.watch('expanded', () => {
                        if (bgExpand.expanded) {
                            closeOtherExpands(bgExpand)
                        }
                    })
                    expandTableWidget.watch('expanded', () => {
                        if (expandTableWidget.expanded) {
                            closeOtherExpands(expandTableWidget)
                        }
                    })
                    window.addEventListener('click', (event) => {
                        const isOutsideClick = ![expandLegend, expandLayerList, bgExpandPrint, bgExpand, expandTableWidget].some(expand => {
                            return expand.container.contains(event.target);
                        });

                        if (isOutsideClick) {
                            closeOtherExpands(null);
                        }
                    });
                    newView.extent = featurelayer.fullExtent;
                    newView.ui.add(expandLayerList, "top-right")
                    newView.ui.add(expandLegend, "top-right");
                    newView.ui.add(fullscreen, "top-left");
                    newView.ui.add(bgExpandPrint, "top-right");
                    newView.ui.add(expandTableWidget, "top-left");
                    newView.ui.add(bgExpand, "top-left");
                    newView.ui.add(zoom, "bottom-right");
                    newView.ui.add(scaleBar, "bottom-left");
                    await newView.when();
                    let id = screen.id;
                    let title = screen.title;
                    let newMapObj = { id, title, newView, checked: true };
                    setMapObject(prevMapObj => [...prevMapObj, newMapObj]);
                }
            });
            prevScreensRef.current = screens;
        };
        loadMapForNewScreens();
    }, [screens, mapObject]);
    //#endregion
    //#region Filter Zone Division Route Section KM_Post Date 
    // Function to get the financial year (yyyy-yy) for a given date
    const getFinancialYear = (date) => {
        const year = date.getMonth() >= 3 ? date.getFullYear() : date.getFullYear() - 1;
        const nextYear = year + 1;
        return `${year}-${nextYear.toString().substring(2)}`;
    }
    // Generate financial years within the range
    const generateFinancialYears = (DateFrom, DateTo) => {
        const result = [];

        // Determine the financial year for the start and end dates
        const startYear = DateFrom.getMonth() >= 3 ? DateFrom.getFullYear() : DateFrom.getFullYear() - 1;
        const endYear = DateTo.getMonth() >= 3 ? DateTo.getFullYear() : DateTo.getFullYear() - 1;

        // Loop through the range of years
        for (let year = startYear; year <= endYear; year++) {
            result.push(getFinancialYear(new Date(year, 3, 1))); // Assuming financial year starts from April
        }

        return result;
    };
    const formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');
    }
    const getDateFilterQuery = (filterLayer) => {
        //GET DATE FILTER QUERY BY LAYER TITLE AND DATE SELECTED
        let DateQuery = "";
        //start end date selected
        if (!startDate || !endDate) {
            return DateQuery;
        }
        let opLyrDetails = operationalLayers.filter(opLyr => opLyr.name == filterLayer.title)[0]
        if (opLyrDetails.DateType == "Date") {// DATE BETWEEN START AND END
            DateQuery = opLyrDetails.DateField + " BETWEEN Date '" + startDate.format("YYYY-MM-DD") + "' AND Date '" + endDate.format("YYYY-MM-DD") + "'";
        } else {// DATE IN (FINANCIAL YEAR)
            // Output the financial years within the range
            const financialYears = generateFinancialYears(startDate._d, endDate._d);
            console.log(financialYears);
            DateQuery = opLyrDetails.DateField + " IN  ('" + financialYears.join("','") + "')"
        }
        return DateQuery
    }
    useEffect(() => {
        let railwayQuery = "";
        let divisionQuery = "";
        let sectionQuery = "";
        let routeQuery = "";
        let kmpostQuery = ""
        let finalQuery = "";
        if (railwayNames && railwayNames.filter(sc => sc.isSelected === true).length > 0) {
            railwayQuery = "railway in ('" + railwayNames.filter(sc => sc.isSelected === true).map(sc => sc.value).join("','") + "')";
        }
        if (divisionNames && divisionNames.filter(sc => sc.isSelected === true).length > 0) {
            divisionQuery = "division in ('" + divisionNames.filter(sc => sc.isSelected === true).map(sc => sc.value).join("','") + "')";
        }
        if (sectionNames && sectionNames.filter(sc => sc.isSelected === true).length > 0) {
            sectionQuery = "section in ('" + sectionNames.filter(sc => sc.isSelected === true).map(sc => sc.value).join("','") + "')";
        }
        if (routeNames && routeNames.filter(sc => sc.isSelected === true).length > 0) {
            routeQuery = "route in ('" + routeNames.filter(sc => sc.isSelected === true).map(sc => sc.value).join("','") + "') ";
        }
        if (KMFromSelected && KMToSelected) {
            kmpostQuery = " km_from >  " + KMFromSelected + " and km_to < " + KMToSelected;
        }
        for (const screen of mapObject) {
            debugger
            let filterLayer = screen.newView.map.allLayers.items.filter(ly => operationalLayers.map(olyr => olyr.name).includes(ly.title))
            console.log(finalQuery);
            if (filterLayer.length > 0) {
                let dateQuery = getDateFilterQuery(filterLayer[0])
                finalQuery = [railwayQuery, divisionQuery, sectionQuery, routeQuery, kmpostQuery, dateQuery].filter(Boolean).join(" AND ");
                if (!finalQuery)
                    finalQuery = "1=1";
                // Update definitionExpression in each item of mapObject
                if (filterLayer.length > 0) filterLayer[0].definitionExpression = finalQuery;
            }
        }
    }, [mapObject, sectionNames, routeNames, railwayNames, divisionNames, KMFromSelected, KMToSelected, startDate, endDate]);
    const handleFilterZoneDivSecRoute = () => {
        setOpenZoneDivFilter(!openZoneDivFilter);
        setOpenQueryBuilder(false);
        setOpenStyleBreak(false);
    };
    const handleZoneDivSecRouteClose = () => {
        setOpenZoneDivFilter(false);
    };
    const handleResetFilterZoneDivRoute = () => {
        setRailwayZone([]);
        setRailwayDivision([]);
        setRailwaySection([]);
        setRailwayRoute([]);
        setStartDate(null);
        setEndDate(null);
        setKMFromSelected("");
        setKMToSelected("");
        for (const screen of mapObject) {
            let filterLayer = screen.newView.map.allLayers.items.filter(ly => operationalLayers.map(olyr => olyr.name).includes(ly.title))
            if (filterLayer.length > 0) filterLayer[0].definitionExpression = "1=1";
            screen.newView.zoom = 8;
        }
    };
    const handleKMFromChange = (e) => {
        let selectedKMFrom = e.target.value;
        setKMFromSelected(selectedKMFrom);
    }
    const handleKMToChange = (e) => {
        let selectedKMTo = e.target.value;
        setKMToSelected(selectedKMTo);
    }
    //#endregion
    //#region Handle Zone Select 
    const handleZoneDropDown = () => {
        setZoneDropDown(!zoneDropDown)
    };
    const handleRailZoneSelect = (item) => {
        const value = item.value;
        if (railwayZone.includes(value)) {
            let filteredZone = railwayZone.filter((zone) => zone !== value);
            setRailwayZone(filteredZone);
            let updatedRailwaysName = railwayNames.map((railwayname) => railwayname.value === value ? { ...railwayname, isSelected: false } : railwayname);
            setRailwayNames(updatedRailwaysName);
        } else {
            setRailwayZone([...railwayZone, value]);
            let updatedRailwaysName = railwayNames.map((railwayname) => railwayname.value === value ? { ...railwayname, isSelected: true } : railwayname);
            setRailwayNames(updatedRailwaysName)
        }
        setZoneDropDown(!zoneDropDown)
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (zoneDropdownRef.current && !zoneDropdownRef.current.contains(event.target)) {
                setZoneDropDown(false);
            };
        }
        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside)
        }
    }, []);
    //#endregion
    //#region Handle Division Select 
    const handleDiviDropDown = () => {
        setDivisionDropDown(!divisionDropDown);
    };
    const handleDivisionSelect = (item) => {
        const value = item.value;
        if (railwayDivision.includes(value)) {
            let filteredDivision = railwayDivision.filter((raildiv) => raildiv !== value);
            setRailwayDivision(filteredDivision);
            let updatedDivisionNames = divisionNames.map((divisionname) => divisionname.value === value ? { ...divisionname, isSelected: false } : divisionname);
            setDivisionNames(updatedDivisionNames);
        } else {
            setRailwayDivision([...railwayDivision, value]);
            let updatedRDivisionNames = divisionNames.map((divisionname) => divisionname.value === value ? { ...divisionname, isSelected: true } : divisionname);
            setDivisionNames(updatedRDivisionNames)
        }
        setDivisionDropDown(!divisionDropDown);
    };
    useEffect(() => {
        const handleClickeOutSide = (event) => {
            if (divisionDropdownRef.current && !divisionDropdownRef.current.contains(event.target)) {
                setDivisionDropDown(false);
            };
        };
        window.addEventListener("click", handleClickeOutSide);
        return () => {
            window.removeEventListener("click", handleClickeOutSide);
        }
    }, []);
    //#endregion
    //#region Handle Section Select 
    const handleSectionDropDown = () => {
        setSectionDropDown(!sectionDropDown);
    };
    const handleSectionSelect = (item) => {
        const value = item.value;
        if (railwaySection.includes(value)) {
            let filteredSection = railwaySection.filter((railSec) => railSec !== value);
            setRailwaySection(filteredSection);
            let updatedSectionNames = sectionNames.map((secname) => secname.value === value ? { ...secname, isSelected: false } : secname);
            setSectionNames(updatedSectionNames);
        } else {
            setRailwaySection([...railwaySection, value]);
            let updatedSectionNames = sectionNames.map((secname) => secname.value === value ? { ...secname, isSelected: true } : secname);
            setSectionNames(updatedSectionNames)
        }
        setSectionDropDown(!sectionDropDown);
    };
    useEffect(() => {
        const handleClickOutSide = (event) => {
            if (sectionDropdownRef.current && !sectionDropdownRef.current.contains(event.target)) {
                setSectionDropDown(false);
            };
        };
        window.addEventListener("click", handleClickOutSide);
        return () => {
            window.removeEventListener("click", handleClickOutSide);
        };
    }, []);
    //#endregion
    //#region Handle Route Select 
    const handleRouteDropDown = () => {
        setRouteDropDown(!routeDropDown);
    };
    const handleRouteSelect = (item) => {
        const value = item.value;
        if (railwayRoute.includes(value)) {
            let filteredRoute = railwayRoute.filter((railRout) => railRout !== value);
            setRailwayRoute(filteredRoute);
            let updatedRouteNames = routeNames.map((routname) => routname.value === value ? { ...routname, isSelected: false } : routname);
            setRouteNames(updatedRouteNames);
        } else {
            setRailwayRoute([...railwayRoute, value]);
            let updatedRouteNames = routeNames.map((routname) => routname.value === value ? { ...routname, isSelected: true } : routname);
            setRouteNames(updatedRouteNames);
        }
        setRouteDropDown(!routeDropDown);
    };
    useEffect(() => {
        const handleClickeOutSide = (event) => {
            if (routeDropdownRef.current && !routeDropdownRef.current.contains(event.target)) {
                setRouteDropDown(false);
            };
        };
        window.addEventListener("click", handleClickeOutSide);
        return () => {
            window.removeEventListener("click", handleClickeOutSide);
        }
    }, []);
    //#endregion
    //#region QueryBuilder start
    const handleQueryBuilderDropdown = () => {
        setOpenQueryBuilder(!openQueryBuilder);
        setOpenZoneDivFilter(false);
        setOpenStyleBreak(false)
    };
    const handleQueryBuilderClose = () => {
        setOpenQueryBuilder(false);
    };
    const handleTrackScreenDropdown = () => {
        setTrackInsighteScreenDropdown(!trackInsighteScreenDropdown)
        setTrackInsighteLayerDropdown(false);
        setTrackInsighteFieldDropdown(false);
        setTrackInsighteSignDropdown(false);
        setTrackInsighteValueDropdown(false);
    }
    const updateCommonField = (layerTitle) => {
        const matchedField = screenRelatedFields.find(srf => srf.label === layerTitle);
        if (matchedField) {
            const updatedCommonFields = [
                ...commonFields,
                ...matchedField.fields
            ];
            return updatedCommonFields;
        }
        return commonFields;
    };
    const handleTrackInsighteScreenSelect = async (title) => {
        let selectedTrackScreen = title;
        if (!selectedTrackScreen) return;
        setSelectedTrackInsightesScreen(selectedTrackScreen);
        let filteredScreen = screens.filter((screen) => screen.label === selectedTrackScreen);
        setLayerFromMap([]);
        setSelectedLayerFromMap("");
        setSelectedLayerField("");
        setSignSelected("");
        setSelectedLayerValue("");
        const layer = new FeatureLayer({
            url: filteredScreen[0].url
        });
        setSelectedLayer(layer)
        console.log(`Title of layer : ${layer.title}`)
        let newCommonFields = updateCommonField(layer.title);
        setCommonField(newCommonFields);
        setLayerFromMap(prevLayer => [...prevLayer, layer.title]);
        setTrackInsighteScreenDropdown(false)
    };
    const handleLayerSelectDropdown = () => {
        setTrackInsighteLayerDropdown(!trackInsighteLayerDropdown);
        setTrackInsighteScreenDropdown(false)
        setTrackInsighteFieldDropdown(false);
        setTrackInsighteSignDropdown(false);
        setTrackInsighteValueDropdown(false);
    }
    const handleLayerSelectFromMap = async (layer) => {
        let selLayer = layer;
        setSelectedLayerFromMap(selLayer);
        // setFieldsFromLayer([]);
        await Promise.all([selectedLayer.load()]);
        // if (selectedLayer) {
        //     selectedLayer.fields.forEach((field) => {
        //         setFieldsFromLayer(prevFieldName => [...prevFieldName, field.name]);
        //     });
        // }
        setTrackInsighteLayerDropdown(false)
    };
    const handleFieldSelectDropdown = () => {
        setTrackInsighteFieldDropdown(!trackInsighteFieldDropdown);
        setTrackInsighteLayerDropdown(false);
        setTrackInsighteScreenDropdown(false)
        setTrackInsighteSignDropdown(false);
        setTrackInsighteValueDropdown(false);
    };
    const handleSelectFieldFromLayer = async (field) => {
        let selectedField = field;
        setSelectedLayerField(selectedField);
        let filterField = commonField.filter(c => c.value === field);
        setDisplayField(filterField[0].label);
        await Promise.all([selectedLayer.load()]);
        if (selectedLayer) {
            let query = selectedLayer.createQuery();
            query.where = "loc_error='NO ERROR'"
            query.outFields = [selectedField];
            try {
                setValueFromLayer([]);
                setSelectedLayerValue("");
                const result = await selectedLayer.queryFeatures(query);
                let type = result.fields[1].type;
                if (type === "string") {
                    let filteredOperator = operator.filter(o => o.label === "equal to");
                    setOperator(filteredOperator);
                } else {
                    setOperator(operators)
                }
                setFieldType(type);
                const uniqueValues = new Set();
                result.features.forEach((feature) => {
                    const attributeValue = feature.attributes[selectedField];
                    if (attributeValue) {
                        uniqueValues.add(attributeValue);
                    }
                });
                const sortedValues = [...uniqueValues].sort();
                const comparator = (a, b) => {
                    if (typeof a === 'number' && typeof b === 'number') {
                        return a - b; // Sort numbers in ascending order
                    } else if (typeof a === 'string' && typeof b === 'string') {
                        return a.localeCompare(b); // Sort strings alphabetically
                    } else if (isDate(a) && isDate(b)) {
                        return new Date(a) - new Date(b); // Sort dates
                    } else {
                        // Handle other types (fallback to string comparison)
                        return String(a).localeCompare(String(b));
                    }
                };
                const isDate = (value) => {
                    return (new Date(value) !== "Invalid Date" && !isNaN(new Date(value)));
                };
                sortedValues.sort(comparator);
                setValueFromLayer(sortedValues);
            } catch (error) {
                console.error('Error querying features:', error);
            }
        }
        setTrackInsighteFieldDropdown(false);
    };
    const handleSignSelectDropdown = () => {
        setTrackInsighteSignDropdown(!trackInsighteSignDropdown);
        setTrackInsighteFieldDropdown(false);
        setTrackInsighteLayerDropdown(false);
        setTrackInsighteScreenDropdown(false)
        setTrackInsighteValueDropdown(false);
    };
    const handleSelectSign = (sign) => {
        setSignSelected(sign);
        let selSign = operator.filter(o => o.value === sign);
        selectedSign = selSign[0].label;
        setSignLabel(selectedSign)
        setTrackInsighteSignDropdown(false)
    }
    const handleValueSelectDropdown = () => {
        setTrackInsighteValueDropdown(!trackInsighteValueDropdown);
        setTrackInsighteSignDropdown(false);
        setTrackInsighteFieldDropdown(false);
        setTrackInsighteLayerDropdown(false);
        setTrackInsighteScreenDropdown(false)
    }
    const handleSelectValue = (val) => {
        setSelectedLayerValue(val);
        setTrackInsighteValueDropdown(false)
    }
    const handleQueryData = async () => {
        let filteredScreen = screens.filter((screen) => screen.label === selectedTrackInsightesScreen);
        if (!selectedLayer) {
            return toast.error("Please Select the Screen and Layer");
        }
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
            } else {
                toast("No Features Found");
            }

        } catch (error) {
            console.log(`Error while querrying features : ${error}`);
        }
    }
    const handleResetQueryData = () => {
        setSelectedTrackInsightesScreen("");
        setSelectedLayerFromMap("");
        setSelectedLayerField("");
        setSignSelected("");
        setSelectedLayerValue("");
        setSelectedLayer(null);
        setLayerFromMap([]);
        // setFieldsFromLayer([]);
        setDisplayField("");
        setValueFromLayer([]);
        mapObject.forEach((screen) => {
            screen.newView.graphics.removeAll();
            screen.newView.zoom = 8;
        });

    };
    //#endregion
    //#region Style Break class
    const handleStyleBreak = () => {
        setOpenStyleBreak(!openStyleBreak);
        setOpenQueryBuilder(false);
        setOpenZoneDivFilter(false);
    };
    const handleStyleBreakClose = () => {
        setOpenStyleBreak(false);
    };
    const handleRendererScreenDropdown = () => {
        setTrackScreenRendererDropdown(!trackScreenRendererDropdown);
        setTrackLayerRendererDropdown(false);
        setTrackFieldRendererDropdown(false);
    }
    const handleSelectedScreenForStyle = async (title) => {
        let selectedStyleScreen = title;
        if (!selectedStyleScreen) return;
        console.log(`This is the selected screen : ${selectedStyleScreen}`)
        setSelectedScreenForStyle(selectedStyleScreen);
        let filteredScreen = screens.filter((screen) => screen.label === selectedStyleScreen);
        let id = (filteredScreen[0].id);
        setViewId(id);
        setLayerFromScreenStyle([]);
        setSelectedLayerForStyle("");
        setSelectedFieldForStyle("");
        const layer = new FeatureLayer({
            url: filteredScreen[0].url
        });
        await Promise.all([layer.load()]);
        if (selectedStyleLayer && map?.layers?.includes(selectedStyleLayer)) {
            map.remove(selectedStyleLayer);
        }
        setSelectedStyleLayer(layer)
        setLayerFromScreenStyle(prevLayer => [...prevLayer, layer.title.replace("Cris.gis admin.", "")]);
        setTrackScreenRendererDropdown(false);
    };
    const handleRendererLayerDropdown = () => {
        setTrackLayerRendererDropdown(!trackLayerRendererDropdown);
        setTrackFieldRendererDropdown(false);
        setTrackScreenRendererDropdown(false);
    }
    const handleSelectedLayerForStyle = async (layer) => {
        let selectedLayer = layer;
        setSelectedLayerForStyle(selectedLayer);
        setFieldsFromLayerStyle([]);
        setSelectedFieldForStyle("");
        await Promise.all([selectedStyleLayer.load()]);
        if (selectedStyleLayer) {
            selectedStyleLayer.fields.forEach((field) => {
                setFieldsFromLayerStyle(prevFieldName => [...prevFieldName, field.name]);
            });
        }
        setTrackLayerRendererDropdown(false)
    };
    const handleFieldRendererDropdown = () => {
        setTrackFieldRendererDropdown(!trackFieldRendererDropdown);
        setTrackScreenRendererDropdown(false);
        setTrackLayerRendererDropdown(false);
    }
    const handleSelectFieldForStyle = async (field) => {
        let selectedField = field;
        setSelectedFieldForStyle(selectedField);
        const filteredMapView = mapObject.filter(mo => mo.id === viewId);
        let view = filteredMapView[0].newView;
        let map = view.map;
        setMap(map);
        // Generate the renderer when the view becomes ready
        reactiveUtils.whenOnce(() => !view.updating).then(async () => {
            selectedStyleLayer.renderer = null;
            const typeParams = {
                layer: selectedStyleLayer, //Layer
                view: view,
                field: selectedField, // Field Name 
                legendOptions: {
                    title: `${selectedField}`
                }
            };
            typeRendererCreator
                .createRenderer(typeParams)
                .then((response) => {
                    selectedStyleLayer.renderer = response.renderer;
                    if (!map.layers.includes(selectedStyleLayer)) {
                        map.add(selectedStyleLayer);
                    }
                })
                .catch((error) => {
                    console.error("there was an error: ", error);
                });
        });
        setTrackFieldRendererDropdown(false)
    };
    const handleRemoveStyleFromLayer = () => {
        setSelectedScreenForStyle("");
        setSelectedLayerForStyle("");
        setSelectedFieldForStyle("");
        setLayerFromScreenStyle([]);
        setFieldsFromLayerStyle([]);
        setSelectedStyleLayer(null);
        if (selectedStyleLayer && map.layers && map.layers.includes(selectedStyleLayer)) {
            map.remove(selectedStyleLayer);
        }
    }
    //#endregion
    const generateRenderer = async (view, layer, field) => {

        await Promise.all([layer.load()]);
        const typeParams = {
            layer: layer, //Layer
            view: view,
            field: field, // Field Name 
            legendOptions: {
                title: `${field}`
            }
        };
        typeRendererCreator
            .createRenderer(typeParams)
            .then((response) => {
                layer.renderer = response.renderer;
            })
            .catch((error) => {
                console.error("there was an error: ", error);
            });
    };
    //Hideing the Custome Filter
    useEffect(() => {
        let mapScreen = document.getElementsByClassName("splitScreen-Mainscreen");
        let header = document.getElementsByClassName("splitScreen-Header-Two-ScreenDivision");
        let headerOne = document.getElementsByClassName("splitScreen-Header-One");
        const handleClickeOutSide = () => {
            setOpenQueryBuilder(false);
            setOpenStyleBreak(false);
            setOpenZoneDivFilter(false);
            setTrackInsighteValueDropdown(false);
            setTrackInsighteSignDropdown(false);
            setTrackInsighteFieldDropdown(false);
            setTrackInsighteLayerDropdown(false);
            setTrackInsighteScreenDropdown(false);
            setOpenStyleBreak(false);
            setOpenQueryBuilder(false);
            setOpenZoneDivFilter(false);
        };
        Array.from(mapScreen).forEach(element => {
            element.addEventListener("click", handleClickeOutSide);
        });
        Array.from(header).forEach(element => {
            element.addEventListener("click", handleClickeOutSide)
        })
        Array.from(headerOne).forEach(element => {
            element.addEventListener("click", handleClickeOutSide)
        })
        return () => {
            Array.from(mapScreen).forEach(element => {
                element.removeEventListener("click", handleClickeOutSide);
            });
            Array.from(header).forEach(element => {
                element.removeEventListener("click", handleClickeOutSide);
            });
            Array.from(headerOne).forEach(element => {
                element.removeEventListener("click", handleClickeOutSide);
            });
        }
    }, []);
    const esriPopUpUpdateSizes = () => {
        let mapdivHeight = document.getElementsByClassName("mapView-div")[0].offsetHeight;
        if (mapdivHeight < 435) {
            $('.esri-popup__content').css('height', '75px');
        } else {
            $('.esri-popup__content').css('height', '289px');
        }
    };
    return (
        <div className="splitScreen-Container">
            <div className="splitScreen-Row">
                <div className="splitScreen-RowOne">
                    <div className="splitScreen-Header">
                        <div className="splitScreen-Header-One">
                            <div className="splitScreen-Header-One-TagImage">
                                <img className="imgTagName" src="/cris/images/crisTag.png" alt="CrisTag.png" />
                            </div>
                            <div className="splitScreen-Header-One-TagName">
                                <h3>Track Analysis Dashboard</h3>
                            </div>
                        </div>
                        <div className="splitScreen-Header-Two">
                            <div className="splitScreen-Header-Two-ScreenDivision">
                                <div className="trackdropDown" ref={trackInsightesDropdownRef}>
                                    <button
                                        className='btndropTrackBridge'
                                        id="btnDropDown"
                                        onClick={handleTrackInsightesDropdown}
                                    >
                                        <span>Track Insightes</span>
                                        <svg width="30px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                            <g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#015cb2" /> </g>
                                        </svg>
                                    </button>
                                    {
                                        trackDropdown &&
                                        <div className="trackDropDownContent">
                                            {
                                                trackInsightes && trackInsightes.map((item, index) => (
                                                    <label
                                                        key={index}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            value={item.value}
                                                            onChange={handleTrackInsightes(item)}
                                                            checked={screens.length <= 9 ? item.checked : false}
                                                            style={{ marginRight: "8px" }}
                                                        />
                                                        {item.label}
                                                    </label>
                                                ))
                                            }
                                        </div>
                                    }
                                </div>
                                <div className="bridgeDropDown" ref={bridgeInsightesDropdownRef}>
                                    <button
                                        className='btndropTrackBridge'
                                        id="btnDropDown"
                                        onClick={handleBridgeInsightesDropdown}
                                    >
                                        <span>Bridge Insightes</span>
                                        <svg width="30px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                            <g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#015cb2" /> </g>
                                        </svg>
                                    </button>
                                    {
                                        bridgeDropdown &&
                                        <div className="bridgeDropDownContent">
                                            {
                                                bridgeInsightes && bridgeInsightes.map((bridgeItem, index) => (
                                                    <label
                                                        key={index}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            value={bridgeItem.value}
                                                            onChange={handleBridgeInsightes(bridgeItem)}
                                                            checked={screens.length <= 9 ? bridgeItem.checked : false}
                                                            style={{ marginRight: "8px" }}
                                                        />
                                                        {bridgeItem.label}
                                                    </label>
                                                ))
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="splitScreen-Header-Two-FilterDropdown">
                            <BlueSwitch 
                            title='Map Sync/UnSync'
                            checked={isSyncEnabled}
                            onChange={handleSyncUnSyncMap} 
                            color="warning"
                            className='mapSyncSwitcher'
                            />
                                <img className='filterIcon' title='Query Builder' style={{ filter: "invert(100%)", color: "white" }} src='/cris/images/querys.png' alt='query.png' onClick={handleQueryBuilderDropdown} />
                                {
                                    openQueryBuilder &&
                                    <div className="queryBuilderDropdown">
                                        <div className="queryBuilderDropdown-Header">
                                            <h3>Query Builder</h3><span onClick={handleQueryBuilderClose}>X</span>
                                        </div>
                                        <div className="queryBuilderDropdown-Content">
                                            <div className="queryBuilderDropdown-Content-Track">
                                                <span>TrackInsightes :</span>
                                                <div className="selectDiv">
                                                    <button onClick={handleTrackScreenDropdown} className='selectedDivButton'>{selectedTrackInsightesScreen !== "" ? selectedTrackInsightesScreen : "selecte Screen"}</button>
                                                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000" />
                                                    </svg>
                                                </div>
                                                {
                                                    trackInsighteScreenDropdown &&
                                                    <div className="selectDivOption">
                                                        {
                                                            screens && screens.map((screen) => (
                                                                <span key={screen.value} value={screen.value} onClick={() => handleTrackInsighteScreenSelect(screen.title)}>{screen.label}</span>
                                                            ))
                                                        }

                                                    </div>
                                                }
                                            </div>
                                            <div className="queryBuilderDropdown-Content-Track">
                                                <span>Select Layer :</span>
                                                <div className="selectDiv">
                                                    <button onClick={handleLayerSelectDropdown} className='selectedDivButton'>{selectedLayerFromMap !== "" ? selectedLayerFromMap : "selecte Layer"}</button>
                                                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000" />
                                                    </svg>
                                                </div>
                                                {
                                                    trackInsighteLayerDropdown &&
                                                    <div className="selectDivOption top1">
                                                        {
                                                            layerFromMap && layerFromMap.map((layer, index) => (
                                                                <span key={index} onClick={() => handleLayerSelectFromMap(layer)}>{layer}</span>
                                                            ))
                                                        }

                                                    </div>
                                                }
                                            </div>
                                            <div className="queryBuilderDropdown-Content-Track">
                                                <span>Select Field :</span>
                                                <div className="selectDiv">
                                                    <button onClick={handleFieldSelectDropdown} className='selectedDivButton'>{selectedLayerField !== "" ? displayField : "selecte Field"}</button>
                                                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000" />
                                                    </svg>
                                                </div>
                                                {
                                                    trackInsighteFieldDropdown &&
                                                    <div className="selectDivOption top2">
                                                        {
                                                            commonField && commonField.map((field, index) => (
                                                                <span key={index} onClick={() => handleSelectFieldFromLayer(field.value)}>{field.label}</span>
                                                            ))
                                                        }
                                                    </div>
                                                }
                                            </div>
                                            <div className="queryBuilderDropdown-Content-Track">
                                                <span>Select Operator :</span>
                                                <div className="selectDiv">
                                                    <button onClick={handleSignSelectDropdown} className='selectedDivButton'>{signSelected === "" ? "select Operator" : signLabel}</button>
                                                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000" />
                                                    </svg>
                                                </div>
                                                {
                                                    trackInsighteSignDropdown &&
                                                    <div className="selectDivOption top3">
                                                        {
                                                            operator && operator.map((sign) => (
                                                                <span key={sign.id} onClick={() => handleSelectSign(sign.value)}>{sign.label}</span>
                                                            ))
                                                        }
                                                    </div>
                                                }
                                            </div>
                                            <div className="queryBuilderDropdown-Content-Track">
                                                <span>Select Value :</span>
                                                <div className="selectDiv">
                                                    <button onClick={handleValueSelectDropdown} className='selectedDivButton'>{selectedLayerValue === "" ? "select Value" : `${fieldType === "date" ? `${formatDate(parseInt(selectedLayerValue))}` : selectedLayerValue}`}</button>
                                                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000" />
                                                    </svg>
                                                </div>
                                                {
                                                    trackInsighteValueDropdown &&
                                                    <div className="selectDivOption top4">
                                                        {
                                                            valueFromLayer && valueFromLayer.map((val, index) => (
                                                                <span key={index} onClick={() => handleSelectValue(val)}>{
                                                                    fieldType === "date" ? (
                                                                        <>
                                                                            {formatDate(parseInt(val))}
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            {val}
                                                                        </>
                                                                    )
                                                                }</span>
                                                            ))
                                                        }
                                                    </div>
                                                }
                                            </div>
                                            <div className="queryBuilderDropdown-Content-button">
                                                <button className='btnQuery' onClick={handleQueryData}>Query Data</button>
                                                <button className='btnQuery' onClick={handleResetQueryData}>Reset</button>
                                            </div>

                                        </div>
                                    </div>
                                }
                                <img className='filterIcon' title='Custome Filter' src="/cris/images/filter.png" alt="filter.png" onClick={handleFilterZoneDivSecRoute} />
                                {
                                    openZoneDivFilter &&
                                    <div className="filterZoneDivSecRoute">
                                        <div className="filterZonedivSecRoute-Header">
                                            <h3>Custome Filter </h3><span onClick={handleZoneDivSecRouteClose}>X</span>
                                        </div>
                                        <div className="filterZoneDivSecRoute-Content">
                                            <div className="dropdown">
                                                <span>Zone :</span>
                                                <div className="multiSelect" ref={zoneDropdownRef} >
                                                    <button onClick={handleZoneDropDown}>
                                                        <div className='selectedOption'>
                                                            {
                                                                railwayZone.length > 0 ? (
                                                                    <>
                                                                        {
                                                                            railwayZone.map((railIn, index) => (
                                                                                <span
                                                                                    key={index}
                                                                                    className='spanBtn'
                                                                                >{railIn}
                                                                                </span>
                                                                            ))
                                                                        }
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <span>All</span>
                                                                    </>
                                                                )
                                                            }
                                                        </div>
                                                        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000" />
                                                        </svg>
                                                    </button>
                                                    {
                                                        zoneDropDown &&
                                                        <div className="multiOptions">
                                                            {
                                                                railwayNames && railwayNames.map((item, index) => (
                                                                    <label
                                                                        key={index}
                                                                        style={{
                                                                            color: `${item.isSelected === true ? "white" : ""}`,
                                                                            background: `${item.isSelected === true ? "rgb(4, 90, 160)" : ""}`
                                                                        }}
                                                                        onClick={() => handleRailZoneSelect(item)}
                                                                    >
                                                                        {item.label}
                                                                    </label>
                                                                ))
                                                            }
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="dropdown">
                                                <span>Division :</span>
                                                <div className="multiSelect" ref={divisionDropdownRef} >
                                                    <button onClick={handleDiviDropDown}>
                                                        <div className='selectedOption'>
                                                            {
                                                                railwayDivision.length > 0 ? (
                                                                    <>
                                                                        {
                                                                            railwayDivision.map((railIn, index) => (
                                                                                <span
                                                                                    key={index}
                                                                                    className='spanBtn'
                                                                                >{railIn}
                                                                                </span>
                                                                            ))
                                                                        }
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <span>All</span>
                                                                    </>
                                                                )
                                                            }
                                                        </div>
                                                        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000" />
                                                        </svg>
                                                    </button>
                                                    {
                                                        divisionDropDown &&
                                                        <div className="multiOptions">
                                                            {
                                                                divisionNames && divisionNames.map((item, index) => (
                                                                    <label
                                                                        key={index}
                                                                        style={{
                                                                            color: `${item.isSelected === true ? "white" : ""}`,
                                                                            background: `${item.isSelected === true ? "rgb(4, 90, 160)" : ""}`
                                                                        }}
                                                                        onClick={() => handleDivisionSelect(item)}
                                                                    >
                                                                        {item.label}
                                                                    </label>
                                                                ))
                                                            }
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="dropdown">
                                                <span>Route :</span>
                                                <div className="multiSelect" ref={routeDropdownRef} >
                                                    <button onClick={handleRouteDropDown}>
                                                        <div className='selectedOption'>
                                                            {
                                                                railwayRoute.length > 0 ? (
                                                                    <>
                                                                        {
                                                                            railwayRoute.map((railIn, index) => (
                                                                                <span
                                                                                    key={index}
                                                                                    className='spanBtn'
                                                                                >{railIn}
                                                                                </span>
                                                                            ))
                                                                        }
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <span>All</span>
                                                                    </>
                                                                )
                                                            }
                                                        </div>
                                                        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000" />
                                                        </svg>
                                                    </button>
                                                    {
                                                        routeDropDown &&
                                                        <div className="multiOptions">
                                                            {
                                                                routeNames && routeNames.map((item, index) => (
                                                                    <label
                                                                        key={index}
                                                                        style={{
                                                                            color: `${item.isSelected === true ? "white" : ""}`,
                                                                            background: `${item.isSelected === true ? "rgb(4, 90, 160)" : ""}`
                                                                        }}
                                                                        onClick={() => handleRouteSelect(item)}
                                                                    >
                                                                        {item.label}
                                                                    </label>
                                                                ))
                                                            }
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="dropdown">
                                                <span>Section :</span>
                                                <div className="multiSelect " ref={sectionDropdownRef} >
                                                    <button onClick={handleSectionDropDown}>
                                                        <div className='selectedOption'>
                                                            {
                                                                railwaySection.length > 0 ? (
                                                                    <>
                                                                        {
                                                                            railwaySection.map((railIn, index) => (
                                                                                <span
                                                                                    key={index}
                                                                                    className='spanBtn'
                                                                                >{railIn}
                                                                                </span>
                                                                            ))
                                                                        }
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <span>All</span>
                                                                    </>
                                                                )
                                                            }
                                                        </div>
                                                        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000" />
                                                        </svg>
                                                    </button>
                                                    {
                                                        sectionDropDown &&
                                                        <div className="multiOptions">
                                                            {
                                                                sectionNames && sectionNames.map((item, index) => (
                                                                    <label
                                                                        key={index}
                                                                        style={{
                                                                            color: `${item.isSelected === true ? "white" : ""}`,
                                                                            background: `${item.isSelected === true ? "rgb(4, 90, 160)" : ""}`
                                                                        }}
                                                                        onClick={() => handleSectionSelect(item)}
                                                                    >
                                                                        {item.label}
                                                                    </label>
                                                                ))
                                                            }
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="dropdown">
                                                <span>KM Post :</span>
                                                <div className="kmpostdiv">
                                                    <div className="fpost">
                                                        <span>From :</span>
                                                        <select
                                                            value={KMFromSelected}
                                                            onChange={handleKMFromChange}
                                                        >
                                                            <option value="">select</option>
                                                            {Array.from({ length: 1591 }, (_, i) => i + 1).map((km) => (
                                                                <option key={km} value={km}>
                                                                    {km}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="kmpostdiv">
                                                    <div className="fpost">
                                                        <span>To :</span>
                                                        <select
                                                            value={KMToSelected}
                                                            onChange={handleKMToChange}
                                                        >
                                                            <option value="">select</option>
                                                            {Array.from({ length: 1591 }, (_, i) => i + 1).map((km) => (
                                                                <option key={km} value={km}>
                                                                    {km}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='dropdownDateDiv'>
                                                <span>Date Range :</span>
                                                {/* <DateRangePicker
                                                    startDate={startDate}
                                                    startDateId="start_date"
                                                    endDate={endDate}
                                                    endDateId="end_date"
                                                    onDatesChange={handleDatesChange}
                                                    focusedInput={focusedInput}
                                                    onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                                                    isOutsideRange={() => false} // Optional: Allow selecting dates beyond current month
                                                    displayFormat="DD/MM/YYYY" // Optional: Date display format
                                                /> */}
                                                <DateRangePicker
                startDate={startDate}
                startDateId="start_date"
                endDate={endDate}
                endDateId="end_date"
                onDatesChange={handleDatesChange}
                focusedInput={focusedInput}
                onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                isOutsideRange={() => false} // Allow selecting any dates
                displayFormat="DD/MM/YYYY" // Display format
                showClearDates={true} // Optional: Show a clear dates button
                numberOfMonths={1} // Optional: Show only one month at a time
                renderMonthElement={({ month, onMonthSelect, onYearSelect }) => (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <select
                            value={month.month()}
                            onChange={(e) => onMonthSelect(month, e.target.value)}
                        >
                            {moment.months().map((label, value) => (
                                <option value={value} key={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                        <select
                            value={month.year()}
                            onChange={(e) => onYearSelect(month, e.target.value)}
                        >
                            {Array.from({ length: 100 }, (_, i) => moment().year() - i).map(year => (
                                <option value={year} key={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            />
                                            </div>
                                            <div className="dropdownBtnDvi">
                                                <button className='btnQuery' onClick={handleResetFilterZoneDivRoute}>Reset</button>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <img className='filterIcon' title='Style Renderer' src="/cris/images/styleIcon.png" alt="filter.png" onClick={handleStyleBreak} />
                                {
                                    openStyleBreak &&
                                    <div className="styleBreakdropDown">
                                        <div className="queryBuilderDropdown-Header">
                                            <h3>Style Renderer</h3><span onClick={handleStyleBreakClose}>X</span>
                                        </div>
                                        <div className="queryBuilderDropdown-Content">
                                            <div className="queryBuilderDropdown-Content-Track">
                                                <span>TrackScreen :</span>
                                                <div className="selectDiv">
                                                    <button onClick={handleRendererScreenDropdown} className='selectedDivButton'>{selectedScreenForStyle !== "" ? selectedScreenForStyle : "selecte Screen"}</button>
                                                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000" />
                                                    </svg>
                                                </div>
                                                {
                                                    trackScreenRendererDropdown &&
                                                    <div className="selectDivOption">
                                                        {
                                                            screens && screens.map((screen) => (
                                                                <span key={screen.value} onClick={() => handleSelectedScreenForStyle(screen.title)}>{screen.label}</span>
                                                            ))
                                                        }

                                                    </div>
                                                }
                                            </div>
                                            <div className="queryBuilderDropdown-Content-Track">
                                                <span>Select Layer :</span>
                                                <div className="selectDiv">
                                                    <button onClick={handleRendererLayerDropdown} className='selectedDivButton'>{selectedLayerForStyle !== "" ? selectedLayerForStyle : "selecte Layer"}</button>
                                                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000" />
                                                    </svg>
                                                </div>
                                                {
                                                    trackLayerRendererDropdown &&
                                                    <div className="selectDivOption top1">
                                                        {
                                                            layerFromScreenStyle && layerFromScreenStyle.map((layer, index) => (
                                                                <span key={index} onClick={() => handleSelectedLayerForStyle(layer)}>{layer}</span>
                                                            ))
                                                        }

                                                    </div>
                                                }
                                            </div>
                                            <div className="queryBuilderDropdown-Content-Track">
                                                <span>Select Field :</span>
                                                {/* <select
                                                    value={selectedFieldForStyle}
                                                    onChange={handleSelectFieldForStyle}
                                                    className="custome-select"
                                                >
                                                    <option>select Field</option>
                                                    {
                                                        fieldsFromLayerStyle && fieldsFromLayerStyle.map((field, index) => (
                                                            <option key={index} value={field}>{field}</option>
                                                        ))
                                                    }
                                                </select> */}
                                                <div className="selectDiv">
                                                    <button onClick={handleFieldRendererDropdown} className='selectedDivButton'>{selectedFieldForStyle !== "" ? selectedFieldForStyle : "selecte Field"}</button>
                                                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000" />
                                                    </svg>
                                                </div>
                                                {
                                                    trackFieldRendererDropdown &&
                                                    <div className="selectDivOption top2">
                                                        {
                                                            fieldsFromLayerStyle && fieldsFromLayerStyle.map((field, index) => (
                                                                <span key={index} onClick={() => handleSelectFieldForStyle(field)}>{field}</span>
                                                            ))
                                                        }
                                                    </div>
                                                }
                                            </div>
                                            <div className="queryBuilderDropdown-Content-button">
                                                <button className='btnQuery' onClick={handleRemoveStyleFromLayer}>Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <img title='Logout' className='filterIcon' src="/cris/images/log.png" alt="log.png" style={{ filter: "invert(100%)", color: "white" }} onClick={handleLogout} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="splitScreen-RowTwo">
                    <div className={`splitScreen-Mainscreen grid-${numRows}-${numCols}`}>
                        {
                            screens && screens.map((item, index) => (
                                <div className='mapView-div' id={`viewDiv-${item.id}`} key={item.id}
                                    style={{
                                        border: '2px solid white',
                                        margin: "2px"
                                    }}
                                    draggable
                                    onDragStart={(event) => handleDragStart(event, index)}
                                    onDragOver={(event) => handleDragOver(event, index)}
                                    onDrop={(event) => handleDrop(event, index)}
                                >
                                    {
                                        item.label &&
                                        <div id={item.id} className='mapView-div-header'>
                                            <h3>{item.label}</h3>
                                            <span
                                                onClick={() => handleCloseMapDiv(item.id)}
                                            >X</span>
                                        </div>
                                    }
                                    <div className="layerContainer" id={`layerContainer-${item.id}`}>
                                        <div className="tableDiv" id={`tableDiv-${item.id}`}></div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ScreenSplit;