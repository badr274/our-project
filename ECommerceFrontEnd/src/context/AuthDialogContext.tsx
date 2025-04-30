import { createContext, useContext, useState, ReactNode } from "react";

interface AuthDialogContextType {
  isOpen: boolean;
  authDialogOpen: () => void;
  authDialogClose: () => void;
}

const AuthDialogContext = createContext<AuthDialogContextType | undefined>(
  undefined
);

export const AuthDialogProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AuthDialogContext.Provider
      value={{
        isOpen,
        authDialogOpen: () => setIsOpen(true),
        authDialogClose: () => setIsOpen(false),
      }}
    >
      {children}
    </AuthDialogContext.Provider>
  );
};

export const useAuthDialog = (): AuthDialogContextType => {
  const context = useContext(AuthDialogContext);
  if (!context) {
    throw new Error("useAuthDialog must be used within an AuthDialogProvider");
  }
  return context;
};
