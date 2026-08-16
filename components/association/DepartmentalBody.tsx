import { BodyCard } from './BodyCard';
import { DEPARTMENTAL_BODIES } from '../constants';

export function DepartmentalBodies() {
  return (
    <section className="xs:px-[4.2%] px-4 py-28.25 lg:px-[4.5%] xl:px-[7.75%]">
      <ul className="3xl:gap-x-4 flex flex-wrap justify-center gap-x-4 gap-y-8 2xl:gap-x-3.5">
        {DEPARTMENTAL_BODIES.map((body) => (
          <li key={body.id} className="2xl:max-w-97.25 xl:max-w-88 w-full flex-[1_1_389px] md:max-w-85 sm:max-w-97.25 xs:max-w-90">
            <BodyCard {...body} />
          </li>
        ))}
      </ul>
    </section>
  );
}
