import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import CardsInfoUsers from "../../components/CardsInfoUsers";
import { Bars } from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { getUsersInfo } from "../../redux/actions/usersInfo";

import "./styles.css";

const UsersCards = () => {
  const authorizedUser = useSelector((state) => state.users.authorizedUser);
  const usersInfoRender = useSelector((state) => state.usersInfo.usersInfo);
  const isLoadingUsersInfo = useSelector(
    (state) => state.usersInfo.isUsersInfoLoading
  );
  const isUsersInfoError = useSelector(
    (state) => state.usersInfo.isUsersInfoError
  );
  const [usersCardForRender, setUsersCardRender] = useState([]);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersInfo());
  }, [dispatch]);

  useEffect(() => {
    const newUsers = [...usersInfoRender];
    const groupUsersCards = [];
    newUsers.forEach((userCard) => {
      if (userCard.group === "group-10") {
        groupUsersCards.push(userCard);
      }
    });
    if (groupUsersCards.length) {
      setUsersCardRender(groupUsersCards.splice(0, 10));
    }
  }, [usersInfoRender]);

  const nextHandlerCards = () => {
    const newUsers = [...usersInfoRender];
    const groupUsersCards = [];
    newUsers.forEach((userCard) => {
      if (userCard.group === "group-10") {
        groupUsersCards.push(userCard);
      }
    });
    const offset = 10 * (page + 1);
    setUsersCardRender([...groupUsersCards.splice(0, offset + 10)]);
    setPage(page + 1);
  };

  return (
    <Layout
      userName={authorizedUser.name}
      id={authorizedUser._id}
      avatarUrl={authorizedUser.avatar}
    >
      {isLoadingUsersInfo ? (
        <div className="cnUsersPageLoaderContainer">
          <Bars color="#5f9ea0" height={80} width={80} />
        </div>
      ) : (
        <div className="cnUsersCardsRoot">
          <div className="cnUsersCardsRootContent">
            {usersCardForRender.length ? (
              <InfiniteScroll
                dataLength={usersCardForRender.length}
                next={nextHandlerCards}
                hasMore={usersCardForRender.length < usersInfoRender.length}
                endMessage={
                  <p className="cnUsersPageLoaderContainer">
                    Это все пользователи
                  </p>
                }
                className="cnUsersCardsScroll"
              >
                {usersCardForRender.map(
                  ({ _id, name, email, avatar, about }) => (
                    <CardsInfoUsers
                      key={_id}
                      userNameCards={name}
                      userEmailCards={email}
                      userAvatarCards={avatar}
                      userAboutCards={about}
                    />
                  )
                )}
              </InfiniteScroll>
            ) : (
              !isUsersInfoError && (
                <p className="cnNoUsersCards">Пользователи не найдены</p>
              )
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default UsersCards;
