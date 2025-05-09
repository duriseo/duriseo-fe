import * as DialogPrimitive from "@radix-ui/react-dialog";
import React, { createContext, useContext } from "react";
import styles from "@/styles/components/Modal.module.scss";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { XMarkIcon } from "@heroicons/react/24/outline";

const DismissibleContext = createContext(true);
const useDismissible = () => useContext(DismissibleContext);

const Modal = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root> & { dismissible?: boolean }>(({ dismissible = true, ...props }, ref) => (
        <DismissibleContext.Provider value={dismissible}>
            <DialogPrimitive.Root {...props} />
        </DismissibleContext.Provider>
    ));

Modal.displayName = "Modal"

const ModalTrigger = DialogPrimitive.Trigger;
const ModalPortal = DialogPrimitive.Portal;

const ModalOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>>(({ className, ...props }, ref) => (
        <DialogPrimitive.Overlay ref={ref} className={[styles.overlay, className].join(" ")} {...props} />
    ));

ModalOverlay.displayName = "ModalOverlay";

const ModalWrapper = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>>(({ className, children, ...props }, ref) => {
        const dismissible = useDismissible();

        return (
            <ModalPortal>
                <ModalOverlay />
                <DialogPrimitive.Content ref={ref} className={[styles.wrapper, className].join(" ")}
                    onInteractOutside={(e) => !dismissible && e.preventDefault()}
                    onEscapeKeyDown={(e) => !dismissible && e.preventDefault()}
                    {...props}
                >
                    {children}
                    <VisuallyHidden asChild><DialogPrimitive.Title /></VisuallyHidden>
                    <VisuallyHidden asChild><DialogPrimitive.Description /></VisuallyHidden>
                </DialogPrimitive.Content>
            </ModalPortal>
        );
    });

ModalWrapper.displayName = "ModalWrapper";

const ModalHeader = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    const dismissible = useDismissible();

    return (
        <div className={styles.header} {...props}>
            {children}
            {dismissible &&
                <DialogPrimitive.Close className={styles.close}>
                    <XMarkIcon className={styles.icon} />
                </DialogPrimitive.Close>
            }
        </div>
    );
};

ModalHeader.displayName = "ModalHeader";

const ModalTitle = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>>(({ children, ...props }, ref) => (
        <DialogPrimitive.Title asChild {...props}>
            <h3>{children}</h3>
        </DialogPrimitive.Title>
    ));

ModalTitle.displayName = "ModalTitle";

const ModalContent = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={styles.content} {...props} />
);

ModalContent.displayName = "ModalContent";

export { Modal, ModalTrigger, ModalWrapper, ModalContent, ModalHeader, ModalTitle };
