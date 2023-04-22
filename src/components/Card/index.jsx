import cn from "classnames";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PhotoModal from "../PhotoModal";
import ImageWithLoader from "../ImageWithLoader";
import { timeConverter } from "../../utils";
import sapi from "../../api/sberAddRequest";
import DeleteAlertModal from "../AlertDeleteModal/DeleteAlertModal";
import { editPost } from "../../redux/actions/photos";
import { EditModal } from "../EditModal";
import { deleteCommentOnUserPage } from "../../redux/actions/postsByUser";
import "./styles.css";

const Card = ({
  userName,
  avatarUrl,
  userId,
  imgUrl,
  likes,
  isLikedByYou,
  comments,
  className,
  onLikeClick,
  onCommentSendClick,
  mutateLoading,
  aboutUser,
  text,
  tags,
  title,
  createdPost,
  _id,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [deleteAlertModalActive, setDeleteAlertModalActive] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const onCommentDelete = async (post, id) => {
    console.log(post, id);
    await dispatch(deleteCommentOnUserPage(post, id));
  };
  const onEdit = async (postId, formText, formTags, formImage, formTitle) => {
    await dispatch(editPost(postId, formText, formTags, formImage, formTitle));
  };
  const handleSendCommentClick = () => {
    if (comment) {
      onCommentSendClick(_id, comment);
      setComment("");
    }
  };

  const onCloseEditModal = (event) => {
    setIsEditModalVisible(false);
    event.stopPropagation(true);
  };
  const onOpenEditModal = (event) => {
    setIsEditModalVisible(true);
    event.stopPropagation(true);
  };

  const onCloseModal = () => {
    setModalVisible(false);
    setComment("");
  };
  const onOpenModal = (event) => {
    setModalVisible(true);
    setComment("");
  };

  const handleLikeClick = (event, _id) => {
    onLikeClick(_id);
    event.stopPropagation(true);
  };



  const onCloseModalDelete = (event) => {
    setDeleteAlertModalActive(false);
    event.stopPropagation(true);
  };
  const onOpenModalDelete = (event) => {
    setDeleteAlertModalActive(true);
    event.stopPropagation(true);
  };

  const authorizedUser = useSelector((state) => state.users.authorizedUser);

  const onHandleDeleteClick = () => {
    if (authorizedUser._id === userId) {
      sapi
        .deletePost(_id)
        .then((data) => {
          console.log(data);
          console.log("Пост удален!");
          document.location.reload();
        })
        .catch((err) => alert(err));
    } else {
      console.log("Удаление чужих постов невозможно!");
    }
  };
  return (
    <div className={cn("cnCardRoot", className)}>
      <ImageWithLoader className="cnCardImage" src={imgUrl} alt={imgUrl} />
      <div className="cnCardHover" />
      <div className="cnCardIcons" onClick={() => onOpenModal()}>
        <i
          className={cn(
            `${isLikedByYou ? "fas" : "far"} fa-heart`,
            "cnCardIcon"
          )}
          onClick={(event) => handleLikeClick(event, _id)}
        />
        <span className="cnCardNumber cnCardLikes">{likes}</span>
        <i
          className={cn("far fa-comment", "cnCardIcon")}
          onClick={() => onOpenModal()}
        />
        <span className="cnCardNumber">{comments.length}</span>
        <div className="cnCardIcon cnCardIconDelete">
          {authorizedUser._id === userId ? (
            <>
              <i
                className="fa-regular fa-pen-to-square"
                onClick={onOpenEditModal}
              />
              <i
                className="fa-regular fa-trash-can  "
                onClick={onOpenModalDelete}
              />
            </>
          ) : null}
        </div>

        <EditModal
          postId={_id}
          image={imgUrl}
          tags={tags}
          title={title}
          text={text}
          isOpen={isEditModalVisible}
          onClose={onCloseEditModal}
          onEdit={onEdit}
        />
      </div>
      <PhotoModal
        userName={userName}
        avatarUrl={avatarUrl}
        aboutUser={aboutUser}
        userId={userId}
        timeConverter={timeConverter}
        isOpen={isModalVisible}
        onClose={onCloseModal}
        comments={comments}
        commentValue={comment}
        setCommentValue={setComment}
        onCommentSubmit={handleSendCommentClick}
        isCommentLoading={mutateLoading}
        imgUrl={imgUrl}
        isLikedByYou={isLikedByYou}
        onLikeClick={() => onLikeClick(_id)}
        text={text}
        tags={tags}
        title={title}
        createdPost={createdPost}
        _id={_id}
        author
        onCommentDelete={onCommentDelete}
      />
      <DeleteAlertModal
        isOpen={deleteAlertModalActive}
        onClose={onCloseModalDelete}
        onHandleDelete={() => onHandleDeleteClick(_id)}
      />
    </div>
  );
};

export default Card;
