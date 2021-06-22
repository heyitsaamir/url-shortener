import { airtableClient } from './airtable';
import md5 from 'md5';

type Record = {
  Url: string;
  Hash: string;
}

const hashFn = (url: string) => md5(url).substring(0, 5);

export async function addNewUrl(url: string) {
  const hash = hashFn(url);
  const existingRows = await getOriginal(hash);
  if (existingRows != null) {
    throw new Error(`A url already exists`);
  }

  await airtableClient.postSingleInstance('Main', {
    Hash: hash,
    Url: url,
  })

  return hash;
}

export async function getOriginal(hash: string) {
  const existingRows = await airtableClient.queryDatabase<Record>('Main', { filter: `Hash="${hash}"`});
  return existingRows[0]?.fields.Url;
}