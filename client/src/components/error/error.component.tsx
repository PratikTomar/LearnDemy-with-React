import Header from "../common/header/header.component";
import NotFoundPage from '../../assets/404.png'
import './error.css'
export default function Error() {
  return (
    <>
    <Header/>
    <div className='not-found-page'>
      <img
        src={NotFoundPage}
        alt="Page Not Found"
      />
    </div>
    </>
  );
}
