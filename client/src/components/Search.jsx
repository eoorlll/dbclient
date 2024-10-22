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
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTU3NWZjYWUyY2FiOTFlYTdiNGU3NiIsImlhdCI6MTcyOTYwNzYxM30.MNUX_L0JyTSFLrqHTPyblpLKfy0sQcAkpiQEGHqjYLA';

    const handleSearch = async (e) => {
        if ( loading ) return;

        let value = e.target.value;

        try {
            dispatch(loadingStart());

            const res = await fetch(`${databaseUrl}?number=20&offset=0&search=${e.target.value}&token=${token}`);
            const data = await res.json();

            const resTotal = await fetch(`${databaseUrl}/total?search=${e.target.value}&token=${token}`);
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
                {errorMessage && (
                    <p className="search-form__error">{errorMessage}</p>
                )}
            </form>
        </div>
    )
}

export default Search