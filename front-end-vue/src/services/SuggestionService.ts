import { ConceptReference } from "@/models/ConceptReference";
import axios, { AxiosResponse } from "axios";

export default class SuggestionService {
  static api = "http://localhost:8080/";

  public static async getIriSuggestions(
    keyword: string,
    word: string
  ): Promise<ConceptReference[]> {
    const response = await axios.get<ConceptReference[]>(
      this.api + "api/concept/referenceSuggestions",
      {
        params: {
          keyword: keyword,
          word: word,
        },
      }
    );

    return response.data;
  }
}