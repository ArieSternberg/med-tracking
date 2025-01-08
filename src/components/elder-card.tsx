import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { User } from 'lucide-react'

interface ElderCardProps {
  elder: {
    id: string
    firstName: string
    lastName: string
    age: number
  }
}

export function ElderCard({ elder }: ElderCardProps) {
  const router = useRouter()

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">
          {elder.firstName} {elder.lastName}
        </CardTitle>
        <User className="h-5 w-5 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <p className="text-sm text-gray-500">
            Age: {elder.age}
          </p>
          <Button 
            onClick={() => router.push(`/dashboard/elder/${elder.id}`)}
            className="w-full bg-[#00856A] hover:bg-[#006B55] text-white"
          >
            View Dashboard
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 