'use client';
import { useEffect, useState } from 'react';
import { DropdownOption } from '@/app/models/dropdownOption';


interface DropdownProps<T> {
  label: string;
  fetchOptions: () => Promise<DropdownOption<T>[]>;
  onSelect: (value: T) => void;
}

export default function Dropdown<T>({ label, fetchOptions, onSelect }: DropdownProps<T>) {
  const [options, setOptions] = useState<DropdownOption<T>[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(label);

  useEffect(() => {
    fetchOptions().then(setOptions).catch(console.error);
  }, [fetchOptions]);

  const handleSelect = (option: DropdownOption<T>) => {
    setSelectedLabel(option.label);
    onSelect(option.value);
    setIsOpen(false);
  };

  return (
    <div className="">
      <button className="btnDropdown" onClick={() => setIsOpen(!isOpen)}>
        {selectedLabel} <span className="arrow">▾</span>
      </button>
      {isOpen && (
        <ul className="txt">
          {options.map((opt, idx) => (
            <li
              key={idx}
              className="listItem"
              onClick={() => handleSelect(opt)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
