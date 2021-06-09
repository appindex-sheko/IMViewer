import { shallowMount } from "@vue/test-utils";
import ReportPieChart from "@/components/dashboard/ReportPieChart.vue";
import Card from "primevue/card";
import Chart from "primevue/chart";
import ProgressSpinner from "primevue/progressspinner";
import IndividualService from "@/services/IndividualService";
import LoggerService from "@/services/LoggerService";
import { ChartOptions } from "@/models/charts/ChartOptions";
import { PieChartData } from "@/models/charts/PieChartData";

describe("ReportPieChart.vue", () => {
  let wrapper: any;
  let mockStore: any;
  let mockToast: any;

  beforeEach(() => {
    jest.clearAllMocks();
    IndividualService.getIndividual = jest.fn().mockResolvedValue({
      status: 200,
      data: {
          "@id": "http://endhealth.info/im#ontologyConceptTypes",
          "http://endhealth.info/im#hasStatsReportEntry": [{
              "http://www.w3.org/2002/07/owl#hasValue": {
                  "@value": "1030354",
                  "@type": "http://www.w3.org/2001/XMLSchema#string"
              },
              "http://www.w3.org/2000/01/rdf-schema#label": {
                  "@value": "Class",
                  "@type": "http://www.w3.org/2001/XMLSchema#string"
              }
          }, {
              "http://www.w3.org/2002/07/owl#hasValue": {
                  "@value": "93282",
                  "@type": "http://www.w3.org/2001/XMLSchema#string"
              },
              "http://www.w3.org/2000/01/rdf-schema#label": {
                  "@value": "Legacy concept",
                  "@type": "http://www.w3.org/2001/XMLSchema#string"
              }
          }, {
              "http://www.w3.org/2002/07/owl#hasValue": {
                  "@value": "1811",
                  "@type": "http://www.w3.org/2001/XMLSchema#string"
              },
              "http://www.w3.org/2000/01/rdf-schema#label": {
                  "@value": "Object property",
                  "@type": "http://www.w3.org/2001/XMLSchema#string"
              }
          }, {
              "http://www.w3.org/2002/07/owl#hasValue": {
                  "@value": "1122",
                  "@type": "http://www.w3.org/2001/XMLSchema#string"
              },
              "http://www.w3.org/2000/01/rdf-schema#label": {
                  "@value": "Set",
                  "@type": "http://www.w3.org/2001/XMLSchema#string"
              }
          }, {
              "http://www.w3.org/2002/07/owl#hasValue": {
                  "@value": "99",
                  "@type": "http://www.w3.org/2001/XMLSchema#string"
              },
              "http://www.w3.org/2000/01/rdf-schema#label": {
                  "@value": "Node shape",
                  "@type": "http://www.w3.org/2001/XMLSchema#string"
              }
          }, {
              "http://www.w3.org/2002/07/owl#hasValue": {
                  "@value": "94",
                  "@type": "http://www.w3.org/2001/XMLSchema#string"
              },
              "http://www.w3.org/2000/01/rdf-schema#label": {
                  "@value": "Record type",
                  "@type": "http://www.w3.org/2001/XMLSchema#string"
              }
          }, {
              "http://www.w3.org/2002/07/owl#hasValue": {
                  "@value": "68",
                  "@type": "http://www.w3.org/2001/XMLSchema#string"
              },
              "http://www.w3.org/2000/01/rdf-schema#label": {
                  "@value": "Data property",
                  "@type": "http://www.w3.org/2001/XMLSchema#string"
              }
          }, {
              "http://www.w3.org/2002/07/owl#hasValue": {
                  "@value": "45",
                  "@type": "http://www.w3.org/2001/XMLSchema#string"
              },
              "http://www.w3.org/2000/01/rdf-schema#label": {
                  "@value": "Query set",
                  "@type": "http://www.w3.org/2001/XMLSchema#string"
              }
          }, {
              "http://www.w3.org/2002/07/owl#hasValue": {
                  "@value": "26",
                  "@type": "http://www.w3.org/2001/XMLSchema#string"
              },
              "http://www.w3.org/2000/01/rdf-schema#label": {
                  "@value": "Functional property",
                  "@type": "http://www.w3.org/2001/XMLSchema#string"
              }
          }, {
              "http://www.w3.org/2002/07/owl#hasValue": {
                  "@value": "23",
                  "@type": "http://www.w3.org/2001/XMLSchema#string"
              },
              "http://www.w3.org/2000/01/rdf-schema#label": {
                  "@value": "Annotation property",
                  "@type": "http://www.w3.org/2001/XMLSchema#string"
              }
          }, {
              "http://www.w3.org/2002/07/owl#hasValue": {
                  "@value": "11",
                  "@type": "http://www.w3.org/2001/XMLSchema#string"
              },
              "http://www.w3.org/2000/01/rdf-schema#label": {
                  "@value": "Symmetric property",
                  "@type": "http://www.w3.org/2001/XMLSchema#string"
              }
          }, {
              "http://www.w3.org/2002/07/owl#hasValue": {
                  "@value": "11",
                  "@type": "http://www.w3.org/2001/XMLSchema#string"
              },
              "http://www.w3.org/2000/01/rdf-schema#label": {
                  "@value": "Transitive property",
                  "@type": "http://www.w3.org/2001/XMLSchema#string"
              }
          }, {
              "http://www.w3.org/2002/07/owl#hasValue": {
                  "@value": "8",
                  "@type": "http://www.w3.org/2001/XMLSchema#string"
              },
              "http://www.w3.org/2000/01/rdf-schema#label": {
                  "@value": "Folder",
                  "@type": "http://www.w3.org/2001/XMLSchema#string"
              }
          }, {
              "http://www.w3.org/2002/07/owl#hasValue": {
                  "@value": "8",
                  "@type": "http://www.w3.org/2001/XMLSchema#string"
              },
              "http://www.w3.org/2000/01/rdf-schema#label": {
                  "@value": "Value set",
                  "@type": "http://www.w3.org/2001/XMLSchema#string"
              }
          }, {
              "http://www.w3.org/2002/07/owl#hasValue": {
                  "@value": "2",
                  "@type": "http://www.w3.org/2001/XMLSchema#string"
              },
              "http://www.w3.org/2000/01/rdf-schema#label": {
                  "@value": "Reflexive property",
                  "@type": "http://www.w3.org/2001/XMLSchema#string"
              }
          }, {
              "http://www.w3.org/2002/07/owl#hasValue": {
                  "@value": "1",
                  "@type": "http://www.w3.org/2001/XMLSchema#string"
              },
              "http://www.w3.org/2000/01/rdf-schema#label": {
                  "@value": "Query template",
                  "@type": "http://www.w3.org/2001/XMLSchema#string"
              }
          }
          ],
          "http://www.w3.org/2000/01/rdf-schema#comment": {
              "@value": "A brief overview of the types of data stored in the Ontology",
              "@type": "http://www.w3.org/2001/XMLSchema#string"
          },
          "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
              "@id": "http://endhealth.info/im#statsReport",
              "name": "Statistics Report"
          },
          "http://www.w3.org/2000/01/rdf-schema#label": {
              "@value": "Ontology concept types",
              "@type": "http://www.w3.org/2001/XMLSchema#string"
          }
      }
    });
    mockStore = {
      commit: jest.fn()
    };
    mockToast = {
      add: jest.fn()
    };
    wrapper = shallowMount(ReportPieChart, {
      props: { iri: "im:Test" },
      global: {
        components: { Card, Chart, ProgressSpinner },
        mocks: { $store: mockStore, $toast: mockToast }
      }
    })
  });

  it("sets the store loading over mount", async() => {
    expect(mockStore.commit).toHaveBeenCalledTimes(2);
    expect(mockStore.commit).toHaveBeenNthCalledWith(1, "updateLoading", { key: "reportPie_im:Test", value: true });
    expect(mockStore.commit).toHaveBeenLastCalledWith("updateLoading", { key: "reportPie_im:Test", value: false })
  });

  it("calls the report service on mount", () => {
    expect(IndividualService.getIndividual).toBeCalledTimes(1);
  });

  it("processes api return into realData, chartOptions and chartConceptTypes", async() => {
    const testChartConceptType = {
        "datasets": [
            {
                "backgroundColor": [
                    "#781c81BB",
                    "#4d1f82BB",
                    "#403e95BB",
                    "#4063b0BB",
                    "#4684c2BB",
                    "#519cb8BB",
                    "#62ac9aBB",
                    "#77b77bBB",
                    "#90bc62BB",
                    "#abbe51BB",
                    "#c3ba45BB",
                    "#d7af3dBB",
                    "#e39a36BB",
                    "#e77830BB",
                    "#e34d28BB",
                    "#d92120BB"
                ],
                "borderRadius": 1,
                "data": [
                    680405.1187499999,
                    67617.9,
                    6339.178124999999,
                    6339.178124999999,
                    6339.178124999999,
                    6339.178124999999,
                    6339.178124999999,
                    6339.178124999999,
                    6339.178124999999,
                    6339.178124999999,
                    6339.178124999999,
                    6339.178124999999,
                    6339.178124999999,
                    6339.178124999999,
                    6339.178124999999,
                    6339.178124999999
                ],
                "hoverBackgroundColor": [
                    "#781c81",
                    "#4d1f82",
                    "#403e95",
                    "#4063b0",
                    "#4684c2",
                    "#519cb8",
                    "#62ac9a",
                    "#77b77b",
                    "#90bc62",
                    "#abbe51",
                    "#c3ba45",
                    "#d7af3d",
                    "#e39a36",
                    "#e77830",
                    "#e34d28",
                    "#d92120"
                ]
            }
        ],
        "labels": [
            "Class",
            "Legacy concept",
            "Object property",
            "Set",
            "Node shape",
            "Record type",
            "Data property",
            "Query set",
            "Functional property",
            "Annotation property",
            "Symmetric property",
            "Transitive property",
            "Folder",
            "Value set",
            "Reflexive property",
            "Query template"
        ]
    };
    const testChartOptions = {
      legend: {
        position: "right",
        onHover: function(e: any) {

        }
      },
      hover: {
        onHover: function(e: any) {

        }
      },
      tooltips: {
        callbacks: {
          label: function(t: any, d: any) {

          }
        }
      }
    };
    expect(wrapper.vm.chartConceptTypes).toEqual(testChartConceptType);
    expect(wrapper.vm.realData).toStrictEqual({
        "0": 1030354,
        "1": 93282,
        "2": 1811,
        "3": 1122,
        "4": 99,
        "5": 94,
        "6": 68,
        "7": 45,
        "8": 26,
        "9": 23,
        "10": 11,
        "11": 11,
        "12": 8,
        "13": 8,
        "14": 2,
        "15": 1
    });
    expect(wrapper.vm.chartOptions.toString()).toEqual(testChartOptions.toString()
    );
  });

  it("can setChartColours", async() => {
    const testData = [
      {
          "iri": "http://www.w3.org/2002/07/owl#Class",
          "label": "Class",
          "count": 1030270
      },
      {
          "iri": "http://endhealth.info/im#LegacyConcept",
          "label": "Legacy Concept",
          "count": 93282
      },
      {
          "iri": "http://www.w3.org/2002/07/owl#ObjectProperty",
          "label": "Object Property",
          "count": 1813
      },
      {
          "iri": "http://endhealth.info/im#Set",
          "label": "Set",
          "count": 1122
      },
      {
          "iri": "http://endhealth.info/im#RecordType",
          "label": "Record Type",
          "count": 94
      },
      {
          "iri": "http://www.w3.org/2002/07/owl#DataProperty",
          "label": "Data Property",
          "count": 68
      },
      {
          "iri": "http://endhealth.info/im#QuerySet",
          "label": "Query set",
          "count": 45
      },
      {
          "iri": "http://www.w3.org/2002/07/owl#FunctionalProperty",
          "label": "Functional Property",
          "count": 26
      },
      {
          "iri": "http://www.w3.org/2002/07/owl#AnnotationProperty",
          "label": "Annotation Property",
          "count": 23
      },
      {
          "iri": "http://www.w3.org/2002/07/owl#TransitiveProperty",
          "label": "Transitive Property",
          "count": 11
      },
      {
          "iri": "http://www.w3.org/2002/07/owl#SymmetricProperty",
          "label": "Symmetric Property",
          "count": 11
      },
      {
          "iri": "http://endhealth.info/im#ValueSet",
          "label": "Value Set",
          "count": 8
      },
      {
          "iri": "http://endhealth.info/im#Folder",
          "label": "Folder",
          "count": 8
      },
      {
          "iri": "http://www.w3.org/2002/07/owl#ReflexiveProperty",
          "label": "Reflexive Property",
          "count": 2
      },
      {
          "iri": "http://endhealth.info/im#QueryTemplate",
          "label": "Query Template",
          "count": 1
      },
      {
          "iri": "http://www.w3.org/ns/shacl#NodeShape",
          "label": "Node Shape",
          "count": 1
      }
    ];
    wrapper.vm.chartConceptTypes = new PieChartData(
      [
        {
          data: [],
          backgroundColor: [],
          hoverBackgroundColor: [],
          borderRadius: 1
        }
      ],
      []
    ) as PieChartData;
    const mockRes = [
      {
          "iri": "http://www.w3.org/2002/07/owl#Class",
          "label": "Class",
          "count": 1030270
      },
      {
          "iri": "http://endhealth.info/im#LegacyConcept",
          "label": "Legacy Concept",
          "count": 93282
      },
      {
          "iri": "http://www.w3.org/2002/07/owl#ObjectProperty",
          "label": "Object Property",
          "count": 1813
      },
      {
          "iri": "http://endhealth.info/im#Set",
          "label": "Set",
          "count": 1122
      },
      {
          "iri": "http://endhealth.info/im#RecordType",
          "label": "Record Type",
          "count": 94
      },
      {
          "iri": "http://www.w3.org/2002/07/owl#DataProperty",
          "label": "Data Property",
          "count": 68
      },
      {
          "iri": "http://endhealth.info/im#QuerySet",
          "label": "Query set",
          "count": 45
      },
      {
          "iri": "http://www.w3.org/2002/07/owl#FunctionalProperty",
          "label": "Functional Property",
          "count": 26
      },
      {
          "iri": "http://www.w3.org/2002/07/owl#AnnotationProperty",
          "label": "Annotation Property",
          "count": 23
      },
      {
          "iri": "http://www.w3.org/2002/07/owl#TransitiveProperty",
          "label": "Transitive Property",
          "count": 11
      },
      {
          "iri": "http://www.w3.org/2002/07/owl#SymmetricProperty",
          "label": "Symmetric Property",
          "count": 11
      },
      {
          "iri": "http://endhealth.info/im#ValueSet",
          "label": "Value Set",
          "count": 8
      },
      {
          "iri": "http://endhealth.info/im#Folder",
          "label": "Folder",
          "count": 8
      },
      {
          "iri": "http://www.w3.org/2002/07/owl#ReflexiveProperty",
          "label": "Reflexive Property",
          "count": 2
      },
      {
          "iri": "http://endhealth.info/im#QueryTemplate",
          "label": "Query Template",
          "count": 1
      },
      {
          "iri": "http://www.w3.org/ns/shacl#NodeShape",
          "label": "Node Shape",
          "count": 1
      }
    ];
    wrapper.vm.setChartColours(mockRes);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.chartConceptTypes).toEqual({
        "datasets": [
            {
                "backgroundColor": [],
                "borderRadius": 1,
                "data": [],
                "hoverBackgroundColor": []
            }
        ],
        "labels": []
    });
  })
});

