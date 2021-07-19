import { flushPromises, shallowMount } from "@vue/test-utils";
import UsedIn from "@/components/concept/UsedIn.vue";
import ProgressSpinner from "primevue/progressspinner";
import Listbox from "primevue/listbox";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import EntityService from "@/services/EntityService";
import LoggerService from "@/services/LoggerService";

describe("UsedIn.vue", () => {
  let wrapper: any;
  let mockRouter: any;
  let mockToast: any;
  let docSpy: any;

  beforeEach(async() => {
    jest.resetAllMocks();
    EntityService.getEntityUsages = jest.fn().mockResolvedValue({data: [{"name":"Acrodysplasia scoliosis (disorder)","@id":"http://snomed.info/sct#773773006"},{"name":"Anterior vertebral body tethering (procedure)","@id":"http://snomed.info/sct#788325009"},{"name":"Congenital scoliosis due to bony malformation (disorder)","@id":"http://snomed.info/sct#205045003"},{"name":"Distal arthrogryposis type 4 (disorder)","@id":"http://snomed.info/sct#715575001"},{"name":"Duane anomaly, myopathy, scoliosis syndrome (disorder)","@id":"http://snomed.info/sct#722432000"},{"name":"Family history of scoliosis deformity of spine (situation)","@id":"http://snomed.info/sct#430544007"},{"name":"Horizontal gaze palsy with progressive scoliosis (disorder)","@id":"http://snomed.info/sct#702381007"},{"name":"Lordoscoliosis (disorder)","@id":"http://snomed.info/sct#111268000"},{"name":"Post-surgical scoliosis (disorder)","@id":"http://snomed.info/sct#203647008"},{"name":"Scoliosis in neurofibromatosis (disorder)","@id":"http://snomed.info/sct#203663000"},{"name":"Scoliosis in skeletal dysplasia (disorder)","@id":"http://snomed.info/sct#203661003"}]});
    EntityService.getUsagesTotalRecords = jest.fn().mockResolvedValue({ data: 50 });
    mockRouter = {
      push: jest.fn()
    };
    mockToast = {
      add: jest.fn()
    };
    docSpy = jest.spyOn(document, "getElementById");
    docSpy.mockReturnValue(undefined);

    const warn = console.warn;
    console.warn = jest.fn();

    const error = console.error;
    console.error = jest.fn();

    wrapper = shallowMount(UsedIn, {
      global: {
        components: { ProgressSpinner, Listbox, DataTable, Column },
        mocks: { $router: mockRouter, $toast: mockToast }
      },
      props: { conceptIri: "http://snomed.info/sct#298382003" }
    });

    await flushPromises();
    jest.clearAllMocks();

    console.warn = warn;
    console.error = error;
  });

  it("starts with empty values", () => {
    expect(wrapper.vm.selected).toStrictEqual({});
    expect(wrapper.vm.usages).toStrictEqual([{"name":"Acrodysplasia scoliosis (disorder)","@id":"http://snomed.info/sct#773773006"},{"name":"Anterior vertebral body tethering (procedure)","@id":"http://snomed.info/sct#788325009"},{"name":"Congenital scoliosis due to bony malformation (disorder)","@id":"http://snomed.info/sct#205045003"},{"name":"Distal arthrogryposis type 4 (disorder)","@id":"http://snomed.info/sct#715575001"},{"name":"Duane anomaly, myopathy, scoliosis syndrome (disorder)","@id":"http://snomed.info/sct#722432000"},{"name":"Family history of scoliosis deformity of spine (situation)","@id":"http://snomed.info/sct#430544007"},{"name":"Horizontal gaze palsy with progressive scoliosis (disorder)","@id":"http://snomed.info/sct#702381007"},{"name":"Lordoscoliosis (disorder)","@id":"http://snomed.info/sct#111268000"},{"name":"Post-surgical scoliosis (disorder)","@id":"http://snomed.info/sct#203647008"},{"name":"Scoliosis in neurofibromatosis (disorder)","@id":"http://snomed.info/sct#203663000"},{"name":"Scoliosis in skeletal dysplasia (disorder)","@id":"http://snomed.info/sct#203661003"}]);
    expect(wrapper.vm.loading).toBe(false);
    expect(wrapper.vm.recordsTotal).toBe(50);
    expect(wrapper.vm.currentPage).toBe(1);
    expect(wrapper.vm.pageSize).toBe(25);
    expect(wrapper.vm.scrollHeight).toBe("500px");
  });

  it("getsUsages and recordSize on iri change", async() => {
    wrapper.vm.getUsages = jest.fn();
    wrapper.vm.getRecordsSize = jest.fn()
    wrapper.vm.$options.watch.conceptIri.call(wrapper.vm, "http://endhealth.info/im#DiscoveryOntology");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.getUsages).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.getRecordsSize).toHaveBeenCalledTimes(1);
  });

  it("adds event listener to setHeight and Scroll on resize", async() => {
    console.error = jest.fn();
    await flushPromises();
    const spy = jest.spyOn(wrapper.vm, "setScrollHeight");
    window.dispatchEvent(new Event("resize"));
    await wrapper.vm.$nextTick();
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockReset();
  });

  it("can remove eventListener", () => {
    console.error = jest.fn();
    const spy = jest.spyOn(global, "removeEventListener");
    wrapper.unmount();
    expect(spy).toHaveBeenCalled();
    spy.mockReset();
  });

  it("can resize", () => {
    console.error = jest.fn();
    wrapper.vm.setScrollHeight = jest.fn();
    wrapper.vm.onResize();
    expect(wrapper.vm.setScrollHeight).toHaveBeenCalledTimes(1);
  });

  it("gets usages", async() => {
    wrapper.vm.getUsages("http://snomed.info/sct#298382003", 0, 25);
    expect(wrapper.vm.loading).toBe(true);
    await flushPromises();
    expect(EntityService.getEntityUsages).toHaveBeenCalledTimes(1);
    expect(EntityService.getEntityUsages).toHaveBeenCalledWith("http://snomed.info/sct#298382003",0,25);
    expect(wrapper.vm.usages).toStrictEqual([{"name":"Acrodysplasia scoliosis (disorder)","@id":"http://snomed.info/sct#773773006"},{"name":"Anterior vertebral body tethering (procedure)","@id":"http://snomed.info/sct#788325009"},{"name":"Congenital scoliosis due to bony malformation (disorder)","@id":"http://snomed.info/sct#205045003"},{"name":"Distal arthrogryposis type 4 (disorder)","@id":"http://snomed.info/sct#715575001"},{"name":"Duane anomaly, myopathy, scoliosis syndrome (disorder)","@id":"http://snomed.info/sct#722432000"},{"name":"Family history of scoliosis deformity of spine (situation)","@id":"http://snomed.info/sct#430544007"},{"name":"Horizontal gaze palsy with progressive scoliosis (disorder)","@id":"http://snomed.info/sct#702381007"},{"name":"Lordoscoliosis (disorder)","@id":"http://snomed.info/sct#111268000"},{"name":"Post-surgical scoliosis (disorder)","@id":"http://snomed.info/sct#203647008"},{"name":"Scoliosis in neurofibromatosis (disorder)","@id":"http://snomed.info/sct#203663000"},{"name":"Scoliosis in skeletal dysplasia (disorder)","@id":"http://snomed.info/sct#203661003"}]);
    expect(wrapper.vm.loading).toBe(false);
  });

  it("gets usages ___ fetch error", async() => {
    wrapper.vm.usages = [];
    EntityService.getEntityUsages = jest.fn().mockRejectedValue(false);
    wrapper.vm.getUsages("http://snomed.info/sct#298382003", 0, 25);
    expect(wrapper.vm.loading).toBe(true);
    await flushPromises();
    expect(EntityService.getEntityUsages).toHaveBeenCalledTimes(1);
    expect(EntityService.getEntityUsages).toHaveBeenCalledWith("http://snomed.info/sct#298382003", 0, 25);
    expect(wrapper.vm.usages).toStrictEqual([]);
    expect(mockToast.add).toHaveBeenCalledTimes(1);
    expect(mockToast.add).toHaveBeenCalledWith(LoggerService.error("Failed to get usages from server"));
    expect(wrapper.vm.loading).toBe(false);
  });

  it("gets recordsSize ___ success", async() => {
    wrapper.vm.records = 0;
    wrapper.vm.getRecordsSize("http://snomed.info/sct#298382003");
    await flushPromises();
    expect(EntityService.getUsagesTotalRecords).toHaveBeenCalledTimes(1);
    expect(EntityService.getUsagesTotalRecords).toHaveBeenCalledWith("http://snomed.info/sct#298382003");
    expect(wrapper.vm.recordsTotal).toBe(50);
  });

  it("gets recordsSize ___ fail", async() => {
    EntityService.getUsagesTotalRecords = jest.fn().mockRejectedValue(false);
    wrapper.vm.records = 0;
    wrapper.vm.getRecordsSize("http://snomed.info/sct#298382003");
    await flushPromises();
    expect(EntityService.getUsagesTotalRecords).toHaveBeenCalledTimes(1);
    expect(EntityService.getUsagesTotalRecords).toHaveBeenCalledWith("http://snomed.info/sct#298382003");
    expect(mockToast.add).toHaveBeenCalledTimes(1);
    expect(mockToast.add).toHaveBeenCalledWith(LoggerService.error("Failed to get usages record count from server"))
    expect(wrapper.vm.records).toBe(0);
  });

  it("can handle page", () => {
    wrapper.vm.getPage = jest.fn();
    wrapper.vm.scrollToTop = jest.fn();
    wrapper.vm.handlePage({ rows: 100, page: 7 });
    expect(wrapper.vm.pageSize).toBe(100);
    expect(wrapper.vm.currentPage).toBe(7);
  });

  it("can getPage", () => {
    wrapper.vm.getUsages = jest.fn();
    wrapper.vm.getPage();
    expect(wrapper.vm.getUsages).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.getUsages).toHaveBeenCalledWith("http://snomed.info/sct#298382003", 1, 25);
  });

  it("can handleSelected", () => {
    wrapper.vm.selected = { "@id": "testIri" }
    wrapper.vm.handleSelected();
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith({ name: "Concept", params: { selectedIri: "testIri" } });
  });

  it("can handleSelected ___ no selected", () => {
    wrapper.vm.handleSelected();
    expect(mockRouter.push).not.toHaveBeenCalledTimes(1);
  });
});
