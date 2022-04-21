import { SignInSchema } from "../../../schemas";
import { supabase } from "../../../supabase";

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
      throw { message: "invalid request method", status: 405 };
    const data = await SignInSchema.validateAsync(req.body);
    const { session, error } = await supabase.auth.signIn({
      email: data.email,
      password: data.password,
    });
    if (error) throw error;
    return res.status(200).json({
      data: new Data(session),
      success: true,
    });
  } catch ({ message, status }) {
    return res.status(status ? status : 500).json({
      message: message ? message.toLowerCase() : "an error occurred",
      success: false,
    });
  }
};
