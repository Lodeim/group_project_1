import { api } from "../../api";
import { getUpdatedPhotoForState, getPhotoFromState } from "../../utils";
import {
  getPhotosFailed,
  getPhotosStarted,
  getPhotosSuccess,
  mutatePhotoFailed,
  mutatePhotoStarted,
  mutatePhotoSuccess,
  setPhotosTotal,
} from "../actionCreators/photos";

export const getPhotos = (page = 1) => {
  return async (dispatch, getState) => {
    try {
      const store = getState();
      if (page === 1) {
        dispatch(getPhotosStarted);
      }
      const response = await api.photos.getPhotos({
        params: {
          _page: page,
          _limit: 5,
        },
      });

      if (page === 1) {
        dispatch(setPhotosTotal(response.headers["x-total-count"]));
        dispatch(getPhotosSuccess([...response.data]));
      } else {
        dispatch(getPhotosSuccess([...store.photos.photos, ...response.data]));
      }
    } catch (error) {
      dispatch(getPhotosFailed(error));
    }
  };
};

export const toggleLike = (authorizedUser, photoId) => {
  return async (dispatch, getState) => {
    const state = getState();

    const newPhoto = getPhotoFromState(state.photos.photos, photoId);
    if (newPhoto.likes.includes(authorizedUser)) {
      newPhoto.likes = newPhoto.likes.filter((like) => like !== authorizedUser);
    } else {
      newPhoto.likes.push(authorizedUser);
    }
    try {
      const isLikedByYou = newPhoto.likes.includes(authorizedUser);
      const response = await api.photos.mutatePhoto({
        data: newPhoto,
        method: isLikedByYou ? "PUT" : "DELETE",
        url: `/likes/${photoId}`,
      });

      const newPhotos = getUpdatedPhotoForState(state.photos.photos, photoId, response.data);
      dispatch(getPhotosSuccess(newPhotos));
    } catch (error) {
      dispatch(mutatePhotoFailed(error));
    }
  };
};

export const sendComment = (author, photoId, text) => {
  return async (dispatch, getState) => {
    dispatch(mutatePhotoStarted());
    const state = getState();
   
    const newPhoto = getPhotoFromState(state.photos.photos, photoId);
      newPhoto.comments.push({author, text});
  
    try {
      const response = await api.photos.mutatePhoto({
        data: newPhoto,
        method: "POST",
        url: `/comments/${photoId}`,
      });

      const newPhotos = getUpdatedPhotoForState(
        state.photos.photos,
        photoId,
        response.data
      );
      dispatch(getPhotosSuccess(newPhotos));
      dispatch(mutatePhotoSuccess());
    } catch (error) {
      dispatch(mutatePhotoFailed(error));
    }
  };
};
