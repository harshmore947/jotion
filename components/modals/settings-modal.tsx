"use client"
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Label } from "../ui/label";

import { useSetting } from "@/hooks/use-setting";
import { ModeToggle } from "../mode-toogle";

export const SettingsModal = () => {
  const settings = useSetting();

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">
            My Settings
          </h2>
        </DialogHeader>
        <div className="flex item-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>
              Appearance
            </Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Customize how Jotion looks on your device
            </span>
          </div>
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  )
}