import * as DrawerPrimitive from "@radix-ui/react-dialog"
import * as React from "react";
import styles from "@/styles/components/Drawer.module.scss";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Drawer = DrawerPrimitive.Root;
const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerClose = DrawerPrimitive.Close;

const DrawerPortal = DrawerPrimitive.Portal;
const DrawerOverlay = React.forwardRef<
    React.ElementRef<typeof DrawerPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ ...props }, ref) => (
    <DrawerPrimitive.Overlay
        className={styles.overlay}
        {...props}
        ref={ref}
    />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
    React.ElementRef<typeof DrawerPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ children, ...props }, ref) => (
    <DrawerPortal>
        <DrawerOverlay />
        <DrawerPrimitive.Content
            ref={ref}
            className={styles.content}
            {...props}
        >
            <DrawerPrimitive.Close className={styles.close}>
                <XMarkIcon className={styles.icon} />
            </DrawerPrimitive.Close>
            {children}
        </DrawerPrimitive.Content>
    </DrawerPortal>
));
DrawerContent.displayName = DrawerPrimitive.Content.displayName;

const DrawerHeader = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={styles.header}
        {...props}
    />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerTitle = React.forwardRef<
    React.ElementRef<typeof DrawerPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ ...props }, ref) => (
    <DrawerPrimitive.Title
        ref={ref}
        className={styles.title}
        {...props}
    />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
    React.ElementRef<typeof DrawerPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ ...props }, ref) => (
    <DrawerPrimitive.Description
        ref={ref}
        className={styles.description}
        {...props}
    />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export { Drawer, DrawerPortal, DrawerOverlay, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription };
