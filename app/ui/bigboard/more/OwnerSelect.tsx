'use client';

import React, { JSX } from 'react';
import {
  IconBlock,
  OptionBox,
  SelectBox,
  SelectBoxText,
} from './OwnerSelect.styles';
import DropdownIcon from '../selections/DropdownIcon';
import OwnerBlock from './OwnerBlock';
import { COLORS } from '@/app/styles';

interface Props {
  options: OwnerSelectOption[];
  onSelect: (selection: string) => void;
}

const OwnerSelect: React.FC<Props> = ({ options, onSelect }) => {
  const [selection, setSelection] = React.useState<OwnerSelectOption | null>(null);
  const [showOptions, setShowOptions] = React.useState<boolean>(false);

  const handleSelect = (option: OwnerSelectOption) => {
    setSelection(option);
    onSelect(option._id);
    setShowOptions(false);
  };

  const renderOptions = (): JSX.Element[] => {
    return options.map((option) => {
      return (
        <OptionBox key={option._id} onClick={() => handleSelect(option)}>
          <OwnerBlock name={option.name} imgUrl={option.imageUrl}/>
        </OptionBox>
      );
    });
  };

  return (
    <div>
      <SelectBox onClick={() => setShowOptions(!showOptions)}>
        {selection ? (
          <OwnerBlock name={selection.name} imgUrl={selection.imageUrl}/>
        ) : (
          <SelectBoxText $hasSelection={selection !== null}>
            SELECT OWNER
          </SelectBoxText>
        )}
        <IconBlock>
          <DropdownIcon strokeColor={COLORS.SECONDARY_GRAY} />
        </IconBlock>
      </SelectBox>
      {showOptions && renderOptions()}
    </div>
  );
};

export default OwnerSelect;
