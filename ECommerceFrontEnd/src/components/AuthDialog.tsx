import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuthDialog } from "@/context/AuthDialogContext";
import { Link } from "react-router-dom";

const AuthDialog = () => {
  const { isOpen, authDialogClose } = useAuthDialog();
  const handleGoToLogin = () => {
    authDialogClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={authDialogClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login Required</DialogTitle>
          <DialogDescription>
            You must be logged in to add items to your cart. Please log in to
            continue shopping.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button asChild>
            <Link to="/login" onClick={handleGoToLogin}>
              Go to Login
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
