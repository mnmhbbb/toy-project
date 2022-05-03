import UploadForm from './components/UploadForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageList from './components/ImageList';

function App() {
  return (
    <>
      <ToastContainer />
      <UploadForm />
      <ImageList />
    </>
  );
}

export default App;
