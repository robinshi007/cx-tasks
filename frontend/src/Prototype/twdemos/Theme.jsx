export default function Theme() {
  return (
    <>
      <Color />
      <Width />
      <Typography />
      <Shadow />
    </>
  );
}

const Card = ({ title, children }) => {
  return (
    <div className="relative z-10 hadow-lg flex flex-col sm:flex-row max-w-2xl mx-auto mb-6 mt-3">
      <h3 className="flex-none w-full sm:w-48 xl:w-48 bg-purple-50 rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none text-lg leading-6 font-semibold text-purple-800 px-4 py-3 sm:p-8 lg:px-6 lg:py-4 xl:p-8">
        <span>{title}</span>
      </h3>
      <div className="relative flex-auto bg-white rounded-b-xl sm:rounded-r-xl sm:rounded-bl-none overflow-hidden">
        {children}
      </div>
    </div>
  );
};

const Width = () => {
  const sizeData = [
    'w-96',
    'w-80',
    'w-72',
    'w-64',
    'w-60',
    'w-56',
    'w-52',
    'w-48',
    'w-44',
    'w-40',
    'w-36',
    'w-32',
    'w-28',
    'w-24',
    'w-20',
    'w-16',
    'w-14',
    'w-12',
    'w-11',
    'w-10',
    'w-9',
    'w-8',
    'w-7',
    'w-6',
    'w-5',
    'w-4',
    'w-3',
    'w-2',
    'w-1',
    'w-px',
    'w-0',
  ];
  return (
    <Card title="Width">
      <ul className="w-full font-mono text-xs leading-5 text-gray-600 space-y-4 px-4 py-6 sm:p-8 ">
        {sizeData.map((obj, index) => (
          <li className="flex items-center flex-wrap sm:flex-nowrap" key={index}>
            <span className="flex-none w-11">{obj}</span>
            <span
              className={`flex-none h-3 ${obj} origin-left bg-gradient-to-br from-fuchsia-400 to-fuchsia-600`}
            ></span>
          </li>
        ))}
      </ul>
    </Card>
  );
};
const Typography = () => {
  return (
    <Card title="Typography">
      <ul className="w-full space-y-6 px-4 py-6 sm:p-8 lg:p-6 xl:p-8">
        <li>
          <h4 className="font-mono text-xs leading-5 text-gray-600">font-sans</h4>
          <p className="text-sm sm:text-lg sm:leading-6 text-purple-900 font-sans">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
            <br />
            abcdefghijklmnopqrstuvwxyz
            <br />
            1234567890
          </p>
        </li>
        <li>
          <h4 className="font-mono text-xs leading-5 text-gray-600">font-serif</h4>
          <p className="text-sm sm:text-lg sm:leading-6 text-purple-900 font-serif">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
            <br />
            abcdefghijklmnopqrstuvwxyz
            <br />
            1234567890
          </p>
        </li>
        <li>
          <h4 className="font-mono text-xs leading-5 text-gray-600">font-mono</h4>
          <p className="text-sm sm:text-lg sm:leading-6 text-purple-900 font-mono">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
            <br />
            abcdefghijklmnopqrstuvwxyz
            <br />
            1234567890
          </p>
        </li>
      </ul>
    </Card>
  );
};
const Shadow = () => {
  const listData = ['shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-2xl'];
  return (
    <Card title="Shadow">
      <div className="w-full flex-auto flex font-mono text-xs px-4 py-6 sm:p-8 lg:p-6 xl:p-8">
        <ul className="relative z-20 w-full flex-none grid grid-cols-2 gap-4">
          {listData.map((obj, index) => (
            <li key={index}>
              <div className="text-gray-500">{obj}</div>
              <div className={`bg-white rounded-lg h-16 mt-1 ${obj}`}></div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};
const Color = () => {
  const listData = [
    'bg-red',
    'bg-orange',
    'bg-amber',
    'bg-yellow',
    'bg-lime',
    'bg-green',
    'bg-emerald',
    'bg-teal',
    'bg-cyan',
    'bg-lightBlue',
    'bg-blue',
    'bg-indigo',
    'bg-violet',
    'bg-purple',
    'bg-fuchsia',
    'bg-pink',
    'bg-rose',
    'bg-blueGray',
    'bg-coolGray',
    'bg-trueGray',
    'bg-warmGray',
  ];
  return (
    <Card title="Colors">
      <ul className="w-full space-y-4 font-mono text-xs px-4 py-6 sm:p-8 lg:p-6 xl:p-8">
        {listData.map((obj, index) => (
          <li key={index}>
            <h4 className="grid items-center" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
              {obj}-50
              <svg width="48" height="10" fill="none">
                <path
                  fill="url(#arrow_svg__paint0_linear)"
                  fillRule="evenodd"
                  d="M42.293.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L44.586 6H1a1 1 0 010-2h43.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
                <defs>
                  <linearGradient
                    id="arrow_svg__paint0_linear"
                    x1="48"
                    x2="0"
                    y1="5"
                    y2="5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#D4D4D8"></stop>
                    <stop offset="1" stopColor="#D4D4D8" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-right">{obj}-900</span>
            </h4>
            <ul className="flex-none w-full flex rounded-lg overflow-hidden mt-1">
              <li className={`h-7 flex-auto ${obj}-50`}></li>
              <li className={`h-7 flex-auto ${obj}-100`}></li>
              <li className={`h-7 flex-auto ${obj}-200`}></li>
              <li className={`h-7 flex-auto ${obj}-300`}></li>
              <li className={`h-7 flex-auto ${obj}-400`}></li>
              <li className={`h-7 flex-auto ${obj}-500`}></li>
              <li className={`h-7 flex-auto ${obj}-600`}></li>
              <li className={`h-7 flex-auto ${obj}-700`}></li>
              <li className={`h-7 flex-auto ${obj}-800`}></li>
              <li className={`h-7 flex-auto ${obj}-900`}></li>
            </ul>
          </li>
        ))}
      </ul>
    </Card>
  );
};
