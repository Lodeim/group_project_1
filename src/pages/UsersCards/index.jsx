import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import UserBio from "../../components/UserBio";
import { mutateUser, getUser } from "../../redux/actions/users";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardsInfoUsers from "../../components/CardsInfoUsers";
import { getUsersInfo } from "../../api/users";
import { Bars } from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import "./styles.css";

const UsersCards = () => {
    const authorizedUser = useSelector((state) => state.users.authorizedUser);
    const user = useSelector((state) => state.users.user);
    const dispatch = useDispatch();
    const isUserLoading = useSelector((state) => state.users.isUserLoading);
    const isUserMutateLoading = useSelector((state) => state.users.isMutateLoading);

    const onEdit = async (data) => {
        await dispatch(mutateUser(data, authorizedUser._id));
      };
      useEffect(() => {
        dispatch(getUser(authorizedUser._id));
      }, [authorizedUser._id, dispatch]);

      const [error, setError] = useState(null);
      const [isLoaded, setIsLoaded] = useState(true);
      const [items, setItems] = useState([]);
      const [usersCardForRender, setUsersCardRender] = useState([]);
      const [page, setPage] = useState(0);
 
    
      
      useEffect(() => {
        setIsLoaded(true);
           Promise.all([getUsersInfo()])
          .then(([usersData]) => {
            setItems(usersData.data);
            })
            .catch(error => setError(error))
            .finally(() => {
              setIsLoaded(false);
            }) 
      }, []);  

    
 
      useEffect(() => {
        const newUsers = [...items];
        const groupUsersCards = [];
        newUsers.forEach((userCard) => {
         if (userCard.group === "group-10") {
          groupUsersCards.push(userCard)
         }
        })
        if (groupUsersCards.length) {
          setUsersCardRender(groupUsersCards.splice(0, 5));
        }
      }, [items]);


      const nextHandlerCards = () => {
        const newUsers = [...items];
        const groupUsersCards = [];
        newUsers.forEach((userCard) => {
          if (userCard.group === "group-10") {
           groupUsersCards.push(userCard)
          }
         })
        const offset = 5 * (page + 1);
        setUsersCardRender([...groupUsersCards.splice(0, offset + 5)]);
        setPage(page + 1);
        console.log(groupUsersCards)
      };

      useEffect(() => {
        localStorage.setItem('cards', JSON.stringify(items));
      }, [items]);

    
    return (
        <Layout
        userName={authorizedUser.name}
        id={authorizedUser._id}
        avatarUrl={authorizedUser.avatar}
        > 
        {isLoaded || isUserLoading ? (
        <div className="cnMainPageLoaderContainer">
          <Bars color="#000BFF" height={80} width={80} />
        </div>
      ) : (
         <div className="cnUsersCardsRoot">
        <UserBio
              avatarUrl={user.avatar}
              nickname={user.name}
              description={user.about}
              url={user.url}
              // сравнение id == authorizedUser.id без приведения
              // eslint-disable-next-line
              isMyPage={authorizedUser._id? true : false}
              onEdit={onEdit}
              formLoading={isUserMutateLoading}
            />
            <div className="cnUsersCardsRootContent">
            {usersCardForRender.length ? (
              <InfiniteScroll
                dataLength={usersCardForRender.length}
                next={nextHandlerCards}
                hasMore={usersCardForRender.length < items.length}
                endMessage={
                  <p className="cnMainPageLoaderContainer">Это все пользователи</p>
                }
                className="cnUsersCardsScroll"
              >
         {usersCardForRender.map(({_id, name, email, avatar, about}) => (
          <CardsInfoUsers 
            key={_id}
            userNameCards={name}
            userEmailCards={email}
            userAvatarCards={avatar}
            userAboutCards={about}
         />
         ))}
         </InfiniteScroll>
         ) : (
          !setError && (
            <p className="cnNoUsersCards">{error}</p>
          )
        )}
      </div>
    </div>   
         
      )}
        </Layout>
    );
};

export default UsersCards;