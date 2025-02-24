import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
export default function Modal({ ref, children }) {
  const dialogRef = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      },
    };
  });
  return createPortal(
    <dialog ref={dialogRef}  className="backdrop:bg-stone-900/90  rounded-md pt-8 px-12 fixed inset-0 m-auto " >
      {children}

      <form method="dialog" className="text-center">
      <button className= "cursor-pointer mt-8   text-white bg-ultraOrange p-2 mb-4 rounded shadow-lg transition-all duration-150 active:scale-90 active:shadow-md">Close</button>
      </form>
    </dialog>,

    document.getElementById("modal-root")
  );
}
