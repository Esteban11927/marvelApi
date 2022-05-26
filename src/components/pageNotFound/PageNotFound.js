import Header from '../header/Header';
import './PageNotFound.css';

export default function PageNotFound(){
    return(
        <>
            <Header />
            <div className="pageNotFound">
                <h1>404 Page Not Found</h1>
            </div>
        </>
    )
}