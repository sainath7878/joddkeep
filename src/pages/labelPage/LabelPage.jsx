import { Label } from "components/index";
import { useDocument } from "customHooks/useDocument";
import "./labelPage.css";
import { useEffect, useState } from "react";
import { useNotes } from "context";

function LabelPage() {
  useDocument("Label");

  const getTime = (time) => {
    const d = new Date(time);
    return d.getTime();
  };

  const [filters, setFilters] = useState({
    all: true,
    Personal: false,
    Work: false,
    Home: false,
    lowToHigh: false,
    highToLow: false,
    latest: false,
    oldest: false,
  });

  const order = { Low: 1, Medium: 2, High: 3 };
  const labels = ["Home", "Work", "Personal"];

  const {
    noteState: { notes },
  } = useNotes();

  const [filteredData, setFilteredData] = useState(notes);

  useEffect(() => {
    let newData = [...notes];
    if (filters.lowToHigh) {
      newData.sort((a, b) => order[a.priority] - order[b.priority]);
    }
    if (filters.highToLow) {
      newData.sort((a, b) => order[b.priority] - order[a.priority]);
    }
    if (filters.latest) {
      newData.sort((a, b) => getTime(b.createdDate) - getTime(a.createdDate));
    }
    if (filters.oldest) {
      newData.sort((a, b) => getTime(a.createdDate) - getTime(b.createdDate));
    }
    if (
      filters.all ||
      (!filters.all && !filters.Personal && !filters.Work && !filters.Home)
    ) {
      setFilteredData(newData);
    } else {
      const selectedLabels = labels.filter((item) => filters[item]);
      newData = newData.filter((item) => selectedLabels.includes(item.label));
      setFilteredData(newData);
    }
  }, [filters]);

  return (
    <section className="label">
      <div className="label-chips">
        <button
          type="button"
          className={`btn ${
            filters.all ? "btn-secondary" : "btn-secondary-outline"
          } `}
          onClick={() =>
            setFilters({
              ...filters,
              all: !filters.all,
              Personal: false,
              Work: false,
              Home: false,
            })
          }
        >
          All
        </button>
        <button
          type="button"
          className={`btn ${
            filters.Home ? "btn-secondary" : "btn-secondary-outline"
          } `}
          onClick={() =>
            setFilters({ ...filters, all: false, Home: !filters.Home })
          }
        >
          Home
        </button>
        <button
          type="button"
          className={`btn ${
            filters.Work ? "btn-secondary" : "btn-secondary-outline"
          } `}
          onClick={() =>
            setFilters({ ...filters, all: false, Work: !filters.Work })
          }
        >
          Work
        </button>
        <button
          type="button"
          className={`btn ${
            filters.Personal ? "btn-secondary" : "btn-secondary-outline"
          } `}
          onClick={() =>
            setFilters({ ...filters, all: false, Personal: !filters.Personal })
          }
        >
          Personal
        </button>
      </div>
      <div className="filters-container">
        <div className="filter-section">
          <h2 className="fs-m">Sort By Priority</h2>

          <div className="filters">
            <label className="fs-s form-label">
              <input
                type="radio"
                className="form-radio"
                name="sort"
                value="high-to-low"
                onChange={() =>
                  setFilters({
                    ...filters,
                    highToLow: !filters.highToLow,
                    lowToHigh: false,
                  })
                }
              />
              High to Low
            </label>
            <label className="fs-s form-label">
              <input
                type="radio"
                className="form-radio"
                name="sort"
                value="low-to-high"
                onChange={() =>
                  setFilters({
                    ...filters,
                    lowToHigh: !filters.lowToHigh,
                    highToLow: false,
                  })
                }
              />
              Low to High
            </label>
          </div>
        </div>
        <div className="filter-section">
          <h2 className="fs-m">Sort By Date</h2>
          <div className="filters">
            <label className="fs-s form-label">
              <input
                type="radio"
                className="form-radio"
                name="sort"
                value="high-to-low"
                onChange={() =>
                  setFilters({
                    ...filters,
                    latest: !filters.latest,
                    oldest: false,
                  })
                }
              />
              Latest First
            </label>
            <label className="fs-s form-label">
              <input
                type="radio"
                className="form-radio"
                name="sort"
                value="low-to-high"
                onChange={() =>
                  setFilters({
                    ...filters,
                    oldest: !filters.oldest,
                    latest: false,
                  })
                }
              />
              Oldest First
            </label>
          </div>
        </div>
      </div>
      {filteredData.length !== 0 ? (
        <div className="label-container">
          {filteredData.map((filteredItem) => (
            <Label key={filteredItem._id} note={filteredItem} />
          ))}
        </div>
      ) : (
        <h1 className="fs-l text-align-center">
          No note found! Try selecting a different Filter
        </h1>
      )}
    </section>
  );
}

export { LabelPage };
