import { PageBanner } from '@/components/section/PageBanner';
import { DepartmentalBodies } from '@/components/association/DepartmentalBody';
import { SubBodies } from '@/components/association/SubBody';

export default function Associations() {
  return (
    <>
      <PageBanner
        title="Departmental Bodies"
        tagline="Departmental bodies representing engineering students across various disciplines"
        id="departmental"
      />
      <DepartmentalBodies />
      <PageBanner
        title="Sub Bodies"
        tagline="Professional bodies representing engineering students across various disciplines"
        id="sub"
      />
      <SubBodies />
    </>
  );
}
