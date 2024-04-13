import React from 'react';
import { Button } from "react-bootstrap";
import Select from 'react-select'

const TableFilter = ({ filterGroup, setCurrentPage = null, selectedGenre, setSelectedGenre, setClearFilterTrigger = null }) => {

    const handleGenreSelect = (selectedValue, genrePath) => {
        // console.log('TableFilter - handleGenreSelect - selectedValue', selectedValue)
        // console.log('TableFilter - handleGenreSelect - genrePath', genrePath)
        if (setCurrentPage) setCurrentPage(1)
        const pathName = genrePath.name;

        let selected_genre = [...selectedGenre]
 
        if (selected_genre.filter(el => Object.keys(el)[0] === pathName).length !== 0) {
            selected_genre = selected_genre.filter(el => Object.keys(el)[0] !== pathName)
        }
  
        selected_genre.push({ [pathName]: selectedValue })
      
        setSelectedGenre(selected_genre);
      
    };
    const handleClearFilter = () => {
        setSelectedGenre([]);
        if (setCurrentPage) setCurrentPage(1)
        if (setClearFilterTrigger) setClearFilterTrigger(true);
    };

    /* 
        Select can automatically change the value
        The reason why this part of the code is added is for the 'Clear Filter'.
        To make the display in Select to be NULL.

        But there is a flaw, this judgment is based on the filterPath.
        If there are two identical paths, the contents of the two Select will be linked.
    */
    const getSelectDisplayValue = (filterPath, filterOptions) => {
       
        let value = null;
        const pathGenre = selectedGenre.find(singleGenre => singleGenre.hasOwnProperty(filterPath))
        if (pathGenre) value = filterOptions.filter(option => pathGenre[filterPath].some(singlePathGenre => singlePathGenre.id === option.id))
        return value
    };

    return (
        <>
            {filterGroup && <>
                <div className='staffings-filter-inline'>
                    {filterGroup.map((filter) =>
                        <React.Fragment key={filter.id}>
                            <div className='filter-container'>
                                <label >{filter.label}:</label>
                                <Select
                                    options={filter.options}
                                    name={filter.path}
                                    value={getSelectDisplayValue(filter.path, filter.options)}
                                    onChange={handleGenreSelect}
                                    isMulti
                                    styles={{
                                        control: (provided) => ({
                                            ...provided,
                                            width: '400px',
                                        }),
                                    }}
                                />
                            </div>
                        </React.Fragment>
                    )}
                </div>
                <Button variant='outline-primary' className='m-3' onClick={handleClearFilter}>Clear Filter</Button>
            </>}
        </>
    );
};

export default TableFilter;