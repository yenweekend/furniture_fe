import * as React from "react";
import { cn } from "@/lib/utils";
import useClickAway from "@/hooks/useClickAway";

// 1. Tạo Context để share state/ref xuống children
const DropdownContext = React.createContext(null);

const DropdownScreenUT = React.forwardRef(
  ({ className, open, onOpenChange, children, ...props }, ref) => {
    const triggerRef = React.useRef(null);
    const dropdownRef = React.useRef(null);

    // Close dropdown when clicking outside
    useClickAway(triggerRef, dropdownRef, () => {
      if (open) {
        onOpenChange(false);
      }
    });

    return (
      <DropdownContext.Provider
        value={{ triggerRef, dropdownRef, open, onOpenChange }}
      >
        <div
          ref={ref}
          className={cn("flex items-center justify-center", className)}
          {...props}
        >
          {children}
        </div>
      </DropdownContext.Provider>
    );
  }
);
DropdownScreenUT.displayName = "DropdownScreenUT";

// Trigger
const DropdownScreenUTTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(DropdownContext);
    if (!context) {
      throw new Error(
        "DropdownScreenUTTrigger must be used inside DropdownScreenUT"
      );
    }
    const { triggerRef, open, onOpenChange } = context;

    React.useEffect(() => {
      if (open) {
        document.body.classList.add("locked-scroll", "body-showmodal");
      } else {
        document.body.classList.remove("locked-scroll", "body-showmodal");
      }
    }, [open]);

    React.useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth > 990 && open) {
          onOpenChange(false);
        }
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [open, onOpenChange]);

    return (
      <button
        ref={triggerRef}
        className={cn(
          "items-center justify-center flex text-sm font-medium relative px-4",
          className
        )}
        onClick={() => onOpenChange((prev) => !prev)}
        {...props}
      >
        {children}
        <div
          className={`absolute flex items-center justify-center z-[61] top-[calc(100%-5px)] w-8 h-8 center-x ${
            open ? "opacity-[1] visible" : "opacity-0 invisible"
          }`}
        >
          <span className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[15px] border-b-[#fff]" />
        </div>
      </button>
    );
  }
);
DropdownScreenUTTrigger.displayName = "DropdownScreenUTTrigger";

// Content
const DropdownScreenUTContent = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(DropdownContext);
    if (!context) {
      throw new Error(
        "DropdownScreenUTContent must be used inside DropdownScreenUT"
      );
    }
    const { dropdownRef, open } = context;

    return (
      <div
        ref={dropdownRef}
        className={cn(
          "main-dropdown absolute z-[99] bg-[#fff] transition-opacity duration-300 shadow-nd right-0 left-0 w-screen h-[73vh] top-[55%]",
          open
            ? "opacity-[1] visible scale-100"
            : "opacity-0 invisible scale-[0.9]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DropdownScreenUTContent.displayName = "DropdownScreenUTContent";

export { DropdownScreenUT, DropdownScreenUTTrigger, DropdownScreenUTContent };
