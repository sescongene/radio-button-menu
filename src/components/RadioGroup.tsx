import React from "react";
import { MenuItem } from "../types/menu";
import RadioButton from "./RadioButton";

interface Props {
  items: MenuItem[];
  groupId: number;
  selection: Dictionary<string>;
  disabledItems: number[];
  isDisabled?: boolean;
  onChangeSelection: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioGroup = (props: Props) => {
  const isDisabled = React.useCallback(
    (id: string) => {
      return props.disabledItems.includes(parseInt(id));
    },
    [props.disabledItems]
  );

  return (
    <div className="radio-group">
      {props.items.map((item: MenuItem, index: number) => (
        <RadioButton
          key={index}
          disabled={isDisabled(item.id) || props.isDisabled}
          id={`menu-${item.id}`}
          name={`menu-${props.groupId}`}
          value={item.id}
          checked={item.id === props.selection[`${props.groupId}`]}
          onChange={props.onChangeSelection}
          label={item.value}
        />
      ))}
    </div>
  );
};

export default RadioGroup;
