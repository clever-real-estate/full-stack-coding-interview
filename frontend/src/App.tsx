import { Photo } from "./components/Photo/Photo";
import { LoginView } from "./pages/LoginView";

const photo = {
  id: 1,
  photographer: "Felix",
  photographer_url: "https://www.pexels.com/@felix-57767809",
  description: "A small island surrounded by trees in the middle of a lake",
  image_url:
    "https://www.pexels.com/photo/a-small-island-surrounded-by-trees-in-the-middle-of-a-lake-21751820/",
  image: {
    large:
      "http://localhost:8000/media/__sized__/photos/pexels-photo-21751820_mlpAjyp-crop-c0-5__0-5-940x650-70.jpeg",
    default:
      "http://localhost:8000/media/photos/pexels-photo-21751820_mlpAjyp.jpeg",
    medium:
      "http://localhost:8000/media/__sized__/photos/pexels-photo-21751820_mlpAjyp-thumbnail-500x350-70.jpeg",
    thumb:
      "http://localhost:8000/media/__sized__/photos/pexels-photo-21751820_mlpAjyp-crop-c0-5__0-5-120x120-70.jpeg",
    portrait:
      "http://localhost:8000/media/__sized__/photos/pexels-photo-21751820_mlpAjyp-thumbnail-1280x800-70.jpeg",
    small:
      "http://localhost:8000/media/__sized__/photos/pexels-photo-21751820_mlpAjyp-thumbnail-300x120-70.jpeg",
    landscape:
      "http://localhost:8000/media/__sized__/photos/pexels-photo-21751820_mlpAjyp-thumbnail-627x1200-70.jpeg",
  },
  liked: true,
  likes: 0,
  color: "#333831",
};

function App() {
  return (
    <>
      <LoginView />
      <Photo {...photo} />
    </>
  );
}

export default App;
