import { Component } from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import "./app.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: "John C.",
          salary: 800,
          increase: true,
          rise: false,
          id: 1,
        },
        {
          name: "Alex M.",
          salary: 3000,
          increase: false,
          rise: true,
          id: 2,
        },
        {
          name: "Carl W.",
          salary: 5000,
          increase: false,
          rise: false,
          id: 3,
        },
      ],
      term: "",
      filter: "all",
    };
    this.maxId =
      this.state.data.reduce(
        (acc, elem) => (elem.id > acc ? elem.id : acc),
        0
      ) + 1;
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      // const index = data.findIndex(elem => elem.id === id);

      // const before = data.slice(0, index)
      // const after = data.slice(index + 1);

      // const newArr = [...before, ...after];

      return {
        data: data.filter((item) => item.id !== id),
      };
    });
  };

  addItem = (name, salary) => {
    if (name.trim().length >= 3 && salary.trim()) {
      this.setState(({ data }) => {
        const newData = [
          ...data,
          {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId++,
          },
        ];

        return {
          data: newData,
        };
      });
    } else if (name.trim().length < 3) {
      alert("Слишком короткое имя!");
    } else {
      alert("Вы не заполнили все данные!");
    }
  };

  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] };
        }

        return item;
      }),
    }));
  };

  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.name.indexOf(term) > -1;
    });
  };

  onUpdateSearch = (term) => {
    this.setState({ term });
  };

  filterEmp = (items, filter) => {
    switch (filter) {
      case "rise":
        return items.filter((item) => item.rise);
      case "moreThen1000":
        return items.filter((item) => item.salary >= 1000);
      default:
        return items;
    }
  };

  onUpdateFilter = (filter) => {
    this.setState({ filter });
  };

  onUpdateSalary = (salary, id) => {
    this.setState(({ data }) => {
      return {
        data: data.map((item) => {
          if (item.id === id) {
            return { ...item, salary };
          }
          return item;
        }),
      };
    });
  };

  render() {
    const { data, term, filter } = this.state;

    const employeesCount = data.length;
    const employeesIncreaseCount = data.filter(
      (employee) => employee.increase
    ).length;

    const visibleData = this.filterEmp(this.searchEmp(data, term), filter);

    return (
      <div className="app">
        <AppInfo
          employeesCount={employeesCount}
          employeesIncreaseCount={employeesIncreaseCount}
        />

        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter onUpdateFilter={this.onUpdateFilter} filter={filter} />
        </div>

        <EmployeesList
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
          onUpdateSalary={this.onUpdateSalary}
        />
        <EmployeesAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
