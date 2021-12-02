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
    const response = await api.get("/aerodromos");
    return response;
  } catch (error) {
    return error;
  }
}

export async function getSigmet() {
  try {
    const response = await api.get("/sigmet");
    return response;
  } catch (error) {
    return error;
  }
}
