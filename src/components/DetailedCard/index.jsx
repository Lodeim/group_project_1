import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import UserBadge from "../UserBadge";
import Comment from "../Comment";
import cn from "classnames";
import PhotoModal from "../PhotoModal";
import TextArea from "../TextArea";
import ImageWithLoader from "../ImageWithLoader";
import { timeConverter } from "../../utils";
import sapi from "../../api/sberAddRequest";
import DeleteAlertModal from "../AlertDeleteModal/DeleteAlertModal";
import { EditModal } from "../EditModal";
import { deleteComment, editPost } from "../../redux/actions/photos";

import "./styles.css";

const DetailedCard = ({
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
  const [isCommentsShown, setIsCommentsShown] = useState(false);
  const [comment, setComment] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [deleteAlertModalActive, setDeleteAlertModalActive] = useState(false);
  const dispatch = useDispatch();
  const handleSendCommentClick = () => {
    if (comment) {
      onCommentSendClick(_id, comment);
      setComment("");
    }
  };

  const onCommentDelete = async (post, id) => {
    await dispatch(deleteComment(post, id));
  };

  const renderComments = () => {
    if (comments.length > 2 && !isCommentsShown) {
      const commentsCopy = [...comments];
      const commentsForRender = commentsCopy.splice(comments.length - 2, 2);

      return (
        <>
          <span
            className="cnDetailedCardCommentTitle"
            onClick={() => setIsCommentsShown(true)}
          >{`Показать скрытые комментарии ${
            comments.length - commentsForRender.length
          }`}</span>
          {commentsForRender.map(
            ({ author, text, created_at, _id, post, update_at }) => (
              <Comment
                key={nanoid()}
                author={author}
                text={text}
                createdAt={created_at}
                updateAt={update_at}
                id={_id}
                post={post}
                onCommentDelete={onCommentDelete}
              />
            )
          )}
        </>
      );
    }
    return comments.map(
      ({ author, text, created_at, _id, post, update_at }) => (
        <Comment
          key={nanoid()}
          author={author}
          text={text}
          createdAt={created_at}
          updateAt={update_at}
          id={_id}
          post={post}
          onCommentDelete={onCommentDelete}
        />
      )
    );
  };

  const onEdit = async (postId, formText, formTags, formImage, formTitle) => {
    await dispatch(editPost(postId, formText, formTags, formImage, formTitle));
  };

  const onCloseModal = () => {
    setIsModalVisible(false);
    setComment("");
  };
  const onOpenModal = () => {
    setIsModalVisible(true);
    setComment("");
  };
  const onCloseEditModal = () => {
    setIsEditModalVisible(false);
  };
  const onOpenEditModal = () => {
    setIsEditModalVisible(true);
  };

  const onCloseModalDelete = () => {
    setDeleteAlertModalActive(false);
  };
  const onOpenModalDelete = () => {
    setDeleteAlertModalActive(true);
  };

  const authorizedUser = useSelector((state) => state.users.authorizedUser);

  const deleteBtn = () => {
    if (authorizedUser._id === userId) {
      return (
        <i
          className="fas fa-trash-can cnDetailedCardDeleteIcon"
          onClick={onOpenModalDelete}
        ></i>
      );
    }
  };

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
    <div className={cn("cnDetailedCardRoot", className)}>
      <div className="cnDetailedCardHeader">
        <UserBadge
          userName={userName}
          avatarUrl={avatarUrl}
          _id={userId}
          aboutUser={aboutUser}
        />
      </div>
      <div className="cnDetailedCardImgWrapper">
        <ImageWithLoader
          className="cnDetailedCardImg"
          src={imgUrl}
          alt="img"
          onClick={onOpenModal}
        />
        <div className="cnDetailedCardTime">{timeConverter(createdPost)}</div>
        <h2 className="cnDetailedCardTitle">{title}</h2>
        <div className="cnDetailedCardDescription">{text}</div>
        <div className="cnDetailedCardTags">
          {tags.map((e) => {
            if (e === "") {
              return "";
            } else {
              return <span key={nanoid()}>{`${e}`}</span>;
            }
          })}
        </div>
      </div>
      <div className="cnDetailedCardButtons">
        <i
          onClick={() => onLikeClick(_id)}
          className={`${
            isLikedByYou ? "fas" : "far"
          } fa-heart cnDetailedCardLikeIcon`}
        />
        <i
          className="fas fa-comment cnDetailedCardLikeComment"
          onClick={onOpenModal}
        />
        <>{deleteBtn()}</>
        {authorizedUser._id === userId ? (
          <i
            className="fa-regular fa-pen-to-square"
            onClick={onOpenEditModal}
          />
        ) : (
          ""
        )}
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
      <div className="cnDetailedCardLikes">{`Оценили ${likes} человек`}</div>
      <div className="cnDetailedCardComments">{renderComments()}</div>
      <div className="cnDetailedCardTextAreaWrapper">
        <TextArea
          placeholder="Введите комментарий"
          value={comment}
          onChange={setComment}
          isLoading={mutateLoading}
          onSubmit={handleSendCommentClick}
          buttonText="Отправить"
        />

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
    </div>
  );
};

export default DetailedCard;
