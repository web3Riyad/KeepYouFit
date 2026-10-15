import Image from "next/image";
import Link from "next/link";

const GymCard = ({ data, href }) => {
  const { name, image, muscleGroups, equipment, duration, caloriesBurned, rating } = data;

  return (
    <article className="min-w-0 w-full overflow-hidden rounded-[20px] border border-[#25272e] bg-[#15171c] text-white">
      <Link
        href={href}
        aria-label={`View ${name} details`}
        className="block h-full rounded-[20px] transition-colors hover:bg-white/5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#d5ff00]"
      >
      <div className="relative aspect-[2.05/1] w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 1280px) 400px, (min-width: 1024px) calc((100vw - 80px) / 3), (min-width: 768px) calc((100vw - 56px) / 2), calc(100vw - 32px)"
          className="object-cover object-center"
        />
      </div>

      <div className="px-5 py-6 sm:px-7 sm:py-7">
        <ul aria-label="Muscle groups" className="mb-4 flex flex-wrap gap-2">
          {muscleGroups.map((muscle) => (
            <li key={muscle} className="rounded-full bg-[#d5ff00] px-3 py-1 text-xs leading-tight font-bold text-[#11150a] uppercase">
              {muscle}
            </li>
          ))}
        </ul>

        <h2 className="font-[Impact,'Arial_Narrow',sans-serif] text-2xl leading-tight font-normal tracking-[0.035em] uppercase">
          {name}
        </h2>
        <p className="mt-1 text-sm leading-6 text-[#999faa]">{equipment}</p>

        <ul aria-label="Workout statistics" className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[#25272e] pt-4 text-sm text-[#999faa]">
          <li className="flex items-center gap-2">
            <svg aria-hidden="true" className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            <span>{duration} min</span>
          </li>
          <li className="flex items-center gap-2">
            <svg aria-hidden="true" className="size-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.5 2c.5 4-2.5 5.5-2.5 8-1.5-.5-2-1.5-2-3C6 9.5 4 12 4 15a8 8 0 0 0 16 0c0-5-3-9-6.5-13Z" />
            </svg>
            <span>{caloriesBurned} kcal</span>
          </li>
          <li className="flex items-center gap-2">
            <svg aria-hidden="true" className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
            </svg>
            <span><span className="sr-only">Rating: </span>{rating}</span>
          </li>
        </ul>
      </div>
      </Link>
    </article>
  );
};

export default GymCard;
