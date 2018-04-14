defmodule CryptoMonitor.Coins.Coin do
  use Ecto.Schema
  import Ecto.Changeset


  schema "coins" do
    field :code, :string
    belongs_to :user, CryptoMonitor.Users.User
    field :limit_high, :float, default: 99999999.0
    field :limit_low, :float, default: -1.0
    timestamps()
  end

  @doc false
  def changeset(coin, attrs) do
    IO.inspect coin
    coin
    |> cast(attrs, [:code, :user_id, :limit_high, :limit_low])
    |> validate_required([:code])
    |> IO.inspect
  end
end
