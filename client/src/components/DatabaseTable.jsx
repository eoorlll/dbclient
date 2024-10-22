import { useSelector } from 'react-redux';
import '../assets/scss/components/db-table.scss'

const DatabaseTable = () => {
    const { currentItems, search } = useSelector((state) => state.database);

    return (
        <>
            {search && search.length > 0 &&
                <div className="search-result">Search results for: {search}</div>
            }
            <div className="db-table">
                {currentItems && currentItems.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Rows</th>
                                <th>Created Date</th>
                                <th>Modified Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.rows}</td>
                                    <td>{item.createdDate}</td>
                                    <td>{item.modifiedDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    )
}

export default DatabaseTable