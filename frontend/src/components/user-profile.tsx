import { useState } from "react";
import { Popover } from "@mui/material";
import { User, LogOut } from "lucide-react";
import { useAuth, useAuthDispatch } from "@store/authentication/context";
import { useNavigate } from "react-router";
import { clearSession } from "@utils/session";

const UserProfile = () => {
  const { user } = useAuth();
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    clearSession();
    dispatch({ type: "LOGOUT", payload: { token: null, user: null } });
    handleClose();
    navigate("/login");
  };

  const open = Boolean(anchorEl);

  if (!user) return null;

  return (
    <>
      <button
        onClick={handleClick}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer bg-transparent border-none"
      >
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
          <User className="w-4 h-4 text-green-700" />
        </div>
        <span className="text-sm font-medium text-gray-700">{user.name}</span>
      </button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            className: "mt-2 min-w-[240px] shadow-lg",
          },
        }}
      >
        <div className="p-4">
          <div className="mb-3 pb-3 border-b border-gray-200">
            <p className="text-sm font-semibold text-gray-900 mb-1">
              {user.name}
            </p>
            <p className="text-xs text-gray-600 mb-1">@{user.username}</p>
            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer bg-transparent border-none"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </Popover>
    </>
  );
};

export default UserProfile;
