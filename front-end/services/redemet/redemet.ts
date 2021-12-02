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

export async function getAerodromes() {
  try {
    const response = await api.get("/aerodromes");
    return response;
  } catch (error) {
    return error;
  }
}

export async function getTsc() {
  try {
    const response = await api.get("/tsc");
    return response;
  } catch (error) {
    return error;
  }
}
