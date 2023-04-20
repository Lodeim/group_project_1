import { api } from "../../api";
import sapi from "../../api/sberAddRequest";
import { getPhotoFromState, getUpdatedPhotoForState, getUserPagePostData } from "../../utils";
import {
  mutatePhotoFailed,
  mutatePhotoStarted,
  mutatePhotoSuccess,
} from "../actionCreators/photos";
import {
  getPostsFailed,
  getPostsStarted,
  getPostsSuccess,
} from "../actionCreators/postsByUser";

export const getPostsByUser = () => {
  return async (dispatch) => {
    try {
      dispatch(getPostsStarted());
      const response = await api.postsByUser.getPostsByUser();
      dispatch(getPostsSuccess(response.data));
    } catch (error) {
      dispatch(getPostsFailed(error));
    }
  };
};

export const toggleLikeOnPost = (userId, postId) => {
  return async (dispatch, getState) => {
    try {
      const posts = getState().postsByUser.posts;
      const { postForEdit, newPosts } = getUserPagePostData(posts, postId);

      if (postForEdit.likes.includes(userId)) {
        postForEdit.likes = postForEdit.likes.filter((like) => like !== userId);
      } else {
        postForEdit.likes.push(userId);
      }

      await api.postsByUser.mutatePosts({
        url: `/${postId}`,
        data: {
          _id: postId,
          posts: newPosts,
        },
      });

      dispatch(getPostsSuccess(newPosts));
    } catch (error) {}
  };
};

export const togglePostLike = (authorizedUser, photoId) => {
  return async (dispatch, getState) => {
    const state = getState();

    const newPhoto = getPhotoFromState(state.postsByUser.posts, photoId)
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
      const newPhotos = getUpdatedPhotoForState(state.postsByUser.posts, photoId, response.data);
      dispatch(getPostsSuccess(newPhotos));
    } catch (error) {
      dispatch(mutatePhotoFailed(error));
    }
  };
};




export const sendCommentOnUserPage = (author, postId, postAuthorId, text) => {
  return async (dispatch, getState) => {
    dispatch(mutatePhotoStarted());
    const state = getState()
    const posts = state.postsByUser.posts;
    const postForEdit = getUserPagePostData(posts, postId);
    postForEdit.postForEdit.comments.push({ author, text });
    try {
        // eslint-disable-next-line
      const response = await api.photos.mutatePhoto({
        data: {'text': text},
        method: "POST",
        url: `/comments/${postId}`,
      });
      const newPosts = getUpdatedPhotoForState(posts, postId, response.data);
      dispatch(getPostsSuccess(newPosts));
      dispatch(mutatePhotoSuccess());
    } catch (error) {
      dispatch(mutatePhotoFailed(error));
    }
  };
};

export const deleteCommentOnUserPage = ( photoId, commentId) => {
  return async (dispatch, getState) => {
    dispatch(mutatePhotoStarted());
    const state = getState();
    const newPhoto = getPhotoFromState(state.postsByUser.posts, photoId);
    console.log(newPhoto.comments);
    let index = newPhoto.comments.findIndex(e => e._id === commentId)
    newPhoto.comments.splice(index, 1)
    try {
      const response = await sapi.deleteComment(photoId, commentId)
      console.log(response);

      const newPosts = getUpdatedPhotoForState(
        state.postsByUser.posts,
        photoId,
        response.data.data
      );
      dispatch(getPostsSuccess(newPosts));
      dispatch(mutatePhotoSuccess());
    } catch (error) {
      dispatch(mutatePhotoFailed(error));
    }
  };
};