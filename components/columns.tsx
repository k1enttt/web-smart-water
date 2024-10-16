"use client"

import { Badge } from "@/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "./ui/button"

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
    header: "ID cây",
  },
  {
    accessorKey: "device_mac",
    header: "Địa chỉ MAC",
  },
  {
    accessorKey: "type",
    header: "Trạng thái",
    cell: ({row}) => {
      return <Badge variant={row.getValue("type") == "SUCCESS" ? "default" : "destructive"}>
        {row.getValue("type")}
      </Badge>
    }
  },
  {
    accessorKey: "message",
    header: "Nội dung",
  },
  {
    accessorKey: "time",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thời gian
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
]
