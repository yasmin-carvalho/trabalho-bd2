import api from "../api";

/**
 * @async
 * @export
 * @function
 * @name redemet
 *
 * @description
 * Redemet API calls
 */

export async function getAerodromesList() {
  try {
    const response = await api.get("/aerodromes_list");
    return response;
  } catch (error) {
    return error;
  }
}

export async function getAdHoc(params: any) {
  try {
    const response = await api.get("/adhoc", { params });
    return response;
  } catch (error) {
    return error;
  }
}
