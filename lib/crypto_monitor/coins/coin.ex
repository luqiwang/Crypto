defmodule CryptoMonitor.Coins.Coin do
  use Ecto.Schema
  import Ecto.Changeset


  schema "coins" do
    field :code, :string
    belongs_to :user, CryptoMonitor.Users.User

    timestamps()
  end

  @doc false
  def changeset(coin, attrs) do
    coin
    |> cast(attrs, [:code, :user_id])
    |> validate_required([:code])
  end
end
