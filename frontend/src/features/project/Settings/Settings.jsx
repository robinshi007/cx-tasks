const Content = () => (
  <div className="px-8 py-4 flex items-center justify-between text-sm ">
    <div className="w-full">
      <div className="flex items-center justify-start h-11 w-full">
        <h2 className="text-gray-600 font-medium text-lg">Settings</h2>
      </div>
      <div className="h-36 w-full py-2">
        <form
          className="bg-white text-center text-gray-600 text-sm rounded "
          style={{ maxWidth: '420px' }}
        >
          <div>
            <label htmlFor="name" className="sr-only">
              Project Name
            </label>
            <input
              id="name"
              className="w-full rounded py-1.5 px-2 mb-6 bg-gray-100 border-gray-300 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 focus:bg-white transition ease-out duration-200"
              type="text"
              value="Demo Project"
              placeholder="project name"
              onChange={() => {}}
            />
          </div>
          <div>
            <label htmlFor="description" className="sr-only">
              description
            </label>
            <textarea
              id="description"
              className="w-full rounded py-1.5 px-2 mb-6 bg-gray-100 border-gray-300 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 focus:bg-white transition ease-out duration-200"
              placeholder="description"
              value="Project for demo use"
              onChange={() => {}}
            />
          </div>
          <button className="flex items-center justify-center rounded bg-blue-600 text-white text-md font-medium px-4 py-1.5 cursor-pointer mb-2 transition ease-out duration-200 focus:outline-none focus:bg-blue-700 hover:bg-blue-500 hover:text-white group">
            Save
          </button>
        </form>
      </div>
    </div>
  </div>
);

const Settings = () => {
  return <Content />;
};
export default Settings;
