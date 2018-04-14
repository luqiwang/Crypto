defmodule CryptoMonitorWeb.UserView do
  use CryptoMonitorWeb, :view
  alias CryptoMonitorWeb.UserView
  alias CryptoMonitorWeb.CoinView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      email: user.email,
      provider: user.provider,
      name: user.name,
      coins: Phoenix.View.render_many(user.coins, CoinView, "coin.json")
    }
  end
end
