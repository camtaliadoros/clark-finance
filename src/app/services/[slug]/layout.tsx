import { ServicesTabs } from '@/components/shared/ServicesTabs';
import { Service, ServicePageContent } from '@/util/models';

type ServiceDetailLayoutProps = {
  children: React.ReactNode;
  params: Promise<ServiceParams>;
};

type ServiceParams = {
  slug: string;
};

export default async function ServiceDetailLayout({
  children,
  params,
}: ServiceDetailLayoutProps) {
  const { slug } = await params;
  const activePageSlug = slug;

  return (
    <>
      <ServicesTabs activePageSlug={activePageSlug} />
      {children}
    </>
  );
}
