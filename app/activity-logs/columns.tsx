"use client"

import { Badge } from "@/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]

export const activityLogColumns: ColumnDef<ActivityLog>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "plant_id",
    header: "Plant ID",
  },
  {
    accessorKey: "device_mac",
    header: "Device MAC",
  },
  {
    accessorKey: "type",
    header: "Type of log",
    cell: ({row}) => {
      return <Badge variant={row.getValue("type") == "SUCCESS" ? "default" : "destructive"}>
        {row.getValue("type")}
      </Badge>
    }
  },
  {
    accessorKey: "message",
    header: "Message",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
]
