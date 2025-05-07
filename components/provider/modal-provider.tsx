"use client"

import { SettingsModal } from "../modals/settings-modal"
import CoverImageModal from '../modals/cover-image-modal'

export const ModalProvider = () => {
  return (
    <>
      <SettingsModal />
      <CoverImageModal />
    </>
  )
}