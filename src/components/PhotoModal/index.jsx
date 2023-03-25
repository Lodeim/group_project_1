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
                id={userId}
              />
            </div>
            {/* discription Post and title hardcode  */}
            <div className="cnInfo-post-wrapper">
              <div className="cnTimePost">20 марта 2023</div>
              <h2 className="cnTitlePost">
                Title post
              </h2>
              <div className="cnDiscriptionPost">
                <p>Nulla tortor, nec mattis pellentesque in nec orci, orci, eget faucibus. In amet nisi consectetur amet ornare dui nec efficitur morbi hac quis, nulla nisi imperdiet luctus tempus et nunc pulvinar in quis, amet, sapien mal</p>
              </div>
              <div className="cnModalComments">
                <div className="cnCommentTitle">Комментарии</div>
                {comments.map((comment) => (
                  <Comment key={nanoid()} {...comment} />
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="cnModalIcons">
              <i
                onClick={onLikeClick}
                className={`${isLikedByYou ? "fa" : "far"
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
