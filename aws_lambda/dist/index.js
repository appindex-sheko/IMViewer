export const lambdaHandler = async (event) => {
    const queries = JSON.stringify(event.queryStringParameters);
    return {
        statusCode: 200,
        body: `Queries: ${queries}`
    };
};
//# sourceMappingURL=index.js.map