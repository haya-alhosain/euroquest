import { create } from 'zustand'

export interface PopupData {
  course?: Course
  timing?: Timing
  courseTitle?: string
  timingId?: string
}

interface PopupState {
  // Contact popup
  isContactOpen: boolean
  contactData: PopupData
  
  // Download popup
  isDownloadOpen: boolean
  downloadData: PopupData
  
  // Inquire popup
  isInquireOpen: boolean
  inquireData: PopupData
  
  // Join popup
  isJoinOpen: boolean
  joinData: PopupData
  
  // Register popup
  isRegisterOpen: boolean
  registerData: PopupData
  
  // Actions
  openContact: (data?: PopupData) => void
  closeContact: () => void
  
  openDownload: (data?: PopupData) => void
  closeDownload: () => void
  
  openInquire: (data?: PopupData) => void
  closeInquire: () => void
  
  openJoin: (data?: PopupData) => void
  closeJoin: () => void
  
  openRegister: (data?: PopupData) => void
  closeRegister: () => void
  
  // Close all popups
  closeAll: () => void
}

export const usePopupStore = create<PopupState>((set) => ({
  // Initial state
  isContactOpen: false,
  contactData: {},
  
  isDownloadOpen: false,
  downloadData: {},
  
  isInquireOpen: false,
  inquireData: {},
  
  isJoinOpen: false,
  joinData: {},
  
  isRegisterOpen: false,
  registerData: {},
  
  // Contact actions
  openContact: (data = {}) => set({ 
    isContactOpen: true, 
    contactData: data,
    // Close other popups
    isDownloadOpen: false,
    isInquireOpen: false,
    isJoinOpen: false,
    isRegisterOpen: false
  }),
  closeContact: () => set({ isContactOpen: false, contactData: {} }),
  
  // Download actions
  openDownload: (data = {}) => set({ 
    isDownloadOpen: true, 
    downloadData: data,
    // Close other popups
    isContactOpen: false,
    isInquireOpen: false,
    isJoinOpen: false,
    isRegisterOpen: false
  }),
  closeDownload: () => set({ isDownloadOpen: false, downloadData: {} }),
  
  // Inquire actions
  openInquire: (data = {}) => set({ 
    isInquireOpen: true, 
    inquireData: data,
    // Close other popups
    isContactOpen: false,
    isDownloadOpen: false,
    isJoinOpen: false,
    isRegisterOpen: false
  }),
  closeInquire: () => set({ isInquireOpen: false, inquireData: {} }),
  
  // Join actions
  openJoin: (data = {}) => set({ 
    isJoinOpen: true, 
    joinData: data,
    // Close other popups
    isContactOpen: false,
    isDownloadOpen: false,
    isInquireOpen: false,
    isRegisterOpen: false
  }),
  closeJoin: () => set({ isJoinOpen: false, joinData: {} }),
  
  // Register actions
  openRegister: (data = {}) => set({ 
    isRegisterOpen: true, 
    registerData: data,
    // Close other popups
    isContactOpen: false,
    isDownloadOpen: false,
    isInquireOpen: false,
    isJoinOpen: false
  }),
  closeRegister: () => set({ isRegisterOpen: false, registerData: {} }),
  
  // Close all popups
  closeAll: () => set({
    isContactOpen: false,
    isDownloadOpen: false,
    isInquireOpen: false,
    isJoinOpen: false,
    isRegisterOpen: false,
    contactData: {},
    downloadData: {},
    inquireData: {},
    joinData: {},
    registerData: {}
  })
}))
