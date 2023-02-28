import { getPhotos, mutatePhoto } from "./photos";
import { getUser } from "./users";
export const api = {
  photos: {
    getPhotos,
    mutatePhoto,
  },
  users: {
    getUser,
  },
};
