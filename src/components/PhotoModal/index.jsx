import { useEffect } from "react";
import Modal from "react-modal";
import Comment from "../Comment";
import UserBadge from "../UserBadge";
import TextArea from "../TextArea";
import { nanoid } from "nanoid";
import ImageWithLoader from "../ImageWithLoader";

import "./styles.css";

const PhotoModal = ({
  isOpen,
  onClose,
  imgUrl,
  userName,
  avatarUrl,
  userId,
  comments,
  commentValue,
  setCommentValue,
  onCommentSubmit,
  isCommentLoading,
  isLikedByYou,
  onLikeClick,
  timeConverter,
}) => {
  useEffect(() => {
    const body = document.querySelector("body");
    if (isOpen) {
      body.classList.add("cnBodyOverflow");
    } else {
      body.classList.remove("cnBodyOverflow");
    }
  }, [isOpen]);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="cnModal"
      overlayClassName="cnModalOverlay"
      ariaHideApp={false}
    >
      <div className="cnModalRoot">
        <div className="cnModalImgWrapper">
          <ImageWithLoader src={imgUrl} alt={imgUrl} className="cnModalImg" />
        </div>
        <div className="cnModalCommentsBlock">
          <div>
            <div className="cnModalHeader">
              <UserBadge
                userName={userName}
                avatarUrl={avatarUrl}
                _id={userId}
              />
              <span className="cnModalCreatidTime">{timeConverter}</span>
            </div>
            <div className="cnModalComments">
              {comments.map((comment) => (
                <Comment {...comment} key={nanoid()}  />
      
              ))}
            </div>
          </div>
          <div>
            <div className="cnModalIcons">
              <i
                onClick={onLikeClick}
                className={`${
                  isLikedByYou ? "fa" : "far"
                } fa-heart cnModalLikeIcon`}
              />
            </div>
            <TextArea
              placeholder="Введите комментарий"
              value={commentValue}
              onChange={setCommentValue}
              buttonText="Отправить"
              onSubmit={onCommentSubmit}
              isLoading={isCommentLoading}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PhotoModal;
