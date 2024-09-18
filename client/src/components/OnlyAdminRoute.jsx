import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Modal } from "flowbite-react";
import { useState, useEffect } from "react";

export default function OnlyAdminPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(true);

  // Debugging: Check if the user data is correctly populated
  useEffect(() => {
    console.log("User data in state:", currentUser);
  }, [currentUser]);

  return currentUser && currentUser.admin ? (
    <Outlet />
  ) : (
    <Modal
      show={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Modal.Header>Admin Access Required</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            You do not have admin access to view this page. If you want to sign
            in as an admin, please{" "}
            <span className="font-semibold">WhatsApp/contact</span> us at{" "}
            <span className="text-blue-500">+91-7542918414</span>. Once
            verified, you can manage the application.
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}
