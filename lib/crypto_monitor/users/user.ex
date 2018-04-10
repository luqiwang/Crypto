defmodule CryptoMonitor.Users.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias CryptoMonitor.Users.User


  schema "users" do
    field :email, :string
    field :provider, :string
    field :name, :string
    has_many :coins, User, foreign_key: :coin_id

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :provider, :name])
    |> validate_required([:email, :provider])
  end
end
