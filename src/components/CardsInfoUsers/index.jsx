import "./styles.css";
const CardsInfoUsers = ({
  userNameCards,
  userEmailCards,
  userAvatarCards,
  userAboutCards,
}) => {
  return (
    <div className="cnCardsInfoUsersRoot">
      <div className="cnCardsInfoUsersBox">
        <div className="cnCardsInfoUsersBoxAvatar">
          <img className="cnInfoUsersAvatar" src={userAvatarCards} alt="img" />
        </div>
        <div className="cnCardsInfoUsersBoxDescription">
          <div className="cnInfoUsersName">{userNameCards}</div>
          <div className="cnInfoUsersEmail">Почта: {userEmailCards}</div>
        </div>
      </div>
      <div className="cnInfoUsersAbout">{userAboutCards}</div>
    </div>
  );
};
export default CardsInfoUsers;
