import "./app-filter.css";

const AppFilter = ({ onUpdateFilter, filter }) => {
  const buttonsData = [
    { name: "all", label: "Все сотрудники" },
    { name: "rise", label: "На повышение" },
    { name: "moreThen1000", label: "З/П больше 1000$" },
  ];

  const onFilter = (e) => {
    const filter = e.target.getAttribute("data-filter");

    onUpdateFilter(filter);
  };

  const buttons = buttonsData.map(({ name, label }) => {
    const active = filter === name;
    const clazz = active ? "btn-light" : "btn-outline-light";

    return (
      <button
        className={`btn ${clazz}`}
        type="button"
        key={name}
        data-filter={name}
        onClick={onFilter}
      >
        {label}
      </button>
    );
  });

  return <div className="btn-group">{buttons}</div>;
}; 

export default AppFilter;
