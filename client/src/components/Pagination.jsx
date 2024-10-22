
import { loadingStart, loadingFailure, getItemsSuccess, changeCurrentPage } from '../redux/database/databaseSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import '../assets/scss/components/pagination.scss'
import { useState } from 'react';

const Pagination = () => {
    const { loading, databaseUrl, currentPage, total } = useSelector((state) => state.database);
    const dispatch = useDispatch();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTU3NWZjYWUyY2FiOTFlYTdiNGU3NiIsImlhdCI6MTcyOTYwNzYxM30.MNUX_L0JyTSFLrqHTPyblpLKfy0sQcAkpiQEGHqjYLA';
    const perPage = 20;
    const lastPage = Math.ceil(total / perPage);
    const [inputPage, setInputPage] = useState(currentPage);

    const handlePagination = async (newOffset, page ) => {
        if ( page < 1 ) {
            page = 1;
        } else if ( page > lastPage ) {
            page = lastPage;
        }

        try {
            dispatch(loadingStart());

            const res = await fetch(`${databaseUrl}?number=${perPage}&offset=${newOffset}&token=${token}`);
            const data = await res.json();
      
            if (data.success === false) {
                dispatch(loadingFailure("Something went wrong"));
            }
            
            if (res.ok) {    
                dispatch(changeCurrentPage( page ));
                setInputPage(page);
                dispatch(getItemsSuccess(data));
            }
        } catch (error) {
            console.log(error);
            dispatch(loadingFailure("Something went wrong"));
        }
    }

    const handleNext = () => {
        if ( currentPage >= lastPage ) return;

        const newOffset = currentPage * perPage;
        const newPage = currentPage + 1;

        handlePagination( newOffset, newPage);
    };

    const handlePrev = () => {
        if ( currentPage <= 1 ) return;

        const newOffset = (currentPage - 2) * perPage;
        const newPage = currentPage - 1;

        handlePagination( newOffset, newPage);
    }

    const handleInput = (event) => {
        let page = event.target.value;

        if ( page < 1 ) {
            page = 1;
        } else if ( page > lastPage ) {
            page = lastPage;
        } 
        
        const newOffset = (page - 1) * perPage;

        handlePagination( newOffset, page);
    }

    return (
        <nav className="pagination">
            <div className="pagination__input">
                Page 
                <form
                    onSubmit={(e) => e.preventDefault()}
                >
                    <input 
                        type="number" 
                        placeholder={currentPage}
                        min="1" 
                        max={lastPage} 
                        onChange={handleInput}
                        value={inputPage}
                    />
                </form>
                <div className="pagination__nubmer">of {lastPage}</div>
            </div>

            <button 
                className="pagination__prev" 
                type="button"
                onClick={handlePrev}
                disabled={loading}
            >
                Previous
            </button>
            <button 
                className="pagination__next" 
                type="button"
                onClick={handleNext}
                disabled={loading}
            >
                Next
            </button>
        </nav>
    )
}

export default Pagination