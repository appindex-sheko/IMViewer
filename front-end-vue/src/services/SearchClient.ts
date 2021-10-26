const { MeiliSearch } = require('meilisearch')
const { v4 } = require('uuid');
const _ = require('lodash');


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




    public static async searchNewDatasets(searchString: string): Promise<any> {


        // all the words in a searchString
        const _searchWords = searchString.split(" ");
        const _matchedSearchWords: any[] = [];
        // all the matched entities (at least one for each word)
        const _imEntityData: any[] = [];
        const _imEntities: any[] = [];
        const _imEntityDataModelIris: any[] = [];
        let _uniqueIMEntityDataModelIris: any[] = [];
        let _uniqueIMEntityDataModelIrisCounted: any[] = [];



        // final results for the dataset editor to be returned based on _matchedResultTemplates and _imEntityData
        const _resultTemplates: any[] = [];


        //matches each word against an IM entity using indexes/IMSearch
        await Promise.all(_searchWords.map(async word => {
            await SearchClient.search("IMSearch", word)
                .then((res: any) => {
                    // console.log("fetched IMSearch", res);
                    _imEntityData.push(res);
                    _matchedSearchWords.push({ searchWord: word, imEntities: res });
                    //  Promise.resolve(res);
                })
                .catch((err: any) => {
                    console.log("could not fetch IMSearch data", err);
                })
        }));

        //gets the Datamodel IRIs for each IM entity matched in search (e.g. Diabetes Concept Set-> ProblemOrCondition DataModel)
        //and match against templates
        //#todo: allow other entities to match against template as well (im class, concepts)
        if (_imEntityData && _imEntityData.length > 0) {
            _imEntityData.forEach((data: any) => {
                data.hits.forEach((entity: any) => {
                    _imEntities.push(entity)
                    entity.matchedDataModelIri.forEach((iri: any) => {
                        _imEntityDataModelIris.push(iri)
                    });

                });
            });
            // console.log("fetched _imEntityIris", _imEntityIris);

        }



        //find matching RersultTemplates
        const _index = SearchClient.client.index("ResultTemplates");    //#todo: filter current search by Module/Task (Data.createDataset) after you add ResultTemplates for other modules to the same index


        const _resultTemplatesData = await _index
            .search(_imEntityDataModelIris.join(" "));

        // template validation 
        //filter out all ResultTemplates where ResultTemplates.requiredEntityIris matches the _imEntityDataModelIris extract from the searchString
        let _validTemplates;
        if (_resultTemplatesData && _resultTemplatesData.nbHits > 0) {
            _validTemplates = _resultTemplatesData.hits.filter((resultTemplate: any) => {
                // console.log("checking items", SearchClient.checkRequiredEntityIris(resultTemplate.requiredEntityIris, _imEntityDataModelIris));
                return SearchClient.checkRequiredEntityIris(_imEntityDataModelIris, resultTemplate.requiredEntityIris);
            });
        }

        // console.log("_imEntityDataModelIris", _imEntityDataModelIris);
        console.log("_validTemplates is", _validTemplates);
        console.log("_imEntities is", _imEntities);

        //interpolating labels for results based on template


        let _interpolatedTemplates = null;
        if (_validTemplates.length > 0) {

            //sort out unique datamodel IRIs and count them 

            _uniqueIMEntityDataModelIris = _imEntityDataModelIris.filter(SearchClient.onlyUnique);
            _uniqueIMEntityDataModelIrisCounted = _uniqueIMEntityDataModelIris.map((uniqueIri: any) => {

                const countOccurrences = (arr: any, val: any) => arr.reduce((a: any, v: any) => (v === val ? a + 1 : a), 0);
                
                return {
                    uniqueDataModelIri: uniqueIri,
                    count: countOccurrences(_imEntityDataModelIris, uniqueIri),
                    naturalLanguage: ""
                }
            });
            //prepare natural language
            // #####################
            // _uniqueIMEntityDataModelIrisCounted = _uniqueIMEntityDataModelIrisCounted.map((iri: any) => {
                
            //     console.log("find",  _imEntities.find((DataModelEntity: any) => DataModelEntity.iri = iri.uniqueDataModelIri)["rdfs:label"])

            //     switch (iri.count) {
            //         case 1:
                       
            //             iri.naturalLanguage = _imEntities.find(DataModelEntity => DataModelEntity.iri = iri.uniqueDataModelIri)["rdfs:label"];
            //             console.log(iri.uniqueDataModelIri, iri.naturalLanguage)
            //             break;
            //         case 2:
            //             // code block
            //             break;
            //         default:
            //             break;
            //     }
            // });

             console.log("_imEntityDataModelIris", _imEntityDataModelIris);
             console.log("_uniqueIMEntityDataModelIrisCounted", _uniqueIMEntityDataModelIrisCounted);



            //for each label that is in the template, interpolate the prepared natural language string
            _interpolatedTemplates = _validTemplates.map((template: any) => {


                // console.log("_uniqueIMEntityDataModelIrisCounted", _uniqueIMEntityDataModelIrisCounted);

                //interpolate
                _uniqueIMEntityDataModelIrisCounted.forEach((iri: any) => {



                    // template.label = SearchClient.interpolate(template.labelTemplate)({
                    //     uniqueDataModelIri: 'quick',
                    //     color: 'brown',
                    //     mammal: 'dog'
                    // });
                });



            });

           


            const _data = {
                matchedIMEntities: _matchedSearchWords,
                results: _interpolatedTemplates
            };

            //geneate uuid without hyphens
            const _uuid = v4().replace(/-/g, "");

            // the same _searchResultResource is used for every module, just the type / label / and resouce (data / metadata) will vary
            const _searchResultResource = {
                id: _uuid,
                resourceType: "im:SearchResult",
                label: `Search Results for "${searchString}"`,
                resources: {
                    data: _data,
                    meta: {
                        dateNow: Date.now(),
                        module: "Data",
                        task: "createDataset"
                    }
                }
            }


            const _errorResource = {
                id: _uuid,
                resourceType: "Error",
                label: `No Search Results for "${searchString}"`,
            }


            if (_interpolatedTemplates) {
                return _interpolatedTemplates;
            } else {
                return _errorResource;
            }
        }

    }


    ////////////////////////// helper functions
    public static checkRequiredEntityIris(array: any, target: any): boolean {
        return target.every((item: any) => array.includes(item));

    }


    public static interpolate(labelTemplate: string) {
        return function interpolate(o: any) {
            return labelTemplate.replace(/{([^{}]*)}/g, (a: any, b: any) => {
                const r = o[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            });
        }
    }

    // public static prepareString (item: any, count: any): any {

    // }

    // helps array.filter to only keep unique values e.g. array = array.filter(SearchClient.onlyUnique);
    public static onlyUnique(value: any, index: any, self: any) {
        return self.indexOf(value) === index;
    }

    public static countOccurrences = (array: any, value: any): any => {
        array.reduce((a: any, v: any) => (v === value ? a + 1 : a), 0);
    }



}


