const { v4 } = require('uuid');
const { MeiliSearch } = require('meilisearch')

const _meili_api = process.env.meili_api;
const _meili_api_key_public = process.env.meili_api_key_public;

const client = new MeiliSearch({
  host: _meili_api,
  apiKey: _meili_api_key_public,
});



exports.handler = async (event: any): Promise<any> => {
  let _searchString = "Empty";
  let _searchResults;
  let responseCode = 200;
  
  
  

  //this is the body of the request
  if (event && event.q) {
    _searchString = event.q;

    const _index = client.index('AutocompleteSearch');
    // #todo: change search from auto-relevancy to literal matching e.g. use `"${searchString}"`
    _searchResults = await _index
      .search(
        event.q,
        { attributesToHighlight: ['searchString'] }
      );
    
  }

  const _uuid = v4().replace(/-/g, "");

  let responseBody = {
    id: _uuid,
    searchString: _searchString,
    input: event,
    meili_api: _meili_api,
    meili_api_key_public: _meili_api_key_public,
    output: _searchResults
  };

  // The output from a Lambda proxy integration must be 
  // in the following JSON object. The 'headers' property 
  // is for custom response headers in addition to standard 
  // ones. The 'body' property  must be a JSON string. For 
  // base64-encoded payload, you must also set the 'isBase64Encoded'
  // property to 'true'.
  let response = {
    statusCode: responseCode,
    headers: {
      "content-type": "application/json"

    },
    body: JSON.stringify(responseBody)
  };

  return response;
};

