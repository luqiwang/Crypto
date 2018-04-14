# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     CryptoMonitor.Repo.insert!(%CryptoMonitor.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

defmodule Seed do

  alias CryptoMonitor.Coins

  def insertCoins do
    Coins.create_coin(%{user_id: 1, code: "BTC", limit_high: 8000.0})
    Coins.create_coin(%{user_id: 1, code: "ETH", limit_high: 500.0})
    Coins.create_coin(%{user_id: 1, code: "LTC", limit_high: 150.0})
  end

  def run do
    insertCoins
  end
end

Seed.run
