import { useSidebarStore } from "@/store";

export const useSidebar = () => {
  const { isOpen, toggle, open, close } = useSidebarStore();

  return {
    isOpen,
    toggle,
    open,
    close,
  };
};
