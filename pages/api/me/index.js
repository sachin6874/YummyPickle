import { supabase } from "../../../supabase";

class Order {
  constructor(data) {
    this[data.id] = { ...data.data };
    this[data.id].meta = {};
    this[data.id].meta.updated_at = data.updated_at;
    this[data.id].meta.created_at = data.created_at;
  }
}

class User {
  constructor(auth, response, orders) {
    this.id = auth.user.id;
    this.email = auth.user.email;
    this.username = response[0].username;
    this.orders = orders;
    this.meta = {};
    this.meta.updated_at = auth.user.updated_at;
    this.meta.created_at = auth.user.created_at;
    this.meta.last_sign_in_at = auth.user.last_sign_in_at;
  }
}

export default async (req, res) => {
  try {
    if (req.method.toLowerCase() !== "get")
      throw { message: "invalid request method", status: 405 };
    let { authorization } = req.headers;
    if (!authorization) throw { message: "not authorized", status: 401 };
    const auth = await supabase.auth.api.getUser(authorization);
    if (auth.error) throw auth.error;
    let userResponse = await supabase
      .from("users")
      .select()
      .eq("id", auth.user.id);
    if (userResponse.error) throw { message: "error getting user" };
    let ordersResponse = await supabase
      .from("orders")
      .select()
      .match({ owner: auth.user.id });
    if (ordersResponse.error) throw error;
    let orders = {};
    await Promise.all(
      ordersResponse.data.map((e) => Object.assign(orders, new Order(e)))
    );
    res.status(200).json({
      data: new User(auth, userResponse.data, orders),
      success: true,
    });
  } catch ({ message, status }) {
    message = message.toLowerCase();
    if (message.startsWith("invalid token: token is expired")) {
      message = "token expired";
    }
    res.status(status ? status : 500).json({
      message: message ? message : "an error occurred",
      success: false,
    });
  }
};
