const BASE_URL = "https://demo-d099.onrender.com/users";
const AdminEmail = "Admin77@gmail.com";

export const authService_user = {
  getAdminData: async () => {
    try {
      const res = await fetch(`${BASE_URL}?email=${AdminEmail}`);
      if (!res.ok) throw new Error("Failed to fetch users");

      const users = await res.json();
      // console.log(users, "Fetched users");
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  },

  getUsers: async () => {
    try {
      const res = await fetch(BASE_URL);
      if (!res.ok) throw new Error("Failed to fetch users");

      const users = await res.json();
      // console.log(users, "Fetched users");
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  },

  getUserByemail: async (email) => {
    try {
      const res = await fetch(`${BASE_URL}?email=${email}`);
      if (!res.ok) throw new Error("Failed to fetch users");

      const users = await res.json();
      // console.log(users, "Fetched users");
      return users.length > 0 ? users[0] : null;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  },

  login: async (email, password) => {
    const res = await fetch(BASE_URL);
    const users = await res.json();
    return users.find((u) => u.email === email && u.password === password);
  },

  register: async (newUser) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    return await res.json();
  },

  userUpdate: async (email, updatedUser) => {
    const res = await fetch(`${BASE_URL}/${email}`, {
      method: "PUT", // or PATCH if you only update a few fields
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });

    const res1 = await fetch(`${BASE_URL}?email=${email}`);
    if (!res1.ok) throw new Error("Failed to fetch users");

    const users = await res1.json();
    // console.log(users, "Fetched users");
    return users.length > 0 ? users[0] : null;
    // return await res.json();
  },

  updateSingleUser: async (id, name, value) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [name]: value }),
    });

    if (!res.ok) throw new Error("Failed to update");

    return await res.json();
  },
  
};
