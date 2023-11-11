import React, { ChangeEvent } from 'react';
import { InputText } from 'primereact/inputtext';

interface SlugInputProps {
    name: string
    value: string;
    onChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

const SlugInput: React.FC<SlugInputProps> = ({ name, value, onChange }) => {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        // Restrict input to alphanumeric characters, hyphens, and/or underscores
        const newValue = event.target.value.replace(/[^a-z0-9-_]/g, '').toLowerCase();
        event.target.value = newValue;
        onChange(event);
    };

    return (
        <InputText
            className='w-full'
            type="text"
            name={name}
            value={value}
            onChange={handleInputChange}
            placeholder="Enter name..."
            pattern="[a-z0-9_-]*" // Pattern for allowed characters
            title="Only lowercase alphanumeric characters, hyphens, and underscores are allowed."
        />
    );
};

export default SlugInput;






