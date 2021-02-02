export default function Board() {
  const listData = [
    {
      title: 'API Integration',
      category: 'Engineering',
    },
    {
      title: 'New Benefits Plan',
      category: 'Human Resources',
    },
    {
      title: 'Onboarding Emails',
      category: 'Customer Success',
    },
  ];
  return (
    <div className="relative z-10 bg-white rounded-xl shadow-lg max-w-md mx-auto mt-3">
      <section className="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4 group-hover">
        <header className="flex items-center justify-between">
          <h2 className="text-lg leading-6 font-medium text-black">Projects</h2>

          <div className="hover:bg-blue-200 hover:text-blue-800 group flex items-center rounded-md bg-blue-100 text-blue-600 text-sm font-medium px-4 py-2 cursor-pointer select-none transition ease-out duration-200">
            <svg
              width="12"
              height="20"
              fill="currentColor"
              className="group-hover:text-blue-600 text-blue-500 mr-2"
            >
              <path d="M6 5a1 1 0 011 1v3h3a1 1 0 110 2H7v3a1 1 0 11-2 0v-3H2a1 1 0 110-2h3V6a1 1 0 011-1z"></path>
            </svg>
            New
          </div>
        </header>

        <form className="relative">
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
          </svg>

          <input
            type="text"
            aria-label="Filter projects"
            placeholder="Filter projects"
            className="w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-out duration-200"
          />
        </form>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          {listData.map((o, index) => (
            <li className="select-none" key={index}>
              <div className="group cursor-pointer rounded-lg p-4 border border-gray-200 hover:bg-blue-400 hover:border-transparent hover:shadow-lg transition ease-out duration-200">
                <dl className="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
                  <div>
                    <dt className="sr-only">Title</dt>
                    <dd className="leading-6 font-medium text-black group-hover:text-white">
                      {o.title}
                    </dd>
                  </div>
                  <div>
                    <dt className="sr-only">Category</dt>
                    <dd className="text-sm font-medium group-hover:text-lightBlue-100 sm:mb-4 lg:mb-0 xl:mb-4 text-gray-500">
                      {o.category}
                    </dd>
                  </div>
                  <div className="col-start-2 row-start-1 row-end-3">
                    <dt className="sr-only">Users</dt>
                    <dd className="flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-2">
                      <img
                        src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&amp;fit=facearea&amp;facepad=2&amp;w=48&amp;h=48&amp;q=80"
                        alt=""
                        width="48"
                        height="48"
                        className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white"
                        loading="lazy"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&amp;fit=facearea&amp;facepad=2&amp;w=48&amp;h=48&amp;q=80"
                        alt=""
                        width="48"
                        height="48"
                        className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white"
                        loading="lazy"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&amp;fit=facearea&amp;facepad=2&amp;w=48&amp;h=48&amp;q=80"
                        alt=""
                        width="48"
                        height="48"
                        className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white"
                        loading="lazy"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1546525848-3ce03ca516f6?auto=format&amp;fit=facearea&amp;facepad=2&amp;w=48&amp;h=48&amp;q=80"
                        alt=""
                        width="48"
                        height="48"
                        className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white"
                        loading="lazy"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&amp;fit=facearea&amp;facepad=2&amp;w=48&amp;h=48&amp;q=80"
                        alt=""
                        width="48"
                        height="48"
                        className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white"
                        loading="lazy"
                      />
                    </dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}

          <li className="hover:shadow-lg flex rounded-lg">
            <div className="hover:border-transparent hover:shadow-xs w-full flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 text-sm font-medium py-4 cursor-pointer text-gray-500">
              New Project
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
}
