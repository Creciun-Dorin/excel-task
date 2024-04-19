import './SelectOptionList.scss';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { EditFill } from '../Icon/EditFill';
import { Trash } from '../Icon/Trash';

export const SelectOptionList = ({ nameList, index, selectOption, setSelectOption }) => {
    const [name, setName] = useState(nameList);

    // Delete select option
    const deleteOption = () => {
        const updatedOptions = selectOption.filter((_, idx) => idx !== index);
        localStorage.setItem("selectOption", JSON.stringify(updatedOptions));
        setSelectOption(updatedOptions);
    }

    // Edit select option
    const editOption = () => {
        const newName = prompt("Edit option", name);
        if (newName !== null) {
            const updatedOptions = [...selectOption];
            updatedOptions[index] = newName;
            localStorage.setItem("selectOption", JSON.stringify(updatedOptions));
            setSelectOption(updatedOptions);
            setName(newName);
        }
    }

    return (
        <li className='list__item'>
            <span className='list__item__text'>{name}</span>
            <div className="list__item__grup">
                <Button eventClick={editOption} className="button__edit" svg={<EditFill />} />
                <Button eventClick={deleteOption} className="button__delete" svg={<Trash />} />
            </div>
        </li>
    )
}
