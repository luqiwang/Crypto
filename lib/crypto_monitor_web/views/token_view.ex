defmodule CryptoMonitorWeb.PageView do
  use CryptoMonitorWeb, :view

  def render("token.json", %{user: user, token: token}) do
    IO.puts("***********************")
    IO.inspect(user)
    IO.puts("***********************")
    %{
      user_id: user.id,
      token: token,
    }
  end
end
