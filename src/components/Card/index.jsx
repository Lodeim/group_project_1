import cn from "classnames";
import { useState } from "react";
import PhotoModal from "../PhotoModal";
import ImageWithLoader from "../ImageWithLoader";
import { timeConverter } from "../../utils";
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
  author
}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSendCommentClick = () => {
    if (comment) {
      onCommentSendClick(_id, comment);
      setComment("");
    }
  };
  const onCloseModal = () => {
    setModalVisible(false);
    setComment("");
  };
  const onOpenModal = () => {
    setModalVisible(true);
    setComment("");
  };
  const [comment, setComment] = useState("");

  return (
    <div className={cn("cnCardRoot", className)}>
      <ImageWithLoader className="cnCardImage" src={imgUrl} alt={imgUrl} />
      <div className="cnCardHover" />
      <div className="cnCardIcons">
        <i
          className={cn(
            `${isLikedByYou ? "fas" : "far"} fa-heart`,
            "cnCardIcon"
          )}
          onClick={() => onLikeClick(_id)}
        />
        <span className="cnCardNumber cnCardLikes">{likes}</span>
        <i
          className={cn("far fa-comment", "cnCardIcon")}
          onClick={() => onOpenModal()}
        />
        <span className="cnCardNumber">{comments.length}</span>
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
      />
    </div>
  );
};

export default Card;
