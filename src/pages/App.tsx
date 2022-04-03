import React, { useEffect, useState } from "react";
import RadioGroup from "../components/RadioGroup";
import { api } from "../services/api";
import { Menu } from "../types/menu";
import "./styles.scss";

const App = () => {
  const [menus, setMenus] = useState<Menu>();
  const [selection, setSelection] = useState<Dictionary<string>>({});
  const [disabledItems, setDisabledItems] = useState([] as number[]);

  useEffect(() => {
    async function fetchMenu() {
      const data: Menu = await api();
      setMenus(data);
    }
    fetchMenu();
  }, []);

  const validateSelection = (updatedSelection: { [key: string]: string }) => {
    const selectedIds = Object.entries(updatedSelection);

    const disabledItems = Object.values(updatedSelection).reduce(
      (a, b) => [...a, ...(menus?.rules[b] || [])],
      [] as number[]
    );

    const validSelection: Dictionary<string> = {};

    selectedIds.forEach((entry) => {
      const [groupId, value] = entry;
      validSelection[groupId] = disabledItems.includes(parseInt(value))
        ? ""
        : value;
    });

    setDisabledItems(disabledItems);

    return validSelection;
  };

  const handleSelection = (
    groupId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedSelection = validateSelection({
      ...selection,
      [groupId]: e.target.value,
    });

    setSelection(updatedSelection);
  };

  return (
    <div className="radio-app">
      <header>
        <h1>Main Menu</h1>
      </header>
      {menus && (
        <main className="main-menu">
          {menus.menus?.map((menu, index) => (
            <RadioGroup
              key={`grp-${index}`}
              isDisabled={index !== 0 && !selection[index - 1]}
              items={menu}
              groupId={index}
              selection={selection}
              disabledItems={disabledItems}
              onChangeSelection={(e) => handleSelection(index, e)}
            />
          ))}
        </main>
      )}
      <button
        className="btn"
        disabled={
          Object.values(selection).includes("") ||
          Object.values(selection).length !== 3
        }
      >
        Submit Order
      </button>
    </div>
  );
};

export default App;
