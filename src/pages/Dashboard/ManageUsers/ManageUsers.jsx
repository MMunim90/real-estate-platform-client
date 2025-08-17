import { useEffect, useState } from "react";
import { FaUserTie, FaTrash, FaExclamationTriangle } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { Link } from "react-router";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosSecure.get("/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Failed to load users", error);
      }
    };
    fetchUsers();
  }, [axiosSecure]);

  const handleMakeAdmin = async (user) => {
    await axiosSecure.patch(`/users/admin/${user._id}`);
    refetchUsers();
  };

  const handleMakeAgent = async (user) => {
    await axiosSecure.patch(`/users/agent/${user._id}`);
    refetchUsers();
  };

  const handleMarkFraud = async (user) => {
    await axiosSecure.patch(`/users/fraud/${user._id}`);
    await axiosSecure.delete(`/properties/by-email/${user.email}`);
    refetchUsers();
  };

  const handleDeleteUser = async (user) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Delete user ${user.email}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (!result.isConfirmed) return; 

      await axiosSecure.delete(`/users/${user._id}`);

      Swal.fire("Deleted!", "User has been deleted.", "success");
      refetchUsers();
    } catch (error) {
      console.error("Error deleting user", error);
      Swal.fire("Error", "Failed to delete user.", "error");
    }
  };

  const refetchUsers = async () => {
    const res = await axiosSecure.get("/users");
    setUsers(res.data);
  };

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <Helmet>
        <title>Manage Users | BrickBase</title>
      </Helmet>

      <div className="breadcrumbs text-xs md:text-sm text-gray-800 mb-4 self-start md:self-center">
          <ul className="flex gap-2">
            <li>
              <Link to="/" className="hover:underline font-medium">
                Home
              </Link>
            </li>
            <li className="text-gray-700 font-medium"><Link to="/dashboard/profile">Dashboard</Link></li>
            <li className="text-gray-700 font-medium">Manage Users</li>
          </ul>
        </div>

      <h2 className="text-3xl md:text-5xl font-semibold mb-6 text-center">
        Manage Users
      </h2>

      <div className="overflow-x-auto border border-gray-400">
        <table className="table w-full table-auto border border-gray-200">
          <thead className="bg-blue-200 text-black">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Media</th>
              <th>Roles</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td>{user.whatsapp || user.twitter || user.facebook || "Did not add any media links"}</td>
                <td className="capitalize text-black">
                  {user.role || "User"}
                  {user.isFraud && " (Fraud)"}
                </td>
                <td className="flex flex-wrap gap-2 py-2">
                  {user.isFraud ? (
                    <span className="text-red-600 font-semibold flex items-center gap-1">
                      <FaExclamationTriangle /> Fraud
                    </span>
                  ) : (
                    <>
                      {user.role !== "admin" && (
                        <button
                          onClick={() => handleMakeAdmin(user)}
                          className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
                          title="Make Admin"
                        >
                          <MdAdminPanelSettings />
                        </button>
                      )}
                      {user.role !== "agent" && (
                        <button
                          onClick={() => handleMakeAgent(user)}
                          className="btn btn-sm bg-green-500 hover:bg-green-600 text-white"
                          title="Make Agent"
                        >
                          <FaUserTie />
                        </button>
                      )}
                      {user.role === "agent" && (
                        <button
                          onClick={() => handleMarkFraud(user)}
                          className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                          title="Mark as Fraud"
                        >
                          <FaExclamationTriangle />
                        </button>
                      )}
                    </>
                  )}
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-sm bg-gray-700 hover:bg-gray-800 text-white"
                    title="Delete User"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <p className="text-center text-gray-500 py-8">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
