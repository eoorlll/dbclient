import { useSelector } from 'react-redux';
import Search from './Search.jsx';
import Pagination from './Pagination.jsx';
import ConnectionForm from './ConnectionForm.jsx';
import '../assets/scss/components/db-wrapper.scss'
import DatabaseTable from './DatabaseTable';

const DatabaseWrapper = () => {
    const { databaseUrl } = useSelector((state) => state.database);
  
    return (
        <div className="db-wrapper">
            <div className="db-wrapper__container">
                <div className="db-wrapper__header">
                    <ConnectionForm/>
                    { databaseUrl && (
                        <Search />
                    ) }
                </div>
                
                { databaseUrl ? (
                    <div className="db-wrapper__table">
                        <DatabaseTable />
                    </div>
                ) : (
                    <div className="db-wrapper__empty">
                        <p>Connection not established.</p>
                    </div>
                ) }

                { databaseUrl && (
                    <div className="db-wrapper__nav">
                        <Pagination />
                    </div>
                ) }
            </div>
        </div>
    )
}

export default DatabaseWrapper