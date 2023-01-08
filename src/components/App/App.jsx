// импортируем все нужные компоненты
import './App.css';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Main></Main>
      <Footer />
    </div>
  );
}

export default App;
