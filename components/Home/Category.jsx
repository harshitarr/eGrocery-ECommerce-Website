import React from 'react'

const Category = () => {
  const categories = [
    { src: "1.png", label: "Fruits" },
    { src: "2.png", label: "Dairy" },
    { src: "3.png", label: "Baby Products" },
    { src: "4.png", label: "Medicine" },
    { src: "5.png", label: "Accessories" },
    { src: "6.png", label: "Stationery" },
    { src: "7.png", label: "Snacks" }
  ];

  return (
    <section className="px-6 pt-20 pb-10">
        <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#1e1e1e] pb-4">Top Categories</h2>
      </div>

      <div className="grid grid-cols-2  md:grid-cols-7 gap-4 ">
        {categories.map((item, index) => (
          <div key={index} className="w-[200px] relative group rounded shadow-2xl cursor-pointer transition-transform duration-300 hover:scale-105 ">
            <img src={item.src} alt={item.label}  className="w-full h-auto object-cover "/>
            <p className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-black text-sm font-semibold drop-shadow-md">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Category
