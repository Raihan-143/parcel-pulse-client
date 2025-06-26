import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useUserRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/role/${user.email}`)
        .then(res => {
          setRole(res.data.role || "user");
          setLoading(false);
        })
        .catch(() => {
          setRole("user");
          setLoading(false);
        });
    }
  }, [user, axiosSecure]);

  return { role, loading };
};

export default useUserRole;
