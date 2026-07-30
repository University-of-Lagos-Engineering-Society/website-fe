import { CoreValuesCard } from './ItemCard';
import {
  AdvocacyIcon,
  ChartIcon,
  CommunityIcon,
  ExcellenceIcon,
  InnovationIcon,
  IntegrityIcon,
} from '../../icons';

export function OurCoreValues() {
  return (
    <section className="px-section py-16">
      <h2 className="text-primary text-center text-2xl/9 font-medium md:text-3xl/9">
        Our Core Values
      </h2>
      <p className="mt-5.75 mb-9.5 text-center text-base/6 font-normal">
        Derived from the fundamental objectives and principles of the Constitution, ULES is built
        upon these six core values:
      </p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-6">
        <CoreValuesCard
          title="Unity"
          description="Fostering a spirit of brotherhood and inclusive coexistence among all engineering students."
          icon={<CommunityIcon />}
        />
        <CoreValuesCard
          title="Integrity"
          description="Upholding the reputation, dignity, and integrity of the Faculty and the University at all times."
          icon={<IntegrityIcon />}
        />
        <CoreValuesCard
          title="Leadership"
          description="Empowering members through leadership roles and providing platforms for personal and professional growth."
          icon={<ChartIcon />}
        />
        <CoreValuesCard
          title="Excellence"
          description="Committing to academic high standards and the professional development of the next generation of engineers."
          icon={<ExcellenceIcon />}
        />
        <CoreValuesCard
          title="Innovation"
          description="Promoting an environment that encourages creative thinking and technical advancement."
          icon={<InnovationIcon />}
        />
        <CoreValuesCard
          title="Advocacy"
          description="Dedicated to protecting the academic rights, aspirations, and general welfare of our members."
          icon={<AdvocacyIcon />}
        />
      </div>
    </section>
  );
}
