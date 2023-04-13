import { useSelector } from "react-redux";
import "./styles.css";

const Comment = ({
  author, 
  text
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
      <span>{text}</span>
    </div>
  );
};

export default Comment;
