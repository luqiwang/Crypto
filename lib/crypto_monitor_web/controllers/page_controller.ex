defmodule CryptoMonitorWeb.PageController do
  use CryptoMonitorWeb, :controller
  import HTTPoison
  @url "https://www.cryptocompare.com/api/data/coinlist/"

  def index(conn, _params) do
    case HTTPoison.get(@url) do
      {:ok, %{status_code: 200, body: body}} ->
        res = Poison.decode!(body)
        IO.puts('***************')
        IO.inspect(res)
        IO.puts('***************')
      {:ok, %{status_code: 404}} -> IO.puts("404 NOT FOUND")
    end
    user_id = get_session(conn, :user_id)
    token = "notoken"
    if user_id do
      token = Phoenix.Token.sign(conn, "auth token", user_id)
    end
    render conn, "index.html", token: token, user_id: user_id
  end
end
