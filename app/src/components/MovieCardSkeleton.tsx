import { Skeleton } from "@mui/material"

const MovieCardSkeleton = () => {
    return(
        <div className="py-2 w-3/4 flex md:flex-row flex-col space-x-0 md:space-x-4">
            <div className="w-full md:w-1/2">
              <Skeleton variant="rounded" height={400} animation="wave" />
            </div>
            <div className="flex flex-col w-full md:w-1/2">
              <Skeleton variant="text" height={50} animation="wave" />
              <Skeleton variant="text" height={50} animation="wave" />
              <Skeleton
                variant="text"
                height={50}
                animation="wave"
                className="hidden "
              />
              <Skeleton
                variant="text"
                height={300}
                animation="wave"
                sx={{ display: { xs: "none", md: "block" } }}
              />
            </div>
          </div>
    )
}
export default MovieCardSkeleton