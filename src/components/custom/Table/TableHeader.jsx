import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown, faPencil } from "@fortawesome/free-solid-svg-icons";

/* 
    onClick={() => handleSort(column.sortPath ? column.sortPath : column.path)}
    the ideal code here should be 
    onClick={() => handleSort(column.sortPath)}
    
    !(sortColumn.path == column.path || sortColumn.path == column.sortPath)
    the ideal code here should be 
    sortColumn.path !== column.sortPath

    but because existing code do not contain sortPath, so this is a walk around
*/
const TableHeader = ({ headerData, sortColumn, setSortColumn }) => {
    const handleSort = (path) => {
        if (sortColumn.path === path) {
            const sortOrder = sortColumn.order === "asc" ? "desc" : "asc";
            setSortColumn({ path, order: sortOrder });
        } else setSortColumn({ path, order: "asc" });
    };
    {/********************************************* render header ******************************************************/ }
    const renderSortIcon = (column) => {
        if (column.path) {
            if (!(sortColumn.path == column.path || sortColumn.path == column.sortPath)) return null;
            if (sortColumn.order === "asc")
                return <FontAwesomeIcon icon={faSortUp} />;
            return <FontAwesomeIcon icon={faSortDown} />;
        }
    };

    // console.log('TableHeader - - headerData', headerData)
    // console.log('TableHeader - - sortColumn', sortColumn)

    return (
        <thead  >
            <tr >
                {headerData.map((column) => (
                    <th 
                        style={{ cursor: "pointer", backgroundColor: "#FBA667" }}
                        className="clickable"
                        key={column.path}
                        onClick={() => handleSort(column.sortPath ? column.sortPath : column.path)}
                    >
                        {renderSortIcon(column)} {column.label}{" "}
                        {column.customContent && <FontAwesomeIcon icon={faPencil} />}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHeader;