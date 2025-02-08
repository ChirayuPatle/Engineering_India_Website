"use client";

const CardOrganizer = () => {
  return (
    <div className="card w-64 h-80 bg-white shadow-lg rounded overflow-hidden border border-gray-100">
      <div className="p-4"></div>
      <div className="p-4">
        <div className="h-40 w-full rounded overflow-hidden">
          <img
            src="https://appwrite.io/images/appwrite-dashboard.png"
            alt="Appwrite Dashboard"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600">Scalable Databases</p>
          <h2 className="text-lg font-semibold text-blue-600">
            Appwrite Storage
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CardOrganizer;
