defmodule CryptoMonitorWeb.PageController do
  use CryptoMonitorWeb, :controller

  def index(conn, _params) do
    user_id = get_session(conn, :user_id)
    token = "notoken"
    if user_id do
      token = Phoenix.Token.sign(conn, "auth token", user_id)
    end
    render conn, "index.html", token: token, user_id: user_id
  end
end
