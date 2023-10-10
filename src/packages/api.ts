// https://github.com/ferdikoomen/openapi-typescript-codegen/blob/HEAD/docs/client-instances.md
import { environmentVariables } from '@/config';

import {
  ApiV1Api,
  ApiV1MasterApi,
  Configuration,
  ConfigurationParameters,
} from './apigen';

export class BlogAPIClient {
  api: ApiV1Api;

  constructor(config?: ConfigurationParameters) {
    this.api = new ApiV1Api(
      new Configuration({
        ...config,
        basePath: environmentVariables.API_BACKEND_URL,
        headers: {
          Authorization: `Bearer ${environmentVariables.API_KEY}`,
        },
      })
    );
  }
}

export class BlogAPIMasterClient {
  api: ApiV1MasterApi;

  constructor(config?: ConfigurationParameters) {
    this.api = new ApiV1MasterApi(
      new Configuration({
        ...config,
        basePath: environmentVariables.API_BACKEND_URL,
        headers: {
          Authorization: `Bearer ${environmentVariables.API_MASTER_KEY}`,
        },
      })
    );
  }
}

export const blogApiClient = new BlogAPIClient();
export const blogApiMasterClient = new BlogAPIMasterClient();
