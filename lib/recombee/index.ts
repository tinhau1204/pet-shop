import recombee_api from "recombee-js-api-client";

const { RECOMBEE_DB, RECOMBEE_PUBLIC_TOKEN } = process.env;

const recombee = new recombee_api.ApiClient(
    RECOMBEE_DB || "",
    RECOMBEE_PUBLIC_TOKEN || "",
    { region: "us-west" },
);

export default recombee;
