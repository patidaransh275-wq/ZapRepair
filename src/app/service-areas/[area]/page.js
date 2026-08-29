import { redirect } from 'next/navigation';

export default function LegacyAreaRedirect({ params }) {
  const { area } = params;
  redirect(`/${area}`);
}
