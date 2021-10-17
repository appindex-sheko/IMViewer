const { MeiliSearch } = require('meilisearch')


export default class SearchClient {

    //#todo: make env variables work instead of hardcoded public API Key
    //alternative to env variable
    static meili_api = "http://167.99.194.138/"
    static meili_api_key_public = "68942f3e956f95db5b18963e1be76a78eb620dff0e6f56f4239be1b76c3e93af";

    static client = new MeiliSearch({
        host: SearchClient.meili_api,
        apiKey: SearchClient.meili_api_key_public,
    });


    public static async fetchAutocompleteSearch(searchString: string): Promise<any> {

        const _index = SearchClient.client.index('AutocompleteSearch');
        // #todo: change search from auto-relevancy to literal matching e.g. use `"${searchString}"`
        const _search = await _index
            .search(
                searchString,
                { attributesToHighlight: ['searchString'] }
            );
        return _search;
    }




    public static async fetchModulesData(): Promise<any> {

        const _index = SearchClient.client.index('Modules');
        // #todo: change search from auto-relevancy to literal matching e.g. use `"${searchString}"`
        const _search = await _index
            .search("");
        return _search;
    }


    public static async search(index: string, searchString: string): Promise<any> {
        const _index = SearchClient.client.index(index);
        // #todo: change search from auto-relevancy to literal matching e.g. use `"${searchString}"`
        const _search = await _index
            .search(
                searchString
            );
        return _search;
    }


    public static async searchDatasets(searchString: string): Promise<any> {


        // all the words in a searchString
        const _searchWords = searchString.split(" ");
        // all the matched entities (at least one for each word)
        const _imEntityData: any[] = [];
        const _imEntityIDataModelIris: any[] = [];

        //all the matched result templates
        const _resultTemplatesData: any[] = [];

        // final results for the dataset editor to be returned based on _matchedResultTemplates and _imEntityData
        const _resultTemplates: any[] = [];


        //matches each word against an IM entity using indexes/IMSearch
        await Promise.all(_searchWords.map(async word => {
            await SearchClient.search("IMSearch", word)
                .then((res: any) => {
                    // console.log("fetched IMSearch", res);
                    _imEntityData.push(res);
                    //  Promise.resolve(res);
                })
                .catch((err: any) => {
                    console.log("could not fetch IMSearch data", err);
                })
        }));

        //gets the IRIs for each search match
        if (_imEntityData && _imEntityData.length > 0) {
            _imEntityData.forEach((data: any) => {
                data.hits.forEach((entity: any) => {
                    _imEntityIDataModelIris.push(entity.matchedDataModelIri);
                });
            });
            // console.log("fetched _imEntityIris", _imEntityIris);

        }

      
        const _index = SearchClient.client.index("ResultTemplate");
        // #todo change requiredEntityIds to requiredEntityIis
        const _requiredEntityIds = _imEntityIDataModelIris.map((x: any) => { return 'requiredEntityIds = "' + x + '"'} )
        console.log("_imEntityIris", _requiredEntityIds);
        // #todo: change search from auto-relevancy to literal matching e.g. use `"${searchString}"`
        const _result = await _index
            .search(
                "",
                {
                    filter: '(' + _requiredEntityIds.join(" AND ")+ ')'
                }
            );

        console.log("_result is", _result);

        //gets result templates
        // await SearchClient.search("ResultTemplate", _imEntityIris.join(" "))
        //     .then((res: any) => {
        //         console.log("fetched ResultTemplate", res);
        //         _resultTemplates.push(res);
        //         //  Promise.resolve(res);
        //     })
        //     .catch((err: any) => {
        //         console.log("could not fetch IMSearch data", err);
        //     })



        return _imEntityData;
    }





}


