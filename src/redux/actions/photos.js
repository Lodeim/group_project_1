import { api } from "../../api";
import sapi from "../../api/sberAddRequest";
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
        url: `/paginate?page=${page}&limit=5`
      });
      if (page === 1) {
        dispatch(setPhotosTotal(response.data.total));
        dispatch(getPhotosSuccess([...response.data.posts]));
      } else {
        dispatch(getPhotosSuccess([...store.photos.photos, ...response.data.posts]));
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
        data: {'text': text},
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

export const deleteComment = ( photoId, commentId) => {
  return async (dispatch, getState) => {
    dispatch(mutatePhotoStarted());
    const state = getState();
    const newPhoto = getPhotoFromState(state.photos.photos, photoId);
    let index = newPhoto.comments.findIndex(e => e._id === commentId)
    newPhoto.comments.splice(index, 1)
    try {
      const response = await sapi.deleteComment(photoId, commentId)
      const newPhotos = getUpdatedPhotoForState(
        state.photos.photos,
        photoId,
        response.data.data
      );
      dispatch(getPhotosSuccess(newPhotos));
      dispatch(mutatePhotoSuccess());
    } catch (error) {
      dispatch(mutatePhotoFailed(error));
    }
  };
};


export const editPost = (photoId, text, tags, image, title) => {
  return async (dispatch, getState) => {
    dispatch(mutatePhotoStarted());
    const state = getState();
  
    try {
      const response = await api.photos.mutatePhoto({
        data: {
          'text': text,
          'tags': tags,
          'image': image,
          'title': title
      },
        method: "PATCH",
        url: `/${photoId}`,
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

