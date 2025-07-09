import { Icon } from "@iconify/react";

const NoPhotosFound = () => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center">
      <Icon icon="lucide:image-off" className="text-muted-text size-20" />
      <h2 className="mt-6 mb-2 text-xl font-medium">No Photos Found</h2>
      <p className="text-muted-text">It seems you haven't uploaded any photos yet.</p>
    </div>
  );
};

export default NoPhotosFound;
