import { Icon } from "@iconify/react";

const LoadingScreen = () => {
  return (
    <div className="bg-background/60 fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="z-[9999] flex min-h-screen items-center justify-center">
        <Icon icon="lucide:loader-circle" className="text-primary size-10 animate-spin" />
      </div>
    </div>
  );
};

export default LoadingScreen;
