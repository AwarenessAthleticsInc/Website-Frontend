import { BrowserRouter } from "react-router-dom";
import Routing from "./Routes";
import Theme from "./Theme";
import './Css/master.css';
import { useSelector } from "react-redux";
import LoadingPage from "./Pages/LoadingPage";
const App = () => {
  const loading = useSelector(state => state.loading.loading);
  return loading.finsished ? <BrowserRouter>
    <Theme>
      <Routing />
    </Theme>
  </BrowserRouter> : <LoadingPage />
}

export default App;
