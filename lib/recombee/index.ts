import recombee_api from "recombee-js-api-client";

var client = new recombee_api.ApiClient(
    process.env.NEXT_PUBLIC_RECOMBEE_DB!,
    process.env.NEXT_PUBLIC_RECOMBEE_PUBLIC_TOKEN!,
    {
        region: process.env.NEXT_PUBLIC_RECOMBEE_REGION!,
    },
);

export default { client, recombee_api };
