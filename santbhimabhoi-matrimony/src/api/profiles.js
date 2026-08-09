import apiClient from './client';
import { BRIDES_ENDPOINT, GROOMS_ENDPOINT, WIDOW_PROFILES_ENDPOINT, profileByIdEndpoint } from '../constants/api';

const getData = async (endpoint) => {
  const response = await apiClient.get(endpoint);
  return response.data;
};

export const profileApi = {
  getBrides: () => getData(BRIDES_ENDPOINT),
  getGrooms: () => getData(GROOMS_ENDPOINT),
  getWidowProfiles: () => getData(WIDOW_PROFILES_ENDPOINT),
  getById: (profileId) => getData(profileByIdEndpoint(profileId)),
};
