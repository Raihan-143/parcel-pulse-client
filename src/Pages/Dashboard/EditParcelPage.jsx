import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router';

const EditParcelPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [parcel, setParcel] = useState(null);

  useEffect(() => {
    axiosSecure.get(`/parcels/${id}`).then((res) => setParcel(res.data));
  }, [id, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      title: form.title.value,
      deliveryStatus: form.deliveryStatus.value,
    };
    try {
      await axiosSecure.patch(`/parcels/${id}`, updated);
      Swal.fire("Updated!", "Parcel updated successfully!", "success");
      navigate('/dashboard/all-parcels'); // adjust route if needed
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Update failed", "error");
    }
  };

  if (!parcel) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">✏️ Edit Parcel</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            name="title"
            defaultValue={parcel.title}
            className="w-full px-4 py-2 border rounded-md dark:bg-slate-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Delivery Status</label>
          <select
            name="deliveryStatus"
            defaultValue={parcel.deliveryStatus}
            className="w-full px-4 py-2 border rounded-md dark:bg-slate-700 dark:text-white"
          >
            <option>Not Shipped</option>
            <option>Shipped</option>
            <option>In Transit</option>
            <option>Delivered</option>
          </select>
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditParcelPage;
