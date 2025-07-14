import EmployeesListItem from "../employees-list-item/employees-list-item";

import "./employees-list.css";

const EmployeesList = ({ data, onDelete, onToggleProp, onUpdateSalary }) => {
  return (
    <ul className="app-list list-group">
      {data.map((employee) => {
        const { id, ...employeeProps } = employee;

        return (
          <EmployeesListItem
            key={id}
            id={id}
            {...employeeProps}
            onDelete={() => onDelete(id)}
            onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}
            onUpdateSalary={onUpdateSalary}
          />
        );
      })}
    </ul>
  );
};

export default EmployeesList;
