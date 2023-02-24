import DetailedCard from "../../components/DetailedCard";
import Layout from "../../components/Layout";

const MainPage = () => {
  return (
    <Layout nickName="Test User" id="1">
      <div>main page</div>
      <DetailedCard
        userName="Test User"
        userId={1}
        imgUrl="https://huntingdog.ru/thumbnails/4f/4f81241e055a7ff070f485b86233ae48.webp"
        likes={10}
        isLikedByYou={true}
        comments= {[
          { text: 'What is it?', nickName: 'UserDefacto' },
          { text: 'What is it?', nickName: 'UserDefacto' },
          { text: 'What is it?', nickName: 'UserDefacto' },
          { text: 'What is it?', nickName: 'UserDefacto' }
      
        ]}
      />
    </Layout>
  );
};

export default MainPage;
