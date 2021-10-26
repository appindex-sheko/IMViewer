"use strict";
const { v4 } = require('uuid');
const { MeiliSearch } = require('meilisearch');
const _meili_api = process.env.meili_api;
const _meili_api_key_public = process.env.meili_api_key_public;
const client = new MeiliSearch({
    host: _meili_api,
    apiKey: _meili_api_key_public,
});
exports.handler = async (event) => {
    let _searchString = "Empty";
    let _searchResults;
    let responseCode = 200;
    if (event && event.q) {
        _searchString = event.q;
        const _index = client.index('AutocompleteSearch');
        _searchResults = await _index
            .search(event.q, { attributesToHighlight: ['searchString'] });
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
    let response = {
        statusCode: responseCode,
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(responseBody)
    };
    return response;
};
//# sourceMappingURL=index.js.map