import { useState } from 'react';
import { 
    loadingStart, 
    loadingSuccess, 
    connectionSuccess, 
    loadingFailure, 
    getItemsSuccess, 
    breakConnection, 
    changeCurrentPage, 
    changeTotal 
} from '../redux/database/databaseSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import '../assets/scss/components/connection-form.scss';

const ConnectionForm = () => {
    const [formData, setFormData] = useState({});
    const { loading, error: errorMessage, databaseUrl } = useSelector((state) => state.database);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ( !formData.dburl ) {
            return dispatch(loadingFailure("Database URL is required"));
        }

        try {
            dispatch(loadingStart());

            const res = await fetch(`${formData.dburl}?number=20&offset=0`);
            const data = await res.json();

            const resTotal = await fetch(`${formData.dburl}/total`);
            const total = await resTotal.json();
      
            if (data.success === false) {
                dispatch(changeCurrentPage( 1 ));
                dispatch(loadingFailure("Something went wrong"));
            }
            
            if (res.ok) {
                dispatch(loadingSuccess());
                dispatch(connectionSuccess(formData.dburl));
                dispatch(getItemsSuccess(data));
                dispatch(changeTotal(total.total));
            }
        } catch (error) {
            console.log(error);
            dispatch(loadingFailure("Something went wrong"));
        }
    };

    return (
        <div className="connection-form">
            { databaseUrl ? (
                <div className="connection-form__connected">
                    <p>Connected to: <b>{databaseUrl}</b></p>
                    <button 
                        className="connection-form__break"
                        type="button"
                        onClick={() => dispatch(breakConnection())} 
                    >
                        Break connection
                    </button>
                </div>
            ) : (
                <>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Database URL"
                            id="dburl"
                            onChange={handleChange}
                        />
                        <button type="submit">{loading ? "Loading..." : "Connect"}</button>
                    </form>
                    {errorMessage && (
                        <p className="connection-form__error">{errorMessage}</p>
                    )}
                </>
            ) }
        </div>
    )
}

export default ConnectionForm