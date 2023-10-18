import React from 'react';

type Props = {
  children: React.ReactNode;
  close: () => void;
};

const Modal: React.FC<Props> = ({ children, close }) => {
  return (
    <div
      className="fixed w-full h-full bg-black/50 top-0 left-0 flex items-center justify-center cursor-pointer"
      onClick={close}
    >
      <div
        className="bg-white rounded-lg p-5 cursor-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
