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


    public static checkRequiredEntityIris(array: any, target: any): boolean {
        return target.every((item: any) => array.includes(item));

    }


    public static async searchDatasets(searchString: string): Promise<any> {


        // all the words in a searchString
        const _searchWords = searchString.split(" ");
        // all the matched entities (at least one for each word)
        const _imEntityData: any[] = [];
        const _imEntityIDataModelIris: any[] = [];



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
                    entity.matchedDataModelIri.forEach((iri: any) =>  _imEntityIDataModelIris.push(iri));
                   
                });
            });
            // console.log("fetched _imEntityIris", _imEntityIris);

        }



        //find matching RersultTemplates
        const _index = SearchClient.client.index("ResultTemplate");
        const _resultTemplatesData = await _index
            .search(_imEntityIDataModelIris.join(" "));


        //filter out all ResultTemplates where ResultTemplates.requiredEntityIris matches the _imEntityIDataModelIris extract from the searchString
        let _validTemplates;
        if (_resultTemplatesData && _resultTemplatesData.nbHits > 0) {
            _validTemplates = _resultTemplatesData.hits.filter((resultTemplate: any) => {
                // console.log("checking items", SearchClient.checkRequiredEntityIris(resultTemplate.requiredEntityIris, _imEntityIDataModelIris));
                return SearchClient.checkRequiredEntityIris(_imEntityIDataModelIris, resultTemplate.requiredEntityIris);
            });
        }

        console.log("_validTemplates is", _validTemplates);




        return _validTemplates;
    }





}


