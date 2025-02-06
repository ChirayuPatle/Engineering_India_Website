import RightQR from "@/features/event/component/qr";

function Responseform() {
  return (
    <main className="border bg-gray-400 text-white flex flex-col md:flex-row justify-center items-center w-fit rounded-lg p-6 md:p-14 shadow-lg">
      {/* left */}
      <div className="border-2 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-10 p-6 md:p-10 bg-white rounded-lg shadow-md text-black">
        <div className="bg-white md:text-left">
          <section className="font-bold text-xl mb-4">
            <div className="heading text-black text-2xl text-center">
              Engineering India Club YCCE
            </div>
            <div className="event-name text-blue-500 text-lg text-center">
              Youth Parliament
            </div>
          </section>
          <div className="detailsBox border-2 border-gray-300 p-4 m-2 font-serif rounded-lg bg-gray-100 text-black">
            <ul className="flex flex-col space-y-2">
              <li className="font-medium">
                Issued to: <span className="text-gray-700">{}</span>
              </li>
              <li className="font-medium">
                Issued date: <span className="text-gray-700">{}</span>
              </li>
              <li className="font-medium">
                Event date: <span className="text-gray-700">{}</span>
              </li>
              <li className="font-medium">
                Event time: <span className="text-gray-700">{}</span>
              </li>
              <li className="font-medium">
                Venue: <span className="text-gray-700">{}</span>
              </li>
              <li className="font-medium">
                Entry fee: <span className="text-gray-700">{}</span>
              </li>
            </ul>
          </div>
        </div>
        {/* right */}
        <div className="p-6 md:p-12 flex justify-center bg-white rounded-lg shadow-lg items-center text-black">
          <RightQR />
        </div>
      </div>
    </main>
  );
}

export default Responseform;
