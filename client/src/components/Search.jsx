import { 
    loadingStart, 
    loadingFailure, 
    getItemsSuccess, 
    changeCurrentPage, 
    changeTotal, 
    changeSearch 
} from '../redux/database/databaseSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import '../assets/scss/components/search-form.scss';

const Search = () => {
    const { loading, error: errorMessage, databaseUrl } = useSelector((state) => state.database);
    const dispatch = useDispatch();

    const handleSearch = async (e) => {
        if ( loading ) return;

        let value = e.target.value;

        try {
            dispatch(loadingStart());

            const res = await fetch(`${databaseUrl}?number=20&offset=0&search=${e.target.value}`);
            const data = await res.json();

            const resTotal = await fetch(`${databaseUrl}/total?search=${e.target.value}`);
            const total = await resTotal.json();
      
            if (data.success === false) {
                dispatch(loadingFailure("Something went wrong"));
            }
            
            if (res.ok) {
                dispatch(changeCurrentPage( 1 ));
                dispatch(getItemsSuccess(data));
                dispatch(changeSearch(value));
                dispatch(changeTotal(total.total));
            }
        } catch (error) {
            console.log(error);
            dispatch(loadingFailure("Something went wrong"));
        }
    };

    return (
        <div className="search-form">
            <form 
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    type="text"
                    placeholder="Search..."
                    id="search"
                    onChange={handleSearch}
                />
            </form>
            {errorMessage && (
                <p className="error">{errorMessage}</p>
            )}
        </div>
    )
}

export default Search