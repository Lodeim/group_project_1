import { useState } from "react";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";
import UserBadge from "../UserBadge";
import Comment from "../Comment";
import cn from "classnames";
import PhotoModal from "../PhotoModal";
import TextArea from "../TextArea";
import ImageWithLoader from "../ImageWithLoader";
import { timeConverter } from "../../utils";
import api from "../../api/sberAddRequest"
import handleClickOpen from "../DeleteAlertModal/DeleteAlertModal"

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
  author
}) => {
  const [isCommentsShown, setIsCommentsShown] = useState(false);
  const [comment, setComment] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleSendCommentClick = () => {
    if (comment) {
      onCommentSendClick(_id, comment);
      setComment("");
    }
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
          >{`Показать скрытые комментарии ${comments.length - commentsForRender.length
            }`}</span>
          {commentsForRender.map((comment) => (
            <Comment {...comment} key={nanoid()} />
          ))}
        </>
      );
    }
    return comments.map(({ author, text, created_at, _id, post, update_at }) => (
      <Comment
        key={nanoid()}
        author={author}
        text={text}
        createdAt={created_at}
        updateAt={update_at}
        id={_id}
        post={post}
      />
    ));
  };

  const onCloseModal = () => {
    setIsModalVisible(false);
    setComment("");
  };
  const onOpenModal = () => {
    setIsModalVisible(true);
    setComment("");
  };

  const authorizedUser = useSelector((state) => state.users.authorizedUser);

  const deleteBtn = () => {
    if (authorizedUser._id === userId) {
      return (
        <i className="fas fa-trash cnDetailedCardDeleteIcon" onClick={onHandleDeleteClick}></i>
      );
    }
  }

  const onHandleDeleteClick = () => {
    console.log({ userName, userId });
    const result = window.confirm('Удалить пост?');
    if (result === true) {
      console.log(userId);
      api
        .deletePost(_id)
        .then((data) => {
          console.log(data);
          alert('Пост удален!');
          document.location.reload();
        })
        .catch((err) => alert(err));
    } else {
      console.log('Удаление отменено или невозможно!');
    }
  }
  return (
    <div className={cn("cnDetailedCardRoot", className)}>
      <div className="cnDetailedCardHeader">
        <UserBadge userName={userName} avatarUrl={avatarUrl} _id={userId} aboutUser={aboutUser} />
      </div>
      <div className="cnDetailedCardImgWrapper">
        <ImageWithLoader className="cnDetailedCardImg" src={imgUrl} alt="img" />
        <div className="cnDetailedCardTime">{timeConverter(createdPost)}</div>
        <h2 className="cnDetailedCardTitle">
          {title}
        </h2>
        <div className="cnDetailedCardDescription">
          {text}
        </div>
        <div className="cnDetailedCardTags">{tags.map(e => {
          return (<span>{`${e}`}</span>)
        })}</div>
      </div>
      <div className="cnDetailedCardButtons">
        <i
          onClick={() => onLikeClick(_id)}
          className={`${isLikedByYou ? "fas" : "far"
            } fa-heart cnDetailedCardLikeIcon`}
        />
        <i
          className="fas fa-comment cnDetailedCardLikeComment"
          onClick={onOpenModal}
        />
        <>{deleteBtn()}</>
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
        />
      </div>
    </div>
  );
};

export default DetailedCard;
