import React, { useState, useEffect } from 'react';
import _ from "lodash";
import { Table } from "react-bootstrap";

import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableButton from './TableButton';
import TablePagination from './TablePagination';
import TableFilter from './TableFilter';
import { applyFilter, applySort } from './tableUtil';
import GoBackButton from './GoBackButton'
const CustomTable = ({ headerData, bodyData, buttonGroup = {}, filterGroup = [], pageSize = 8, tableTitle, setClearFilterTrigger = null }) => {
 
    const [completeBodyData, setCompleteBodyData] = useState(bodyData);
    const [sortColumn, setSortColumn] = useState({ path: "id", order: "asc" });
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRow, setSelectedRow] = useState("");
    const [selectedGenre, setSelectedGenre] = useState([]);
    let filteredBodyData = completeBodyData
  
    if (!_.isEmpty(selectedGenre)) filteredBodyData = applyFilter(selectedGenre, completeBodyData)
    const sorted = applySort(filteredBodyData, sortColumn);
    const itemsDisplayed = _(sorted)
        .slice((currentPage - 1) * pageSize)
        .take(pageSize)
        .value();
    const totalCount = filteredBodyData.length

    useEffect(() => {
        setCompleteBodyData(bodyData)
    }, [bodyData]);

    return (
        <>
            {tableTitle && <h3>{tableTitle}</h3>}
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%'  }}>
                {buttonGroup.hasOwnProperty('upper_left') && <>
                    {buttonGroup.upper_left.map((button) => <TableButton buttonInfo={button} styleInfo='m-2' selectedRow={selectedRow} key={button.id} />)}
                </>}
                {buttonGroup.hasOwnProperty('upper_right') && <>
                    {buttonGroup.upper_right.map((button) => <TableButton buttonInfo={button} styleInfo='m-2' selectedRow={selectedRow} key={button.id} />)}
                </>}
            </div>
    
            {
                filterGroup.length !== 0 && <TableFilter filterGroup={filterGroup} completeBodyData={completeBodyData} setCurrentPage={setCurrentPage} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} setClearFilterTrigger={setClearFilterTrigger} />
            }
    
            {totalCount === 0 ? <h3>There is currently no data.</h3> :
                <Table hover>
                    <TableHeader headerData={headerData} sortColumn={sortColumn} setSortColumn={setSortColumn} />
                    <TableBody completeBodyData={completeBodyData} setCompleteBodyData={setCompleteBodyData} itemsDisplayed={itemsDisplayed} headerData={headerData} selectedRow={selectedRow} setSelectedRow={setSelectedRow} />
                </Table>
            }
    
            <TablePagination
                numItems={totalCount}
                maxNumItemDisplayed={pageSize}
                activePage={currentPage}
                setPage={setCurrentPage}
            />
    
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                {buttonGroup.hasOwnProperty('lower_right') && <>
                    {buttonGroup.lower_right.map((button) => <TableButton buttonInfo={button} styleInfo='m-2' selectedRow={selectedRow} key={button.id} />)}
                </>}
            </div>
    
            {buttonGroup.hasOwnProperty('lower_left') && <GoBackButton />}
        </>
    );
};

export default CustomTable;