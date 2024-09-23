type PageProps = {
  params: Params;
};

type Params = {
  slug: string;
};

export default function Service({ params }: PageProps) {
  return <>Page for {params.slug} to be done</>;
}
