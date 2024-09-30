import { ServicesTabs } from '@/components/shared/ServicesTabs';
import { Service, ServicePageContent } from '@/util/models';

type ServiceDetailLayoutProps = {
  children: React.ReactNode;
  params: ServiceParams;
};

type ServiceParams = {
  slug: string;
};

export default async function ServiceDetailLayout({
  children,
  params,
}: ServiceDetailLayoutProps) {
  const activePageSlug = params.slug;

  return (
    <>
      <ServicesTabs activePageSlug={activePageSlug} />
      {children}
    </>
  );
}
