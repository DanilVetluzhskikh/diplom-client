import { Suspense } from 'react';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { RegistrationForm } from './RegistrationForm';

interface RegistationModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    onSuccessReg: () => void;
}

export const RegistationModal = ({ className, isOpen, onClose, onSuccessReg }: RegistationModalProps) => (
    <Modal
        className={classNames('', {}, [className])}
        isOpen={isOpen}
        onClose={onClose}
        lazy
    >
        <RegistrationForm onSuccess={onSuccessReg} />
    </Modal>
);
