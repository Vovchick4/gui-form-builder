import { useDesigner } from "@/contexts";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from 'primereact/inputswitch';
import { TInputInstance } from "../types";

export default function EditFormInputs({ id, label, placeholder, required }: TInputInstance) {
    const { updateInputByID } = useDesigner();

    return (
        <form className="flex flex-col gap-4">
            <div>
                <p className="mb-2 text-sm">Label:</p>
                <InputText className="p-2 w-full" name="label" value={label} onChange={(event) => updateInputByID(id, event)} />
            </div>
            <div>
                <p className="mb-2 text-sm">Placeholder:</p>
                <InputText className="p-2 w-full" name="placeholder" value={placeholder} onChange={(event) => updateInputByID(id, event)} />
            </div>
            <div>
                <p className="mb-2 text-sm">Required:</p>
                <InputSwitch checked={required} onChange={(event) => updateInputByID(id, event.value)} />
            </div>
        </form>
    )
}
