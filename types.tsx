type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
}

type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

type ActivityLog = {
  id?: string,
  plant_id?: string,
  device_mac?: string,
  type?: "SUCCESS" | "ERROR",
  message?: string,
  time?: string,
}