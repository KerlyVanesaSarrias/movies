import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/16/solid';
import { memo, ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children?: ReactNode | JSX.Element;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    return (
        <Dialog
            open={isOpen}
            as="div"
            className="relative z-50 focus:outline-none"
            onClose={onClose}
        >
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/70">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-auto h-auto md:h-[90vh] max-h-[90vh] flex flex-col rounded-xl bg-white p-4 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 z-50"
                        >
                            <XMarkIcon className="size-5" />
                        </button>
                        {title && (
                            <DialogTitle
                                as="h3"
                                className="text-base/7 font-medium text-black"
                            >
                                {title}
                            </DialogTitle>
                        )}
                        {children}
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default memo(Modal);
