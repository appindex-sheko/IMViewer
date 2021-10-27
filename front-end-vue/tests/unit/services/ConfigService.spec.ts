import ConfigService from "@/services/ConfigService";
import axios from "axios";

describe("ConfigService.ts ___ axios success", () => {
  const api = process.env.VUE_APP_API;

  beforeEach(() => {
    axios.get = jest.fn().mockResolvedValue(["test config"]);
  });

  it("can get component layout", async () => {
    const result = await ConfigService.getComponentLayout("definition");
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(api + "api/config/componentLayout", { params: { name: "definition" } });
    expect(result).toStrictEqual(["test config"]);
  });

  it("can get filter defaults", async () => {
    const result = await ConfigService.getFilterDefaults();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(api + "api/config/filterDefaults");
    expect(result).toStrictEqual(["test config"]);
  });
});

describe("ConfigService.ts ___ axios fail", () => {
  const api = process.env.VUE_APP_API;

  beforeEach(() => {
    axios.get = jest.fn().mockRejectedValue(false);
  });

  it("can get component layout", async () => {
    const result = await ConfigService.getComponentLayout("definition");
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(api + "api/config/componentLayout", { params: { name: "definition" } });
    expect(result).toStrictEqual([]);
  });

  it("can get filter defaults", async () => {
    const result = await ConfigService.getFilterDefaults();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(api + "api/config/filterDefaults");
    expect(result).toStrictEqual({});
  });
});