import { useState } from "react";
import { nanoid } from "nanoid";
import UserBadge from "../UserBadge";
import Comment from "../Comment";
import cn from "classnames";
import PhotoModal from "../PhotoModal";
import TextArea from "../TextArea";
import ImageWithLoader from "../ImageWithLoader";

import "./styles.css";
import "../PhotoModal/styles.css";

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
  id,
  onCommentSendClick,
  mutateLoading,
}) => {
  const [isCommentsShown, setIsCommentsShown] = useState(false);
  const [comment, setComment] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleSendCommentClick = () => {
    if (comment) {
      onCommentSendClick(id, comment);
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
          >{`Показать еще ${comments.length - commentsForRender.length
            } комментариев`}</span>
          {commentsForRender.map((comment) => (
            <Comment {...comment} key={nanoid()} />
          ))}
        </>
      );
    }
    return comments.map((comment) => <Comment {...comment} key={nanoid()} />);
  };

  const onCloseModal = () => {
    setIsModalVisible(false);
    setComment("");
  };
  const onOpenModal = () => {
    setIsModalVisible(true);
    setComment("");
  };
  return (
    <div className={cn("cnDetailedCardRoot", className)}>
      <div className="cnDetailedCardHeader">
        <UserBadge userName={userName} avatarUrl={avatarUrl} id={userId} />
      </div>
      <div className="cnDetailedCardImgWrapper">
        <ImageWithLoader className="cnDetailedCardImg" src={imgUrl} alt="img" />
        <div className="cnTimePost">20 марта 2023</div>
        <h2 className="cnTitlePost">
          Title post
        </h2>
        <div className="cnDiscriptionPost">
          Nulla tortor, nec mattis pellentesque in nec orci, orci,
          eget faucibus. In amet nisi consectetur amet ornare dui nec efficitur morbi
          hac quis, nulla nisi imperdiet luctus tempus et nunc pulvinar in quis, amet,
          sapien malNulla tortor, nec mattis pellentesque in nec orci, orci, eget faucibus. In
          amet nisi consectetur amet ornare dui nec efficitur morbi hac quis, nulla nisi
          imperdiet luctus tempus et nunc pulvinar in quis, amet, sapien malNulla tortor, n
          ec mattis pellentesque in nec orci, orci, eget faucibus. In amet nisi consectetur amet
          ornare dui nec efficitur morbi hac quis, nulla nisi imperdiet luctus tempus et nunc pulvinar in quis,
          amet, sapien mal.Nulla tortor, nec mattis pellentesque in nec orci, orci,
          eget faucibus. In amet nisi consectetur amet ornare dui nec efficitur morbi
          hac quis, nulla nisi imperdiet luctus tempus et nunc pulvinar in quis, amet,
          sapien malNulla tortor, nec mattis pellentesque in nec orci, orci, eget faucibus. In
          amet nisi consectetur amet ornare dui nec efficitur morbi hac quis, nulla nisi
          imperdiet luctus tempus et nunc pulvinar in quis, amet, sapien malNulla tortor, n
          ec mattis pellentesque in nec orci, orci, eget faucibus. In amet nisi consectetur amet ornare dui nec efficitur morbi hac quis, nulla nisi imperdiet luctus tempus et nunc pulvinar in quis, amet, sapien mal.
          Nulla tortor, nec mattis pellentesque in nec orci, orci,
          eget faucibus. In amet nisi consectetur amet ornare dui nec efficitur morbi
          hac quis, nulla nisi imperdiet luctus tempus et nunc pulvinar in quis, amet,
          sapien malNulla tortor, nec mattis pellentesque in nec orci, orci, eget faucibus. In
          amet nisi consectetur amet ornare dui nec efficitur morbi hac quis, nulla nisi
          imperdiet luctus tempus et nunc pulvinar in quis, amet, sapien malNulla tortor, n
          ec mattis pellentesque in nec orci, orci, eget faucibus. In amet nisi consectetur amet ornare dui nec efficitur morbi hac quis, nulla nisi imperdiet luctus tempus et nunc pulvinar in quis, amet, sapien mal.
          Nulla tortor, nec mattis pellentesque in nec orci, orci,
          eget faucibus. In amet nisi consectetur amet ornare dui nec efficitur morbi
          hac quis, nulla nisi imperdiet luctus tempus et nunc pulvinar in quis, amet,
          sapien malNulla tortor, nec mattis pellentesque in nec orci, orci, eget faucibus. In
          amet nisi consectetur amet ornare dui nec efficitur morbi hac quis, nulla nisi
          imperdiet luctus tempus et nunc pulvinar in quis, amet, sapien malNulla tortor, n
          ec mattis pellentesque in nec orci, orci, eget faucibus. In amet nisi consectetur amet ornare dui nec efficitur morbi hac quis, nulla nisi imperdiet luctus tempus et nunc pulvinar in quis, amet, sapien mal.
        </div>
      </div>
      <div className="cnDetailedCardButtons">
        <i
          onClick={() => onLikeClick(id)}
          className={`${isLikedByYou ? "fas" : "far"
            } fa-heart cnDetailedCardLikeIcon`}
        />
        <i
          className="fas fa-comment cnDetailedCardLikeComment"
          onClick={onOpenModal}
        />
      </div>
      <div className="cnDetailedCardLikes">{`оценили ${likes} человек`}</div>
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
          userId={userId}
          isOpen={isModalVisible}
          onClose={onCloseModal}
          comments={comments}
          commentValue={comment}
          setCommentValue={setComment}
          onCommentSubmit={handleSendCommentClick}
          isCommentLoading={mutateLoading}
          imgUrl={imgUrl}
          isLikedByYou={isLikedByYou}
          onLikeClick={() => onLikeClick(id)}
        />
      </div>
    </div>
  );
};

export default DetailedCard;
