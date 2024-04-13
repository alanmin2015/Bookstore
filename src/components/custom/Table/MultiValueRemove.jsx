import React from 'react';
import { components } from 'react-select'

// multi select: whether the initialized data can be removed, or must be fixed and deletion is not allowed 
const MultiValueRemove = (props) => {
    if (props.data.isFixed) return null;
    return <components.MultiValueRemove {...props} />;
};

export default MultiValueRemove;