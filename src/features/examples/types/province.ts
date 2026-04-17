export type Province = {
  name: string;
  code: number;
  longitude: string;
  latitude: string;
};

export type GetProvinceResponse = {
  success: string;
  statusCode: number;
  message: string;
  data: Province[];
};

export type GetProvinceParams = {
  [key: string]: string;
};
