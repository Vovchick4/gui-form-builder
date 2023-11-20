import { Tag } from "primereact/tag";
import { Editor } from "primereact/editor";
import { field_types } from "../form-builder/right-aside/list-of-fields";

const renderHeader = () => {
    return (
        <span className="p-0 h-0 hidden border-none">

        </span>
    );
};

const BodysTable = {
    [field_types[0]]: (options: any, rl: string, cl: string) => <p>{options[rl]}</p>,
    [field_types[2]]: (options: any, rl: string, cl: string) => <Tag value={!!options[rl] ? 'Agree' : 'Disagree'} severity={!!options[rl] ? 'success' : 'danger'} rounded />,
    [field_types[3]]: (options: any, rl: string, cl: string) =>
        <Editor className="w-full bg-transparent select-none pointer-events-none" value={options[rl]} headerTemplate={renderHeader()} disabled />
}

export default BodysTable;