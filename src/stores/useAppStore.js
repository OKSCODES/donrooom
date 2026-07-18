import { create } from 'zustand'

export const useAppStore = create((set) => ({
  mobileNavigationOpen: false,
  closeMobileNavigation: () => set({ mobileNavigationOpen: false }),
  toggleMobileNavigation: () =>
    set((state) => ({ mobileNavigationOpen: !state.mobileNavigationOpen })),
}))
