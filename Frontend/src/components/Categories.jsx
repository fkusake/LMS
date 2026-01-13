import Styles from "../Styles/Home.module.css";

export default function BrowseCategories() {
  const categories = [
    { title: "Web Development", icon: "bi-code-slash" },
    { title: "Data Science", icon: "bi-bar-chart-line" },
    { title: "UI / UX Design", icon: "bi-palette" },
    { title: "Mobile Development", icon: "bi-phone" },
    { title: "Cloud & DevOps", icon: "bi-cloud" },
    { title: "Cyber Security", icon: "bi-shield-lock" },
  ];

  return (
    <div className="container py-5">
      {/* Section Heading */}
      <div className="text-center mb-5">
        <h2 className="fw-bold">Browse Categories</h2>
        <p className="text-muted mt-2">
          Explore courses from top categories and start learning today
        </p>
      </div>

      {/* Categories Grid */}
      <div className="row g-4">
        {categories.map((cat, index) => (
          <div key={index} className={`col-6 col-md-4 col-lg-2 ${Styles.categoryCard}`}>
            <div className="card h-100 border-0 shadow-sm text-center p-4 category-card">
              <div className="mb-3">
                <i
                  className={`bi ${cat.icon} text-primary`}
                  style={{ fontSize: "2rem" }}
                ></i>
              </div>

              <h6 className="fw-semibold mb-0">{cat.title}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
