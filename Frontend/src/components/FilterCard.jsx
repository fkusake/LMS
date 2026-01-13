import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function FilterCard(props) {
  const categoryRefs = useRef([]);
  const levelRefs = useRef([]);
  const minRefs = useRef(null);
  const maxRefs = useRef(null);
  const navigate = useNavigate();

  function getCategory() {
    const categories = categoryRefs.current
      .filter((ref) => ref.checked)
      .map((ref) => ref.value)
      .join(",");
    const levels = levelRefs.current
      .filter((ref) => ref.checked)
      .map((ref) => ref.value)
      .join(",");

    navigate(
      `/courses?${categories ? `category=${categories}` : ""}${
        levels ? `&level=${levels}` : ""
      }${minRefs.current?.value ? `&minPrice=${minRefs.current?.value}` : ""}${
        maxRefs.current?.value ? `&maxPrice=${maxRefs.current?.value}` : ""
      }`
    );
  }

  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body">
        <h5 className="fw-bold mb-4">Filter Courses</h5>

        {/* Category */}
        <div className="mb-4">
          <h6 className="fw-semibold">Category</h6>
          {props.categories.map((c, index) => (
            <div className="form-check" key={index}>
              <input
                className="form-check-input"
                type="checkbox"
                ref={(ele) => (categoryRefs.current[index] = ele)}
                value={c.name}
              />
              <label className="form-check-label">{c.name}</label>
            </div>
          ))}
        </div>

        {/* Level */}
        <div className="mb-4">
          <h6 className="fw-semibold">Level</h6>
          {["Beginner", "Intermediate", "Advanced"].map((l, index) => (
            <div className="form-check" key={index}>
              <input
                className="form-check-input"
                type="checkbox"
                ref={(ele) => (levelRefs.current[index] = ele)}
                value={l}
              />
              <label className="form-check-label">{l}</label>
            </div>
          ))}
        </div>

        {/* Price */}
        <div>
          <h6 className="fw-semibold">Price</h6>

          <div className="mb-2">
            <input
              type="number"
              className="form-control mb-3"
              placeholder="Min Price"
              min="0"
              ref={minRefs}
            />
          </div>

          <div>
            <input
              type="number"
              className="form-control mb-3"
              placeholder="Max Price"
              min="0"
              ref={maxRefs}
            />
          </div>
        </div>

        <div className="d-flex justify-content-center mt-4">
          <button className="btn btn-primary px-4" onClick={getCategory}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
