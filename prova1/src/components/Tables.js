
import React, {useState} from "react";
import DisplayTables from "../jsonData/DisplayTables";
import JsonEdit from "../jsonData/JsonEdit"
import jsonData from "../jsonData/clients.json"

const initialData = jsonData;

const Tables = () => {
    const [data, setData] = useState(initialData);

    const handleDataUpdate = (updatedData) => {
        
        const updatedJsonData = jsonData.map((item) => {
          const updatedItem = updatedData.find((dataItem) => dataItem.ID === item.ID);
          return updatedItem ? { ...item, ...updatedItem } : item;
        });
      
        jsonData.splice(0, jsonData.length, ...updatedJsonData);
        setData(updatedData);
    };

    return (
        <div>
            <h2>Clients</h2>
            <div className="table">
                <DisplayTables data={data} onEdit={JsonEdit.handleEdit} onDelete={JsonEdit.handleDelete} />
                <JsonEdit data={data} onUpdate={handleDataUpdate} onDelete={ JsonEdit.handleDelete} />;

            </div>
        </div>
     );
}

export default Tables;
