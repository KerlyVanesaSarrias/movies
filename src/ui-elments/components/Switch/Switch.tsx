import { memo } from 'react';

interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
}

const Switch = ({ checked, onChange, disabled }: SwitchProps) => {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => !disabled && onChange(!checked)}
            disabled={disabled}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition 
        ${checked ? 'bg-blue-600' : 'bg-gray-300'} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-80'}
      `}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition 
          ${checked ? 'translate-x-6' : 'translate-x-1'}
        `}
            />
        </button>
    );
};

export default memo(Switch);
