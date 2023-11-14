import { InputText } from "primereact/inputtext";
import { ColumnEditorOptions } from "primereact/column";
import { field_types } from "../form-builder/right-aside/list-of-fields";
import { Editor } from "primereact/editor";

const renderHeader = () => {
    return (
        <span className="p-0 h-0 hidden border-none">

        </span>
    );
};

const BodysTable = {
    [field_types[0]]: (options: any, rl: string, cl: string) => <p>{options[rl]}</p>,
    [field_types[3]]: (options: any, rl: string, cl: string) =>
        <Editor className="w-full bg-transparent select-none pointer-events-none" value={options[rl]} headerTemplate={renderHeader()} disabled />
}

export default BodysTable;