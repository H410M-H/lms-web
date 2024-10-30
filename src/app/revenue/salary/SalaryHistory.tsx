
'use client'

import { useEffect, useState } from 'react'
import { api } from "~/trpc/react"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"

type SalaryAssignment = {
  id: string
  baseSalary: number
  increment: number
  totalSalary: number
  assignedDate: Date
}

export function SalaryHistory({ employeeId }: { employeeId: string }) {
  const [salaryHistory, setSalaryHistory] = useState<SalaryAssignment[]>([])

  const { data, isLoading, error } = api.salary.getSalaryHistory.useQuery({ employeeId })

  useEffect(() => {
    if (data) {
      setSalaryHistory(data)
    }
  }, [data])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Salary History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Base Salary</TableHead>
              <TableHead>Increment</TableHead>
              <TableHead>Total Salary</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salaryHistory.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell>{assignment.assignedDate.toLocaleDateString()}</TableCell>
                <TableCell>{assignment.baseSalary} PKR</TableCell>
                <TableCell>{assignment.increment} PKR</TableCell>
                <TableCell>{assignment.totalSalary} PKR</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}