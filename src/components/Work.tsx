const Work = () => {
  return (
    <div className="  bg-gradient-to-br px-4 sm:px-6 py-6 mt-[69px]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 pr-12">
          <div className="">
            <h2 className="text-text-primary text-lg font-medium mb-2">WORK</h2>
            <h1 className="text-white text-6xl font-light text-center">
              Monogatari
            </h1>
          </div>

          <div className=" border-teal-400 p-6 rounded-lg ">
            <p className="text-white text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              tempus nisl vitae enim varius rhoncus. Aenean mi nibh. Faucibus et
              condimentum at, vestibulum et elit. Pellentesque et turpis a
              mauris lobortis interdum. Fusce in cursus tellus. Suspendisse
              vitae lacinia ex. Curabitur non mauris ligula, aliquam vitae porta
              nisl. Nullam laoreet lectus ut justo. Cras porta nec dui accumsan
              pretium.
              <br />
              <br />
              Maecenas in rhoncus diam. Nulla erat ante, sollicitudin quis
              elementum et, finibus ut augue. Donec dapibus, magna vitae
              ultrices dapibus, nulla sapien luctus leo, ut faucibus metus arcu
              nec orci. Duis at augue dictum risus fringilla sollicitudin a in
              tellus. Donec iaculis.
            </p>
          </div>
        </div>

        <div className="w-[2px] h-96 bg-teal-400 mx-12"></div>

        <div className="flex-1">
          <div className="bg-gray-300 rounded-lg aspect-[4/3] flex items-center justify-center shadow-2xl">
            <div className="text-gray-600 text-center">
              <div className="text-4xl mb-2">🖼️</div>
              <div className="text-lg">Mockup Image</div>
              <div className="text-sm text-gray-500">
                Replace with your image
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-teal-400"></div>
    </div>
  );
};

export default Work;
