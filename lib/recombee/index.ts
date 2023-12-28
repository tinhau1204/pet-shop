import recombee_api from "recombee-js-api-client";

const { RECOMBEE_DB, RECOMBEE_PUBLIC_TOKEN, RECOMBEE_REGION } = process.env;

var client = new recombee_api.ApiClient(
    "ohyeah-dev",
    "kpw7l7RxbmC9UDJqjLBaszl4ely5KDGBTYwClZpLyGjPHLeGlM17FD9YHYdyGVS5",
    {
        region: "eu-west",
    },
);

export default { client, recombee_api };
