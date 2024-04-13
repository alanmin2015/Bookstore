import React, { useState } from "react";
import _ from "lodash";

import { useNavigate } from "react-router-dom";

import TableFormCell from "./TableFormCell";

const TableBody = ({
  completeBodyData,
  setCompleteBodyData,
  itemsDisplayed,
  headerData,
  selectedRow,
  setSelectedRow,
}) => {
  //const user = useSelector((state) => state.generic.currentUser);
  {
    /********************************************* handle unit cell change *********************************************/
  }

  const [selectedInputIndex, setSelectedInputIndex] = useState({
    inputRowID: 0,
    inputColumnPath: "",
  });
  const navigate = useNavigate();

  const handleClick = (rowID, columnPath) => {
    setSelectedInputIndex({
      inputRowID: rowID,
      inputColumnPath: columnPath,
    });
  };

  const handleInputChange = (value) => {
    const { inputColumnPath: columnPath, inputRowID: rowID } =
      selectedInputIndex;

    const complet_body_data = Array.from(completeBodyData);
    const rowIndex = complet_body_data.findIndex(
      (element) => element.id == rowID
    );

    complet_body_data[rowIndex] = {
      ...complet_body_data[rowIndex],
      [columnPath]: value,
    };

    setCompleteBodyData(complet_body_data);

    setSelectedInputIndex({ inputRowID: 0, inputColumnPath: "" });
  };

  const handleSubmit = (data, row, doSumbitInOuterCmpnnt) => {
    const updatedData = {
      updatedValue: data,
      rowInfo: row,
    };

    handleInputChange(Object.values(data)[0]);

    doSumbitInOuterCmpnnt(updatedData);
  };
  {
    /************************************************ render body ******************************************************/
  }
  const renderCell = (row, column) => {
    const customContent = column.customContent;
    const displayType = column.displayType;

    let contentString;
    let contentStringForMulti;
    if (customContent?.formInfo?.isMulti) {
      const items = _.get(row, column.path, []);
      //let defaultData = originalData.system_area.map(({ isFixed, ...rest }) => rest);
      contentStringForMulti = items.map(({ isFixed, ...rest }) => rest);
      contentString = items.map((item) => item.value).join(" ");
    } else {
      contentString = _.get(row, column.path);
    }

    if (customContent) {
      if (customContent.type === "inputbox") {
        const cellKey = `${row.id}-${column.path}`;
        return (
          <td key={cellKey} onClick={() => handleClick(row.id, column.path)}>
            {selectedInputIndex.inputRowID +
              "-" +
              selectedInputIndex.inputColumnPath ===
            cellKey ? (
              <TableFormCell
                formInfo={customContent.formInfo}
                initializedData={{ [column.path]: contentString }}
                originalData={contentStringForMulti}
                doSubmit={(data) =>
                  handleSubmit(data, row, customContent.doSubmit)
                }
                formSchema={customContent.schema}
              />
            ) : (
              <>
                {customContent.formInfo.type == "multiselect"
                  ? contentString != null
                    ? contentString
                    : null
                  : contentString}
              </>
            )}
          </td>
        );
      } else if (customContent.type === "actions") {
        const cellKey = `${row.id}-${column.path}`;

        return (
          <td key={cellKey}>
            {customContent.actions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <span
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering click events on parent elements
                    action.doSubmit(row);
                  }}
                >
                  <IconComponent
                    style={{ marginRight: "5px", cursor: "pointer", fontSize:"23px" }}
                  />
                </span>
              );
            })}
          </td>
        );
      } else if (customContent.type === "link") {
        const cellKey = `${row.id}-${column.path}`;
        const destination = `/scenarios/${encodeURIComponent(contentString)}`;
        return (
          <td key={cellKey} onClick={() => navigate(destination)}  style={{  cursor: "pointer" }}>
          {contentString || "Click Here"}
        </td>
        );
      }else if (customContent.type === "comparison") {
        console.log('${column.path}.status',column.path)
        const cellKey = `${row.id}-${column.path}`;
        const statusValue = _.get(row, `${column.path}.${customContent.formInfo.id}`);
        const presentValue = _.get(row, `${column.path}.${customContent.formInfo.value}`);
        let textColor = statusValue > 0 ? 'green' : statusValue < 0 ? 'red' : 'black';
        return (
          <td key={cellKey} style={{ color: textColor }}>
            {presentValue}
          </td>
        );
      }else if (customContent.type === "edit") {
        const cellKey = `${row.id}-${column.path}`;
     
        const presentValue = _.get(row, `${column.path}`);
 
        return (
          <td key={cellKey} onClick={() => customContent.doSubmit(row)} style={{ cursor: "pointer" }}>
            <span style={{ display: "inline-block", color: "blue" }}> {presentValue}</span>
          </td>
        );
      } 
    
    }

    if (!customContent)
      return <td key={`${row.id}-${column.path}`}>{contentString}</td>;
  };
  // console.log('selectedRow',selectedRow.id);
  // console.log('itemsDisplayed',itemsDisplayed);

  return (
    <tbody>
      {itemsDisplayed.map((row) => (
        <tr
          key={row.id}
          onClick={() => setSelectedRow(row)}
          className={
            selectedRow.id === row.id
              ? "customeTableSelectedRow"
              : "customeTableNormalRow"
          }
        >
          {headerData.map((column) => (
            <React.Fragment key={`${column.path}-${row.id}`}>
              {renderCell(row, column)}
            </React.Fragment>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
