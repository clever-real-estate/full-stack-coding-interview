import { LoginView } from "./pages/LoginView";
import { PhotoListView } from "./pages/PhotoListView";
import { useAppSelector } from "./redux/hooks";

function App() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (isAuthenticated) return <PhotoListView />;
  return <LoginView />;
}

export default App;
