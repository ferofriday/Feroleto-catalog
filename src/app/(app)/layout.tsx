import { PicksProvider } from '@/context/picks-context';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <PicksProvider>{children}</PicksProvider>;
}
