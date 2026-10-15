

import Bannar from "../components/Bannar";
import GymCard from "../components/GymCard";
import Footer from "../components/Footer";

export default async function Home() {
  let fitlogData;

  try {
    const response = await fetch("https://api.abcz.workers.dev/api/fitlog", {cache: "no-store"});
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    fitlogData = await response.json();
  } catch {
    fitlogData = null;
  }
  // console.log(fitlogData.length);

  return (
    <div className="flex flex-1 flex-col bg-[#0c0d0f] font-sans">
      <main className="mx-auto w-full max-w-7xl px-4 py-8">
        <Bannar />

        {/* Card Section */}
        <section>
          <div className="my-8 text">
            <h1 className="text-3xl font-bold text-white mt-7">THE LIBRARY</h1>
            <p>Twelve lifts convering every major music group</p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {
              fitlogData && Array.isArray(fitlogData) ? (
                fitlogData.map((item) => (
                  <GymCard
                    key={item.id}
                    data={item}
                    href={`/workouts/${encodeURIComponent(item.id)}`}
                  />
                ))
              ) : (
                <p className="col-span-full">Unable to load the fitness library.</p>
              )
            }
           </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
