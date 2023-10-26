import React from 'react';
import { Button } from '@/components/ui/button';
import DescriptionCard from '../cards/DescriptionCard';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  nextFunction: () => void;
  title: string;
  nextButtonText: string;
}

const Modal = ({ isOpen, onClose, children, nextFunction, title, nextButtonText }: ModalProps) => {
  if (!isOpen) return null

  const onClick = () => {
    onClose();
    nextFunction();
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
      <div className='w-80'>
        <DescriptionCard title={title} rounded={true}>
          {children}
          <div className='flex gap-4'>
            <Button 
              className='fight-button h-9 w-full font-semibold hover:brightness-110 hover:bg-brown hover:text-brown2 text-brown2' 
              onClick={onClose}
            >
              Return
            </Button>
            <Button
              className='fight-button h-9 w-full font-semibold hover:brightness-110 hover:bg-brown text-brown2'
              onClick={onClick}
            >
              {nextButtonText}
            </Button>
          </div>
        </DescriptionCard>
      </div>
    </div>
  );
};

export default Modal;