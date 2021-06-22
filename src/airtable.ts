import Axios, { AxiosInstance } from "axios";

interface AirTableResult<TOtherFIelds extends {} = { [key: string]: any }> {
  records: {
    id: string;
    fields: TOtherFIelds
  }[]
}

const APP_ID = `app6kFk0wsqCDlcxy`;

class AirTableClient {
  axios: AxiosInstance;
  constructor(authToken: string) {
    this.axios = Axios.create({ baseURL: `https://api.airtable.com/v0/${APP_ID}`, headers: { 'Authorization': `Bearer ${authToken}` } });
  }

  async queryDatabase<TResultType>(databaseId: string, options?: { filter?: string; preprocess?: (record: AirTableResult<any>['records'][0]) => AirTableResult<TResultType>['records'][0] }): Promise<AirTableResult<TResultType>['records']> {
    const result = await this.axios.get<AirTableResult<TResultType>>(`${databaseId}`, { params: { 'filterByFormula': options?.filter } });
    return options?.preprocess ? result.data.records.map(options.preprocess) : result.data.records;
  }

  async postSingleInstance<TResultType>(databaseId: string, data: TResultType): Promise<AirTableResult<TResultType>['records']> {
    const result = await this.axios.post<AirTableResult<TResultType>>(`${databaseId}`, {
      records: [{
        fields: data
      }]
    });
    return result.data.records;
  }
}

export const airtableClient = new AirTableClient(process.env.REACT_APP_AT_TOKEN ?? 'UNKNOWN_TOKEN');