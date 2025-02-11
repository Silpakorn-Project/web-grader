import { GraderServiceClient } from "./clients/GraderServiceClient";

class Client {
    public graderService: GraderServiceClient;

    constructor(baseurl: string) {
        this.graderService = new GraderServiceClient(baseurl);
    }
}

export const client = new Client(process.env.REACT_APP_GRADER_SERVICE_API_URL as string);