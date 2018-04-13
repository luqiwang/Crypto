defmodule CryptoMonitor.Coins.Coin do
  use Ecto.Schema
  import Ecto.Changeset


  schema "coins" do
    field :code, :string
    belongs_to :user, CryptoMonitor.Users.User
    field :limit_high, :integer, default: 99999999
    field :limit_low, :integer, default: -1
    timestamps()
  end

  @doc false
  def changeset(coin, attrs) do
    coin
    |> cast(attrs, [:code, :user_id, :limit_high, :limit_low])
    |> validate_required([:code])
  end
end
