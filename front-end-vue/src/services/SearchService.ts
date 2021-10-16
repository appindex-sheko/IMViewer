import axios, { AxiosResponse, CancelToken } from "axios";


export default class SearchService {

  //env variables not working for some reason?
  static searchApi = process.env.MEILI_API;
  static searchApiKeyPublic = process.env.MEILI_API_KEY_PUBLIC;


  static meili_api = "http://167.99.194.138/"
  static meili_headers = {
    'X-Meili-Api-Key': "68942f3e956f95db5b18963e1be76a78eb620dff0e6f56f4239be1b76c3e93af",
    'Content-Type': 'application/json'
  }


  public static async getAutocomplete(searchString: string): Promise<AxiosResponse<any>> {
    return axios.post(this.meili_api + "indexes/AutocompleteSearch/search",
      {
        q: searchString,
        attributesToHighlight: ["searchString"],
        matches: true
      }
      ,
      {
        headers: this.meili_headers
      });
  }

}