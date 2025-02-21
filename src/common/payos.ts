/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createHmac } from "crypto";

function sortObjDataByKey(object: Record<string, any>) {
  const orderedObject = Object.keys(object)
    .sort()
    .reduce(
      (obj, key) => {
        obj[key] = object[key];
        return obj;
      },
      {} as Record<string, any>,
    );
  return orderedObject;
}

function convertObjToQueryStr(object: Record<string, any>) {
  return Object.keys(object)
    .filter((key) => object[key] !== undefined)
    .map((key) => {
      let value = object[key];
      // Sort nested object
      if (value && Array.isArray(value)) {
        value = JSON.stringify(value.map((val) => sortObjDataByKey(val)));
      }
      // Set empty string if null
      if ([null, undefined, "undefined", "null"].includes(value)) {
        value = "";
      }

      return `${key}=${value}`;
    })
    .join("&");
}

export function createSignature(data: Record<string, any>, checksumKey: string): string {
  const sortedDataByKey = sortObjDataByKey(data);

  const dataQueryStr = convertObjToQueryStr(sortedDataByKey);

  return createHmac("sha256", checksumKey).update(dataQueryStr).digest("hex");
}

export function isValidData(data: Record<string, any>, currentSignature: string, checksumKey: string): boolean {
  const sortedDataByKey = sortObjDataByKey(data);

  const dataQueryStr = convertObjToQueryStr(sortedDataByKey);

  const dataToSignature = createHmac("sha256", checksumKey).update(dataQueryStr).digest("hex");

  return dataToSignature == currentSignature;
}
