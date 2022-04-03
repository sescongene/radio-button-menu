import React, { ReactElement } from "react";

interface Props {
  value: string;
  id: string;
  name: string;
  disabled?: boolean;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton = (props: Props): ReactElement => {
  return (
    <div className="form-group">
      <label>
        <input
          type="radio"
          id={props.id}
          name={props.name}
          value={props.value}
          disabled={props.disabled}
          checked={props.checked}
          onChange={props.onChange}
        />
        <span>{props.label}</span>
      </label>
    </div>
  );
};

export default RadioButton;
