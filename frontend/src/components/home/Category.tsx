import React from "react";

const categories = [
  { id: 1, title: "Driftwood Table Decor", count: 20, icon: "🪑" },
  { id: 2, title: "Floor Driftwood Sculpture", count: 12, icon: "🎨" },
  { id: 3, title: "Tree", count: 3, icon: "🎄" },
  { id: 4, title: "Wooden Bluetooth Speaker", count: 9, icon: "🔊" },
  { id: 5, title: "Receivers Amplifiers", count: 10, icon: "🕯️" },
  { id: 6, title: "Appetizer Plate Set", count: 5, icon: "🍽️" },
];

const Category = () => {
  return (
    <section className="py-16 px-4">
      <h2 className="text-2xl lg:text-5xl font-bold text-black dark:text-white mb-10">
        Top <span className="text-primary">Categories</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((category, index) => (
          <React.Fragment key={category.id}>
            <div className="flex flex-col items-center p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer group dark:hover-shadow-[0_30px_75px_rgba(255,255,255,0.2)]">
              <div className="relative w-32 h-32 flex items-center justify-center bg-gray-100/60 rounded-full mb-4">
                <span className="text-5xl">{category.icon}</span>
                <span className="absolute top-0 right-0 bg-gray-300 group-hover:bg-primary text-black group-hover:text-white text-xs font-bold rounded-full w-10 h-10 flex items-center justify-center">
                  {category.count}
                </span>
              </div>
              <h3 className="text-center text-gray-700 dark:text-white font-medium">
                {category.title}
              </h3>
            </div>
            {/* Add the Separator after each card except the last one */}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};
export default Category;
