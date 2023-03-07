
import { useEffect } from "react";
import Modal from "react-modal";
import Comment from "../Comment";
import UserBadge from "../UserBadge";
import "./styles.css";
import TextArea from "../TextArea";
import { nanoid } from "nanoid";


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
      className='cnModal'
      overlayClassName="cnModalOverlay"
      ariaHideApp={false}
    >
      <div className="cnModalRoot">
        <div className="cnModalImgWrapper">
          <img src={imgUrl} alt={imgUrl} className="cnModalImg" />
        </div>
        <div className="cnModalCommentsBlock">
            <div>
            <div className="cnModalHeader">
                <UserBadge userName={userName} avatarUrl={avatarUrl} id={userId} />
            </div>
          <div className="cnModalComments">
          {comments.map((comment) => (<Comment key={nanoid()} {...comment}/>))}
        </div>
        </div>
        <div>
            <div className="cnModalIcons">
          <i onClick={onLikeClick} className={`${isLikedByYou ? 'fa' : 'far'} fa-heart cnModalLikeIcon`} />
        </div>
        <TextArea           
          placeholder="Введите комментарий"
          value={commentValue}
          onChange={setCommentValue}
          buttonText='Отправить'
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