function MainContent() {
  return (
    <div className="p-6 flex flex-col sm:w-full ml-12 justify-start sm:justify-center sm:items-center lg:justify-start lg:items-start">
      <div className="flex space-x-6">
        <div className="bg-white p-4 rounded-lg shadow-md  text-center">
          <h2 className="text-2xl font-bold text-blue-600">11</h2>
          <p className="text-gray-600">Total Leaves</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md  text-center">
          <h2 className="text-2xl font-bold text-blue-600">1</h2>
          <p className="text-gray-600">Casual Leaves</p>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
