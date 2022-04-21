import { supabase } from "../../../supabase";
import { SignUpSchema } from "../../../schemas";

class Data {
  constructor(data) {
    this.access_token = data.access_token;
    this.refresh_token = data.refresh_token;
    this.expires_at = data.expires_at;
    this.expires_in = data.expires_in;
    this.token_type = data.token_type;
  }
}

export default async (req, res) => {
  try {
    if (req.method.toLowerCase() !== "post")
      throw { reason: "invalid request method", status: 405 };
    let data = await SignUpSchema.validateAsync(req.body);
    let response = await supabase
      .from("users")
      .select("id")
      .eq("username", data.username);
    if (response.error) throw response.error;
    if (response.data.length !== 0) throw { reason: "username not available" };
    let { session, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });
    if (error) throw error;
    let insert_user = await supabase.from("users").insert([
      {
        id: session.user.id,
        username: data.username,
      },
    ]);
    if (insert_user.error) throw insert_user.error;
    res.status(200).json({ data: new Data(session), success: true });
  } catch ({ message, reason, status, isAxiosError }) {
    console.log(message);
    res.status(status ? status : 500).json({
      message:
        reason && !isAxiosError ? reason.toLowerCase() : "an error occurred",
      success: false,
    });
  }
};