describe("service fail", () => {
  let wrapper: any;
  let mockStore: any;
  let mockToast: any;
  let testError: any;

  beforeEach(() => {
    jest.clearAllMocks();
    testError = new Error("concept status deliberate test error")
    IndividualService.getIndividual = jest.fn().mockRejectedValue({ status: 400, error: testError });
    mockStore = {
      commit: jest.fn()
    };
    mockToast = {
      add: jest.fn()
    };
    LoggerService.error = jest.fn()
    wrapper = shallowMount(ReportPieChart, {
      props: { iri: "im:test" },
      global: {
        components: { Card, Chart, ProgressSpinner },
        mocks: { $store: mockStore, $toast: mockToast }
      }
    })
  });

  it("fires a toast message on service error and stops loading", () => {
    expect(IndividualService.getIndividual).toHaveBeenCalledTimes(1);
    expect(mockStore.commit).toHaveBeenCalledTimes(2);
    expect(mockStore.commit).toHaveBeenLastCalledWith("updateLoading", { key: "reportPie_im:test", value: false });
    expect(mockToast.add).toHaveBeenCalledTimes(1);
    expect(mockToast.add).toHaveBeenCalledWith(LoggerService.error("Concept type server request failed", testError));
    expect(LoggerService.error).toHaveBeenCalledTimes(2);
    expect(LoggerService.error).toHaveBeenLastCalledWith("Concept type server request failed", testError);
  });

  it("setsLegendOptions ___ width > 1750", async() => {
    global.innerWidth = 1760;
    const testOptions = {
      legend: {
        position: "right",
        labels: {
          boxWidth: 40,
          fontSize: 12
        },
        onHover: function(e: any) {
          e.target.style.cursor = "pointer";
        }
      },
      hover: {
        onHover: function(e: any) {
          e.target.style.cursor = "default";
        }
      }
    };
    wrapper.vm.setLegendOptions();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.chartOptions.toString()).toEqual(testOptions.toString());
  });

  it("setsLegendOptions ___ width > 1300", async() => {
    global.innerWidth = 1310;
    const testOptions = {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 20,
          fontSize: 10
        },
        onHover: function(e: any) {
          e.target.style.cursor = "pointer";
        }
      },
      hover: {
        onHover: function(e: any) {
          e.target.style.cursor = "default";
        }
      }
    };
    wrapper.vm.setLegendOptions();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.chartOptions.toString()).toEqual(testOptions.toString());
  });

  it("setsLegendOptions ___ width >= 1024", async() => {
    global.innerWidth = 1024;
    const testOptions = {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 10,
          fontSize: 8
        },
        onHover: function(e: any) {
          e.target.style.cursor = "pointer";
        }
      },
      hover: {
        onHover: function(e: any) {
          e.target.style.cursor = "default";
        }
      }
    };
    wrapper.vm.setLegendOptions();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.chartOptions.toString()).toEqual(testOptions.toString());
  });

  it("setsLegendOptions ___ width >= 892", async() => {
    global.innerWidth = 892;
    const testOptions = {
      legend: {
        position: "right",
        labels: {
          boxWidth: 40,
          fontSize: 8
        },
        onHover: function(e: any) {
          e.target.style.cursor = "pointer";
        }
      },
      hover: {
        onHover: function(e: any) {
          e.target.style.cursor = "default";
        }
      }
    };
    wrapper.vm.setLegendOptions(892);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.chartOptions.toString()).toEqual(testOptions.toString());
  });

  it("setsLegendOptions ___ width >= 557", async() => {
    global.innerWidth = 557;
    const testOptions = {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 20,
          fontSize: 6
        },
        onHover: function(e: any) {
          e.target.style.cursor = "pointer";
        }
      },
      hover: {
        onHover: function(e: any) {
          e.target.style.cursor = "default";
        }
      }
    };
    wrapper.vm.setLegendOptions();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.chartOptions.toString()).toEqual(testOptions.toString());
  });

  it("setsLegendOptions ___ width >= 0", async() => {
      global.innerWidth = 0;
    const testOptions = {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 10,
          fontSize: 4
        },
        onHover: function(e: any) {
          e.target.style.cursor = "pointer";
        }
      },
      hover: {
        onHover: function(e: any) {
          e.target.style.cursor = "default";
        }
      }
    };
    wrapper.vm.setLegendOptions();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.chartOptions.toString()).toEqual(testOptions.toString());
  });

  it("setsLegendOptions ___ width other", async() => {
    global.innerWidth = -1;
    const testOptions = {
      legend: {
        display: false
      }
    };
    wrapper.vm.setLegendOptions(-1);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.chartOptions.toString()).toEqual(testOptions.toString());
  });
})