import { Skeleton } from "@/components/ui/skeleton"
 
export function SkeletonRectangle({width, height}: {width: string, height: string}) {
  let skeletonWidth = width === "full" ? "w-full" : `w-[${width}px]`;
  let skeletonHeight = height === "full" ? "h-full" : `h-[${height}px]`;
  return (
    <Skeleton className={`${skeletonWidth} ${skeletonHeight} rounded-xl`} />
  ) 
}