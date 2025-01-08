import { ElderDashboardComponent } from '@/components/elder-dashboard'

interface PageProps {
  params: { id: string }
}

export default function Page({ params }: PageProps) {
  return <ElderDashboardComponent elderId={params.id} />
} 