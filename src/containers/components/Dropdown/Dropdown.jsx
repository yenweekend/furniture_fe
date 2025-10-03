import * as React from "react";
import { cn } from "@/lib/utils";
import useClickAwayScroll from "@/hooks/useClickAwayScroll";

const DropdownContext = React.createContext(null);

const Dropdown = React.forwardRef(
  ({ className, open, onOpenChange, children, ...props }, ref) => {
    const triggerRef = React.useRef(null);
    const dropdownRef = React.useRef(null);

    useClickAwayScroll(triggerRef, dropdownRef, () => {
      if (open) onOpenChange(false);
    });

    return (
      <DropdownContext.Provider
        value={{ triggerRef, dropdownRef, open, onOpenChange }}
      >
        <div
          ref={ref}
          className={cn(
            "relative text-left items-center justify-center flex",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </DropdownContext.Provider>
    );
  }
);
Dropdown.displayName = "Dropdown";

const DropdownTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(DropdownContext);
    if (!context)
      throw new Error("DropdownTrigger must be used inside Dropdown");

    const { triggerRef, open, onOpenChange } = context;

    React.useEffect(() => {
      if (open) {
        document.body.classList.add("body-showmodal");
      } else {
        document.body.classList.remove("body-showmodal");
      }
    }, [open]);

    return (
      <button
        ref={triggerRef}
        className={cn(
          "items-center justify-center flex text-sm font-medium px-1",
          className
        )}
        onClick={() => onOpenChange((prev) => !prev)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
DropdownTrigger.displayName = "DropdownTrigger";

const DropdownContent = React.forwardRef(
  ({ className, children, open, arrow = true, ...props }, ref) => {
    const context = React.useContext(DropdownContext);
    if (!context)
      throw new Error("DropdownContent must be used inside Dropdown");

    const { dropdownRef } = context;

    return (
      <>
        <div
          ref={dropdownRef}
          className={cn(
            "absolute z-10 mt-2 w-[250px] right-0 bg-white transition-opacity duration-300 dropdown shadow-nd top-[140%]",
            open
              ? "opacity-[1] visible scale-100"
              : "opacity-0 invisible scale-[0.9]",
            className
          )}
          {...props}
        >
          {children}
        </div>
        {arrow && (
          <div
            className={`absolute z-[61] right-[20px] bottom-[-20px] ${
              open ? "opacity-[1] visible top-[100%]" : "opacity-0 invisible"
            }`}
          >
            <span className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[15px] border-b-[#fff]" />
          </div>
        )}
      </>
    );
  }
);
DropdownContent.displayName = "DropdownContent";

export { Dropdown, DropdownTrigger, DropdownContent };
