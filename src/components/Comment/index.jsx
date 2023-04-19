import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import { useEffect } from "react";
import { getUsersInfo } from "../../redux/actions/usersInfo";
import sapi from "../../api/sberAddRequest";
import { getUpdatedPhotoForState } from "../../utils";
const Comment = ({
  author, 
  text,
  id, 
  post,
  onCommentDelete
}) => {
  const usersInfo = useSelector((state) => state.usersInfo.usersInfo);

  const getNameUserComment = () => {
    const newusersInfo = [...usersInfo];
    newusersInfo.forEach((userName) => {
      if (userName._id === author) {
        author = userName.name
      }
    }) 
}  
  return (
    <div className="cnCommentRoot">
      <span className="cnCommentName">{getNameUserComment()}{author}:</span>
      <span onClick={() => onCommentDelete(post, id)}>{text}</span>
    </div>
  );
};

export default Comment;
