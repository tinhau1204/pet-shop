import recombee_api from "recombee-js-api-client";

var client = new recombee_api.ApiClient(
    process.env.NEXT_PUBLIC_RECOMBEE_DB!,
    process.env.NEXT_PUBLIC_RECOMBEE_PUBLIC_TOKEN!,
    {
        region: process.env.NEXT_PUBLIC_RECOMBEE_REGION!,
    },
);

const exportedObject = {
    client,
    recombee_api,
};

export default exportedObject;
