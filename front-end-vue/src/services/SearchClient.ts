const { MeiliSearch } = require('meilisearch')


export default class SearchClient {

    //#todo: make env variables work instead of hardcoded public API Key
    //alternative to env variable
    static meili_api = "http://167.99.194.138/"
    static meili_api_key_public = "68942f3e956f95db5b18963e1be76a78eb620dff0e6f56f4239be1b76c3e93af";




    public static async fetchAutocompleteSearch(searchString: string): Promise<any> {
        //meilisearch.client = clean code
        const client = new MeiliSearch({
            host: SearchClient.meili_api,
            apiKey: SearchClient.meili_api_key_public,
        });
        
        const index = client.index('AutocompleteSearch');
        // #todo: change search from auto-relevancy to literal matching e.g. use `"${searchString}"`
        const search = await index
            .search(
                searchString,
                { attributesToHighlight: ['searchString'] }
                );
        return search;
    }

}


