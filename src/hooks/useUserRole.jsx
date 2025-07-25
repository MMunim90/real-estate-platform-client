import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user, logOut } = useAuth(); 
  const axiosSecure = useAxiosSecure();

  const { data: role = null, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data?.role;
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    if (!isLoading && !role && user?.email) {
      logOut();
    }
  }, [isLoading, role, user?.email, logOut]);

  return { role, isLoading };
};

export default useUserRole;
