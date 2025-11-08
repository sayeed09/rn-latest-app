import { axiosClient } from '@services/axios';
import { ozivaRestConfigEndpoint } from '@utils/constants';


export const filterBannerImagesHomeService = async () => {
  try {
    const { data } = await axiosClient.get(`${ozivaRestConfigEndpoint}/home`);
    return data;
  } catch (error) {
    console.log("Error in banner image : ", error);
    throw error;
  }
}